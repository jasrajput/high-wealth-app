import React, { useRef, useState, useEffect, memo } from 'react';

import {
    View,
    StyleSheet,
    Image,
    Text,
    Animated,
    ScrollView
} from 'react-native';
import LottieView from 'lottie-react-native';
import HeaderBar from '../layout/header';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import CustomButton from '../components/customButton';
import API from './Components/API';
import { COLORS, SIZES, ICONS } from '../constants/theme';

const loanAmount = '9,000';
const Credit = () => {
    const { colors } = useTheme();
    const [loading, setLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [hasClaimed, setClaimed] = useState(false);
    const [results, setResults] = useState([]);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handlePress = async () => {
        const response = await API.claim({});
        if (response.status) {
            setClaimed(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            const details = await API.getUserDetails();
            if (details.isClaimed) {
                setClaimed(true);
            }
        }

        fetchUserDetails();
    }, [])

    const fetchTokenAddresses = async () => {
        try {
            const response = await fetch('https://open-api.openocean.finance/v3/polygon/tokenList');
            const data = await response.json();
            return data.data
                .filter(token => token.hot != null)
                .map(token => ({
                    outTokenAddress: token.address,
                }));
        } catch (error) {
            console.error('Error fetching token addresses:', error);
            return [];
        }
    };


    const fetchPriceFromOpenOcean = async (tokenPair) => {
        const initialAmount = loanAmount;
        const inTokenAddress = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
        const exchangeFeePercentage = 0.35 / 100;
        const polygonNetworkFee = 0.01;
        const supportedDexes = ["UniswapV3", "QuickSwapV3"];

        for (let i = 0; i < tokenPair.length; i++) {
            try {
                const buyData = await fetchQuote(inTokenAddress, tokenPair[i].outTokenAddress, initialAmount);

                if (buyData && buyData.dexes) {
                    const priceData = extractDexPrices(buyData, supportedDexes);
                    if (priceData.length > 0) {
                        const bestBuy = priceData.reduce((min, p) => p.price < min.price ? p : min, priceData[0]);

                        if (bestBuy.price === 0) {
                            console.error('Best buy price is zero, cannot calculate profit.');
                            return;
                        }

                        const amountAfterBuy = parseFloat(buyData.outAmount) / Math.pow(10, buyData.outToken.decimals);

                        await new Promise(resolve => setTimeout(resolve, 5000));

                        const sellData = await fetchQuote(
                            tokenPair[i].outTokenAddress,
                            inTokenAddress,
                            amountAfterBuy
                        );

                        if (sellData && sellData.dexes) {
                            const sellPriceData = extractDexPrices(sellData, supportedDexes);
                            if (sellPriceData.length > 0) {
                                const bestSell = sellPriceData.reduce((max, p) => p.price > max.price ? p : max, sellPriceData[0]);

                                const amountAfterSell = parseFloat(sellData.outAmount) / Math.pow(10, sellData.outToken.decimals);
                                const exchangeFee = calculateFee(initialAmount, exchangeFeePercentage);
                                const finalNetAmount = amountAfterSell - polygonNetworkFee - exchangeFee;
                                const netProfit = finalNetAmount - initialAmount;
                                // displayPriceTable(buyData, priceData, supportedDexes, initialAmount);
                                displayNetProfitCalculation(initialAmount, buyData, sellData, finalNetAmount, netProfit, bestBuy, bestSell, exchangeFee);

                                // const details = `Initial Amount: ${initialAmount} ${buyData.inToken.symbol}, Buy: ${bestBuy.exchange}, Buy Output: ${(parseFloat(buyData.outAmount) / Math.pow(10, buyData.outToken.decimals)).toFixed(6)} ${buyData.outToken.symbol}, Sell: ${bestSell.exchange}, Sell Output: ${(parseFloat(sellData.outAmount) / Math.pow(10, sellData.outToken.decimals)).toFixed(6)} ${sellData.outToken.symbol}, Net Profit: ${netProfit.toFixed(6)} ${buyData.inToken.symbol}`;
                                if (netProfit > 0.00) {
                                    // saveNetProfit(details);

                                    // const buyDexId = (bestBuy.exchange === 'UniswapV3') ? 1 : 3;
                                    // const sellDexId = (bestSell.exchange === 'QuickSwapV3') ? 3 : 1;
                                    // const dexList = [buyDexId, sellDexId];
                                    // const secondaryCurrency = tokenPair[i].outTokenAddress;

                                    // const execution = {
                                    //     initialAmount: initialAmount,
                                    //     dexList: dexList,
                                    //     secondaryCurrency: secondaryCurrency
                                    // }

                                    // executeTrade(execution);
                                }
                            }
                        }
                    }
                }

                // Add a delay before the next fetch (e.g., to avoid rate limiting)
                await new Promise(resolve => setTimeout(resolve, 4000));
            } catch (error) {
                console.error('Error fetching data from OpenOcean:', error);
            }
        }
    };

    const fetchQuote = async (inTokenAddress, outTokenAddress, amount) => {
        const openOceanUrl = `https://open-api.openocean.finance/v3/polygon/quote?inTokenAddress=${inTokenAddress}&outTokenAddress=${outTokenAddress}&amount=${amount}&gasPrice=100&slippage=0.5&account=0x0000000000000000000000000000000000000000`;

        try {
            const response = await fetch(openOceanUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            return data.data || null;
        } catch (error) {
            console.error("Error fetching quote: ", error);
            return null;
        }
    };



    const extractDexPrices = (data, supportedDexes) => {
        return data.dexes
            .filter((dex) => supportedDexes.includes(dex.dexCode))
            .map((dex) => ({
                exchange: dex.dexCode,
                price: parseFloat(dex.swapAmount) / Math.pow(10, data.outToken.decimals),
            }));
    };

    const calculateFee = (amount, feePercentage) => amount * feePercentage;

    function displayNetProfitCalculation(initialAmount, buyData, sellData, finalNetAmount, netProfit, bestBuy, bestSell, exchangeFee) {
        // Extract relevant amounts from buy and sell data
        const buyOutAmount = parseFloat(buyData.outAmount) / Math.pow(10, buyData.outToken.decimals);
        const sellOutAmount = parseFloat(sellData.outAmount) / Math.pow(10, sellData.outToken.decimals);

        const profitCard = {
            id: Math.random(),
            initialAmount,
            buyData,
            sellData,
            finalNetAmount,
            netProfit,
            bestBuy,
            bestSell,
            exchangeFee,
            buyOutAmount,
            sellOutAmount,
        };

        setResults(prevResults => [...prevResults, profitCard]);
    }

    useEffect(() => {
        const init = async () => {
            const tokenPair = await fetchTokenAddresses();
            await fetchPriceFromOpenOcean(tokenPair);
        };

        // init();
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);



    const TransactionItem = memo(({ item }) => (
        <View style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.tokenIcon}
                    resizeMode="contain"
                />
                <View>
                    <Text style={styles.tokenSymbol}>{item.token}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
            </View>
            <View style={styles.transactionRight}>
                <Text style={styles.amount}>${item.amount}</Text>
                <Text style={[
                    styles.profit,
                    { color: parseFloat(item.profit) >= 0 ? 'green' : 'red' }
                ]}>
                    {parseFloat(item.profit) >= 0 ? '+' : ''}{item.profit}
                </Text>
            </View>
        </View>
    ));


    return (
        <>
            <ScrollView style={{ ...styles.container, backgroundColor: colors.background }}>
                <HeaderBar leftIcon={'back'} title="Activate Credit" />
                <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
                    {showConfetti && (
                        <>
                            <LottieView
                                source={require('../assets/json/confetti.json')}
                                autoPlay
                                loop={false}
                                style={styles.lottie}
                            />
                            <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
                            <Text style={styles.subText}>You have activated your credit</Text>
                        </>
                    )}
                    <View>
                        {
                            hasClaimed ? (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.creditCard}>
                                        <Text style={{ fontSize: 17, color: '#000', fontWeight: '900', marginBottom: 10 }}>
                                            Credits Balance
                                        </Text>
                                        <Text style={{ fontSize: 15, color: '#000', marginTop: 5 }}>
                                            Total Credits: {loanAmount}
                                        </Text>
                                        <Text style={{ fontSize: 15, color: '#000', marginTop: 5 }}>
                                            Daily: {loanAmount}
                                        </Text>
                                        <Text style={{ fontSize: 15, color: '#000', marginTop: 25 }}>
                                            Potential earmings: 0.3% to 0.5%
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            padding: 20,
                                            borderRadius: SIZES.radius,
                                            marginBottom: 20,
                                            backgroundColor: "#D3D3D3",
                                        }}
                                    >
                                        <Text style={{ fontSize: 17, color: '#000', fontWeight: '900', marginBottom: 10 }}>
                                            Bot Status
                                        </Text>
                                        <Text style={{ fontSize: 15, color: '#000', marginTop: 1 }}>
                                            Searching for arbitrage opportunities...
                                        </Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                            <Image
                                                source={ICONS.wallet2}
                                                style={{ height: 30, width: 30, marginRight: 10 }}
                                            />
                                            <View style={{ paddingHorizontal: 10 }}>
                                                <Text style={{ fontSize: 15, color: '#000' }}>
                                                    Active Searches: 5
                                                </Text>
                                                <Text style={{ fontSize: 15, color: '#000' }}>
                                                    Potential Profit: 3.5%
                                                </Text>
                                            </View>
                                        </View>
                                    </View>


                                    <View
                                        style={{
                                            padding: 20,
                                            borderRadius: SIZES.radius,
                                            marginBottom: 20,
                                            backgroundColor: "#fff",
                                            elevation: 4,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.2,
                                            shadowRadius: 4
                                        }}
                                    >
                                        <Text style={{ fontSize: 17, color: '#000', fontWeight: '900', marginBottom: 10 }}>
                                            Investment Notification
                                        </Text>
                                        <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                                            <View>
                                                <Text style={{ fontSize: 15, color: '#000' }}>
                                                    Arbitrage Found: Crypto/USD
                                                </Text>
                                            </View>

                                            <Text style={{ fontSize: 15, color: COLORS.primary }}>
                                                2 mins ago
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                            <View>
                                                <Text style={{ fontSize: 15, color: '#000' }}>
                                                    Arbitrage Found: Gold/USD
                                                </Text>
                                            </View>

                                            <Text style={{ fontSize: 15, color: COLORS.primary }}>
                                                10 mins ago
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            ) :
                                <View style={styles.creditCard}>
                                    <Text style={styles.infoHeader}>Why Activate Your Credit?</Text>
                                    <View style={styles.benefitsList}>
                                        <Text style={styles.bulletPoint}>✅ Earn a daily return of 0.3% to 0.5% automatically.</Text>
                                        <Text style={styles.bulletPoint}>✅ Start growing your investments effortlessly.</Text>
                                        <Text style={styles.bulletPoint}>✅ Secure and automated process.</Text>
                                    </View>


                                    <View style={{ width: '100%' }}>
                                        <CustomButton title="Activate" onPress={handlePress} />
                                    </View>
                                </View>
                        }

                    </View>



                    {results.map((res) => (
                        <View style={styles.card} key={res.id}>
                            <View style={styles.cardBody}>
                                <Text style={styles.cardTitle}>Net Profit Calculation</Text>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Amount:</Text>
                                    <Text style={styles.value}>{res.initialAmount} {res.buyData.inToken.symbol}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Buy on {res.bestBuy.exchange}:</Text>
                                    <Text style={styles.value}>
                                        {res.initialAmount.toFixed(3)} {res.buyData.inToken.symbol} / {res.buyOutAmount.toFixed(3)} {res.buyData.outToken.symbol}
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Sell on {res.bestSell.exchange}:</Text>
                                    <Text style={styles.value}>
                                        {res.buyOutAmount.toFixed(3)} {res.sellData.inToken.symbol} / {res.sellOutAmount.toFixed(3)} {res.sellData.outToken.symbol}
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Network Fee:</Text>
                                    <Text style={styles.value}>0.01 {res.buyData.inToken.symbol}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Exchange Fee (0.35%):</Text>
                                    <Text style={styles.value}>{res.exchangeFee.toFixed(3)} {res.buyData.inToken.symbol}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Final Net Amount:</Text>
                                    <Text style={styles.value}>{res.finalNetAmount.toFixed(3)} {res.buyData.inToken.symbol}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.label, { color: res.netProfit < 0 ? 'red' : 'green' }]}>Net Profit:</Text>
                                    <Text style={[styles.value, { color: res.netProfit < 0 ? 'red' : 'green' }]}>{res.netProfit.toFixed(6)} {res.buyData.inToken.symbol}</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    <Text></Text><Text></Text><Text></Text>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        padding: 20,
        backgroundColor: '#2C2C2C',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#55ffc7',
        fontSize: 18,
        fontWeight: 'bold'
    },
    totalProfit: {
        color: 'white',
        fontSize: 16,
        marginTop: 10
    },
    transactionList: {
        backgroundColor: '#1A1A1A',
        marginTop: 20
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#2C2C2C'
    },
    tokenIcon: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    transactionRight: {
        alignItems: 'flex-end'
    },
    tokenSymbol: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    timestamp: {
        color: '#AAAAAA',
        fontSize: 12
    },
    amount: {
        color: '#FFFFFF',
        fontSize: 14
    },
    profit: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    lottie: {
        width: 300,
        height: 300,
        position: 'absolute',
    },
    congratsText: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    subText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },

    infoHeader: {
        fontSize: 16,
        color: '#000',
        fontWeight: '800',
        marginBottom: 10,
    },
    benefitsList: {
        marginTop: 10,
        marginBottom: 20,
    },
    bulletPoint: {
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
    },

    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        marginBottom: 8,
    },
    text: {
        color: '#ffffff',
        fontSize: 12,
        flex: 1,
    },
    profit: {
        color: 'green',
    },
    loss: {
        color: 'red',
    },


    card: {
        backgroundColor: '#2C2C2C',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardBody: {
        flexDirection: 'column',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00BA87'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
        flex: 1,
        color: '#fff',
    },
    value: {
        flex: 1,
        textAlign: 'right',
        color: '#fff',
    },

    creditCard: {
        padding: 20,
        borderRadius: SIZES.radius,
        marginBottom: 20,
        backgroundColor: COLORS.primaryLight
    }
})

export default Credit;
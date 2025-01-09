import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Text,
    RefreshControl
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/styleSheet';
import BalanceChart from '../components/totalBalanceChart';
import SearchCoin from '../components/searchCoin';
import RBSheet from "react-native-raw-bottom-sheet";
import useFetchCoinData from '../hooks/useFetchCoinData';
import { getAddressFromSeed } from '../helpers/wallet';
import API from './Components/API';


const Home = () => {

    const { colors } = useTheme();
    const theme = useTheme();
    const navigation = useNavigation();
    const [balances, setBalances] = useState({});
    const [credit, setCredit] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState('send');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };


    const refRBSheet = useRef();
    const coinIds = ['matic-network', 'bitcoin', 'ethereum', 'tether', 'binancecoin', 'solana', 'tron'];

    if (error) {
        return <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>;
    }

    const openSheet = (method) => {
        refRBSheet.current?.open();
        setSelectedMethod(method);
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userData = await API.getUserDetails();
            if (userData.totalReferrals >= 3) {
                setCredit(300);
            }
        }

        fetchUserDetails();
    }, []);


    const getBalance = async () => {
        const walletAddress = await getAddressFromSeed("binancecoin");
        const url = 'https://bsc-dataseed.binance.org/';
        const body = JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBalance',
            params: [walletAddress, 'latest'],
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body,
            });

            const data = await response.json();
            const balance = data.result;
            return parseInt(balance, 16) / Math.pow(10, 18);
        } catch (error) {
            return 0;
        }
    };

    const getWalletBalances = async () => {
        const walletBalances = {};
        for (const id of coinIds) {
            if (id === 'binancecoin') {
                walletBalances[id] = await getBalance();
            } else {
                walletBalances[id] = 0;
            }
        }
        return walletBalances;
    };

    useEffect(() => {
        const fetchBalances = async () => {
            const balances = await getWalletBalances();
            setBalances(balances);
        };

        fetchBalances();
    }, []);


    const { coinData, loading, error } = useFetchCoinData(coinIds, 'usd', balances);
    const totalBalance = coinData && coinData.length > 0
        ? coinData.reduce((acc, data) => acc + (parseFloat(data.usdValue) || 0), 0).toFixed(2)
        : '0.00';

    return (
        loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="green" />
            </View>
        ) : (
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } style={{ ...styles.container, backgroundColor: colors.background }}>
                <BalanceChart credit={credit} balance={`$${totalBalance}`} onSend={() => openSheet('send')} onReceive={() => openSheet('receive')} />

                <RBSheet
                    ref={refRBSheet}
                    closeOnPressBack={true}
                    closeOnDragDown={true}
                    height={SIZES.height}
                    openDuration={300}
                    customStyles={{
                        container: {
                            backgroundColor: colors.background,
                        },
                        draggableIcon: {
                            width: 90,
                            height: 0,
                            backgroundColor: colors.borderColor
                        }
                    }}
                >
                    <SearchCoin selectedMethod={selectedMethod} coinData={coinData} refRb={refRBSheet} />
                </RBSheet>


                <View

                >
                    {
                        coinData
                            .sort((a, b) => b.usdValue - a.usdValue)
                            .map((data) => (
                                <View key={data.id} style={[styles.coinList, { backgroundColor: theme.colors.card },
                                theme.dark && {
                                    backgroundColor: theme.colors.background,
                                    paddingHorizontal: 0,
                                },
                                !theme.dark && {
                                    ...GlobalStyleSheet.shadow,
                                }
                                ]}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                    }}>
                                        <View
                                            style={[{
                                                height: 48,
                                                width: 48,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 12,
                                                backgroundColor: theme.colors.background,
                                                borderWidth: 1,
                                                borderColor: theme.colors.borderColor,
                                                marginRight: 12,
                                            }, theme.dark && {
                                                borderWidth: 0,
                                                backgroundColor: theme.colors.card,
                                            }]}
                                        >
                                            <Image
                                                source={{ uri: data.coin }}
                                                style={{
                                                    height: 26,
                                                    width: 26,
                                                    borderRadius: 26,
                                                }}
                                            />
                                        </View>

                                        <TouchableOpacity onPress={() => navigation.navigate('deposit', {
                                            tokenId: data.tokenId
                                        })}>
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                                    <Text style={{ ...FONTS.font, fontSize: 15, ...FONTS.fontMedium, color: theme.colors.title }}>{data.coinName}</Text>
                                                    <Text style={{ ...FONTS.fontXs, color: theme.colors.text, marginLeft: 3 }}>({data.tag})</Text>
                                                </View>
                                                <Text style={{ ...FONTS.fontXs, color: theme.colors.text }}>{data.amount}
                                                    <Text>{' '}</Text>
                                                    <Text style={{ ...FONTS.fontXs, ...FONTS.fontMedium, color: data.trade > 0.00 ? COLORS.success : COLORS.danger }}>
                                                        {data.trade}
                                                    </Text>
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View
                                        style={{
                                            alignItems: 'flex-end',
                                            paddingRight: 5,
                                        }}
                                    >
                                        <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: theme.colors.title, marginBottom: 5 }}>
                                            {isNaN(Number(data.balance)) ? '0.00' : Number(data.balance).toFixed(2)}
                                        </Text>
                                        <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: theme.colors.title, marginBottom: 5 }}>
                                            ${isNaN(Number(data.usdValue)) ? '0.00' : Number(data.usdValue).toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            ))
                    }
                </View>
            </ScrollView>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    coinList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 6,
        marginHorizontal: 15,
        marginVertical: 4,
    },
})

export default Home;

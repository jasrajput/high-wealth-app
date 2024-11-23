import React, { useRef, useState, useEffect, memo } from 'react';

import {
    View,
    StyleSheet,
    Image,
    Text,
    Animated,
    FlatList,
    ActivityIndicator
} from 'react-native';

import HeaderBar from '../layout/header';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';

const loanAmount = 1000;
const TradeBasic = () => {
    const { colors } = useTheme();
    const [transactions, setTransactions] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0);
    const [loading, setLoading] = useState(true);

    const animatedValue = useRef(new Animated.Value(0)).current;

    // Fetch token list and simulate trading
    // useEffect(() => {
    //     const fetchTokens = async () => {
    //         try {
    //             const response = await axios.get('https://open-api.openocean.finance/v3/polygon/tokenList');
    //             startBotSimulation(response.data.data);
    //         } catch (error) {
    //             console.error('Failed to fetch tokens', error);
    //         }
    //     };

    //     fetchTokens();
    // }, []);

    const startBotSimulation = (tokenList) => {
        const simulateTrading = () => {
            // Select 10-15 random unique tokens
            const shuffledTokens = tokenList.sort(() => 0.5 - Math.random());
            const selectedTokens = shuffledTokens.slice(0, Math.floor(Math.random() * 6) + 10);

            const newTransactions = selectedTokens.map(token => {
                // Simulate trading logic
                const amount = Math.random() * 1000;
                const volatility = Math.random() * 0.2 - 0.1; // -10% to +10%
                const profit = amount * volatility;

                return {
                    id: Math.random().toString(),
                    token: token.symbol,
                    amount: amount.toFixed(2),
                    profit: profit.toFixed(2),
                    timestamp: new Date().toLocaleTimeString(),
                    image: token.icon
                };
            });

            // Update transactions and total profit
            setTransactions(prev => {
                const updatedTransactions = [...newTransactions, ...prev].slice(0, 100);
                return updatedTransactions;
            });

            setLoading(false);

            // Calculate total profit
            const newTotalProfit = newTransactions.reduce((sum, tx) => sum + parseFloat(tx.profit), 0);
            setTotalProfit(prev => prev + newTotalProfit);
        }

        // Run simulation every few seconds
        const interval = setInterval(simulateTrading, 3000);
        return () => clearInterval(interval);
    }

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


    const renderTransaction = ({ item }) => (
        <TransactionItem item={item} />
    );

    return (
        <>
            <View style={{ ...styles.container, backgroundColor: colors.background }}>
                <HeaderBar leftIcon={'back'} title="Trade" />
                <View style={{ flex: 1, backgroundColor: '#1A1A1A', padding: 20 }}>
                    <View
                        style={{
                            backgroundColor: '#2C2C2C',
                            padding: 20,
                            borderRadius: 10,
                            marginBottom: 20,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 16, color: '#FFFFFF', marginBottom: 10 }}>
                            Credit Activated!
                        </Text>
                        <Text style={{ fontSize: 36, color: '#55ffc7', fontWeight: 'bold' }}>
                            ${loanAmount}
                        </Text>
                        <Text style={{ fontSize: 14, color: '#AAAAAA', marginTop: 10, textAlign: 'center' }}>
                            You're now empowered with a flash loan of ${loanAmount}.This will be automatically traded on daily basis.
                        </Text>
                    </View>


                    {/* Total Profit/Loss Indicator */}
                    {/* <View style={styles.profitContainer}>
                        <Text style={styles.profitLabel}>Net Daily Profit</Text>
                        <Text style={[
                            styles.profitAmount,
                            { color: transactions.reduce((sum, t) => sum + t.profit, 0) > 0 ? 'green' : 'red' }
                        ]}>
                            ${transactions.reduce((sum, t) => sum + t.profit, 0).toFixed(2)}
                        </Text>
                    </View> */}

                    <View>
                        {/* Transactions List */}
                        {/* Bot Activity Header */}
                        <Animated.View style={[
                            styles.header,
                            {
                                transform: [{
                                    scale: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 1.1]
                                    })
                                }]
                            }
                        ]}>
                            <Text style={styles.headerTitle}>Trading Bot Active</Text>
                            <Text style={styles.totalProfit}>
                                Total Profit: ${totalProfit.toFixed(2)}
                            </Text>
                        </Animated.View>


                        {
                            loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                                <ActivityIndicator size="large" color="green" />
                            </View> : (
                                <FlatList
                                    data={transactions}
                                    renderItem={renderTransaction}
                                    keyExtractor={item => item.id}
                                    style={styles.transactionList}
                                    removeClippedSubviews={true}
                                    maxToRenderPerBatch={10}
                                    windowSize={21}

                                />
                            )
                        }



                    </View>
                </View>
            </View>
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
    }
})

export default TradeBasic;
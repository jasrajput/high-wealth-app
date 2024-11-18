import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES } from '../constants/theme';
import HeaderBar from '../layout/header';
import axios from 'axios';


const Markets = () => {
    const { colors } = useTheme();
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                    }
                });

                const adaptedData = response.data.map((coin, index) => ({
                    id: (index + 1).toString(),
                    icon: coin.image,
                    title: coin.symbol,
                    amount: coin.current_price,
                    change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
                }));

                setMarketData(adaptedData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchCoinData();
    }, []);


    if(loading) {
        return <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <ActivityIndicator size="large" color="green" />
        </View>
    }

    return (
        <>
            <View style={{ ...styles.container, backgroundColor: colors.background }}>
                <HeaderBar leftIcon={'back'} title="Markets" />
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 100,
                    }}
                >
                    <View style={{ paddingHorizontal: 8, paddingVertical: 13, marginTop: 10 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 9,
                            }}
                        >
                            <Text style={{ ...FONTS.h6 }}>Name</Text>
                            <Text style={{ ...FONTS.h6 }}>Price</Text>
                            <Text style={{ ...FONTS.h6 }}>24h Change</Text>
                        </View>

                        {marketData.map((data, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderRadius: SIZES.radius,
                                    marginBottom: 5,
                                    marginRight: 25
                                }}
                            >
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        style={{
                                            height: 20,
                                            width: 20,
                                            resizeMode: 'contain',
                                            borderRadius: 20,
                                            marginRight: 5,
                                        }}
                                        source={{ uri: data.icon }}
                                    />
                                    <Text style={{ ...FONTS.fontSm }}>{String(data.title).toUpperCase()}</Text>
                                </View>

                                <Text style={{ ...FONTS.fontSm }}>
                                    ${data.amount}
                                </Text>

                                <Text
                                    style={{
                                        ...FONTS.fontSm,
                                        color: data.change.startsWith('-') ? 'red' : 'green',
                                        flex: 1,
                                        textAlign: 'right',
                                    }}
                                >
                                    {data.change}
                                </Text>
                            </View>
                        ))}
                    </View>

                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Markets;
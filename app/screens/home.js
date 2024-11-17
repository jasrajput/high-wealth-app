import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, ICONS, SIZES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/styleSheet';
import * as Animatable from 'react-native-animatable';
import BalanceChart from '../components/totalBalanceChart';
import axios from 'axios';


const Home = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const navigation = useNavigation();

    const [coinData, setCoinData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        ids: 'bitcoin,ethereum,tether,ripple,binancecoin,dogecoin,solana,usd-coin,cardano,tron,sui',
                    }
                });

                const adaptedData = response.data.map((coin, index) => ({
                    id: (index + 1).toString(),
                    coin: coin.image,
                    coinName: coin.name,
                    amount: `$${coin.current_price.toFixed(2)}`,
                    trade: `${coin.price_change_percentage_24h.toFixed(2)}%`,
                    tag: coin.symbol.toUpperCase(),
                    tokenId: coin.id
                }));

                setCoinData(adaptedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching coin data:", error);
                setLoading(false);
            }
        };

        fetchCoinData();
    }, []);

    return(
        <View style={{...styles.container,backgroundColor:colors.background}}>
            <ScrollView>
                {
                    loading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ): (
                        <Animatable.View
                    animation="fadeInRight" 
                    duration={1000}
                    delay={2000}
                >
                    <BalanceChart />

                    <ScrollView>
                    {
                        coinData.map((data) => (
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
                                        <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: theme.colors.title, marginBottom: 5 }}>0.00</Text>
                                        {/* Dollar Value for coin*/}
            
                                    </View>
                                </View>
                        ))
                    }
                </ScrollView>
                </Animatable.View>
                    )
                }
            </ScrollView>
                
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
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
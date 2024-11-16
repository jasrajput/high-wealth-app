import React , {useRef, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import { FONTS, SIZES, COLORS, IMAGES } from '../../constants/theme';
import Swiper from 'react-native-swiper';
import {
    LineChart,
} from "react-native-chart-kit";
import { useTheme } from '@react-navigation/native';


const marketData = [
    {
        id:'1',
        title:'Hot Coin #1',
        icon:IMAGES.bitcoin,
        coinTitle:'GXS',
        amount:'1,8098',
        change:'+47.23%',
        data : [20,30,20,60,40,70,50,60,40,65,70,45,70,60,75,80,75,70,75,60,40,70,65,75,60,70,45,70,50]
    },
    {
        id:'2',
        title:'Hot Coin #2',
        icon:IMAGES.ethereum,
        coinTitle:'GXS',
        amount:'1,8098',
        change:'+47.23%',
        data : [20,30,20,60,40,70,50,60,40,65,70,45,70,60,75,80,75,70,75,60,40,70,65,75,60,70,45,70,50]
    },
    {
        id:'3',
        title:'Hot Coin #3',
        icon:IMAGES.dash,
        coinTitle:'GXS',
        amount:'1,8098',
        change:'+47.23%',
        data : [20,30,20,60,40,70,50,60,40,65,70,45,70,60,75,80,75,70,75,60,40,70,65,75,60,70,45,70,50]
    },
    {
        id:'4',
        title:'Hot Coin #4',
        icon:IMAGES.ripple,
        coinTitle:'GXS',
        amount:'1,8098',
        change:'+47.23%',
        data : [20,30,20,60,40,70,50,60,40,65,70,45,70,60,75,80,75,70,75,60,40,70,65,75,60,70,45,70,50]
    },
]


const MarketSwiper = () => {

    const {colors} = useTheme();

    const chartWidth = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {   
        Animated.timing(chartWidth, {
        toValue: SIZES.width,
        duration: 8000,
        useNativeDriver:false,
        }).start();
    });

    return(
        <>
            
            <Swiper 
                showsButtons={false}
                style={{height:220}} loop={false}
                dotStyle={{
                    backgroundColor: "#DDDDDD",
                    height:7,
                    width:7,
                }}
                activeDotStyle={{
                    backgroundColor:COLORS.primary,
                    width:20,
                    height:7,
                }}

            >
                {marketData.map((data,index) => {
                    return(
                        <LinearGradient
                            key={index}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            colors={['#00BA87','#1AA780']}
                            style={{
                                padding:20,
                                position:'relative',
                                borderRadius:SIZES.radius,
                                alignItems:'center',
                                marginHorizontal:10,
                            }}
                        >
                            <View
                                style={{
                                    height:'100%',
                                    width:'100%',
                                    backgroundColor:COLORS.primary,
                                    borderRadius:6,
                                    bottom:-8,
                                    position:'absolute',
                                    zIndex:-1,
                                    opacity:.3,
                                }}
                            ></View>
                            <View
                                style={{
                                    height:'100%',
                                    width:'100%',
                                    backgroundColor:COLORS.primary,
                                    borderRadius:6,
                                    bottom:-16,
                                    position:'absolute',
                                    zIndex:-1,
                                    opacity:.1,
                                    transform:[{scaleX: .9}]
                                }}
                            ></View>
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                width:'100%',
                            }}>
                                <View>
                                    <Text style={{...FONTS.h3,color:COLORS.white,textTransform:'uppercase',marginBottom:3}}>{data.title}</Text>
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                    }}>
                                        <Image
                                            style={{
                                                height:20,
                                                width:20,
                                                resizeMode:'contain',
                                                borderRadius:20,
                                                marginRight:5,
                                            }}
                                            source={data.icon}
                                        />
                                        <Text style={{
                                            ...FONTS.fontSm,
                                            color:COLORS.white,
                                            ...FONTS.fontBold,
                                            marginRight:15,
                                        }}>{data.coinTitle}</Text>
                                        <Text style={{...FONTS.fontSm,color:COLORS.white,...FONTS.fontBold}}>{data.amount}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    alignItems:'flex-end',
                                }}>
                                    <Text style={{...FONTS.fontSm,color:'#55ffc7',...FONTS.fontBold,marginBottom:3}}>{data.change}</Text>
                                    <Text style={{...FONTS.fontSm,color:COLORS.white}}>24h Change</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'flex-end',
                                width:'100%',
                            }}>
                                <Ripple
                                    style={{
                                        height:38,
                                        borderRadius:6,
                                        backgroundColor:'#fff',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        paddingHorizontal:20,
                                    }}
                                >
                                    <Text style={{...FONTS.font,color:'#1e0056'}}>Trade</Text>
                                </Ripple>

                                <View style={{marginBottom:-20,marginRight:-20,overflow:'hidden',flex:1}}>
                                    <Animated.View style={{overflow:'hidden',width:chartWidth}}>
                                        <LineChart
                                            data={{
                                                datasets: [{
                                                    data: data.data,
                                                    color: (opacity = 1) => COLORS.white,
                                                }]
                                            }}
                                            width={300} // from react-native
                                            height={85}
                                            withHorizontalLabels={false}
                                            transparent={true}
                                            withVerticalLabels={false}
                                            yAxisInterval={1} // optional, defaults to 1
                                            chartConfig={{
                                                strokeWidth:2,
                                                //backgroundColor: appTheme.cardBackground,
                                                //backgroundGradientFrom: appTheme.cardBackground,
                                                //backgroundGradientTo: appTheme.cardBackground,
                                                fillShadowGradientFrom:COLORS.white,
                                                fillShadowGradientFromOpacity:.6,
                                                //fillShadowGradientTo:appTheme.cardBackground,
                                                fillShadowGradientToOpacity:0,
                                                decimalPlaces: 2, // optional, defaults to 2dp
                                                color: (opacity = 1) => 'rgb(255,255,255)',
                                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                propsForBackgroundLines: {
                                                    strokeWidth: 0
                                                },
                                                style: {
                                                    borderRadius: 0,
                                                    paddingLeft: 0,
                                                },
                                                propsForDots: {
                                                    r: "0",
                                                    strokeWidth: "2",
                                                },
                                            }}
                                        />
                                    </Animated.View>
                                </View>

                            </View>
                        </LinearGradient>
                    )
                })}
                
            </Swiper>
        </>
    )
}

export default MarketSwiper;
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import {
    LineChart,
} from "react-native-chart-kit";
import { useTheme } from '@react-navigation/native';
import { FONTS, COLORS, IMAGES } from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../constants/styleSheet';

const GainersData = [
    {
        id : "1",
        icon: IMAGES.bitcoin,
        name: "Bitcoin",
        amount:"$2,566.7",
        tag:"BTC",
        balance : "0,0000335",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        gain: "+3.50%",
    },
    {
        id : "2",
        icon: IMAGES.ethereum,
        name: "Ethereum",
        amount:"$1,466.7",
        tag:"ETH",
        balance : "0,0000335",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        gain: "+2.00%",
    },
    {
        id : "3",
        icon: IMAGES.ripple,
        name: "Ripple",
        amount:"$2,000.7",
        tag:"BTC",
        balance : "0,0000335",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        gain: "+3.50%",
    },
    {
        id : "4",
        icon: IMAGES.dash,
        name: "Dash",
        amount:"$1,686.0",
        tag:"DASH",
        balance : "0,0000335",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        gain: "+4.00%",
    },
    {
        id : "5",
        icon: IMAGES.nem,
        name: "NEM",
        amount:"$2,566.7",
        tag:"NEM",
        balance : "0,0000335",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        gain: "+3.50%",
    },
]

const TopGainers = () => {

    const {colors} = useTheme();
    const theme = useTheme();

    return(
        <View style={{paddingTop:15}}>
            { GainersData.map((data, index ) => {
                return (
                    <View
                        key={index}
                    >
                        <View style={[styles.coinList,{backgroundColor:colors.card},
                            theme.dark && {
                                backgroundColor:colors.background,
                                paddingHorizontal:0,
                            },
                            !theme.dark && {
                                ...GlobalStyleSheet.shadow,
                            }
                        ]}>
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                flex:1,
                            }}>
                                <View
                                    style={[{
                                        height:48,
                                        width:48,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        borderRadius:12,
                                        backgroundColor:colors.background,
                                        borderWidth:1,
                                        borderColor:colors.borderColor,
                                        marginRight:12,
                                    },theme.dark && {
                                        borderWidth:0,
                                        backgroundColor:colors.card,
                                    }]}
                                >
                                    <Image
                                        source={data.icon}
                                        style={{
                                            height:26,
                                            width:26,
                                            borderRadius:26,
                                        }}
                                    />
                                </View>
                                <View>
                                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:5}}>
                                        <Text style={{...FONTS.font,fontSize:15,...FONTS.fontMedium,color:colors.title}}>{data.name}</Text>
                                        <Text style={{...FONTS.fontXs,color:colors.text,marginLeft:3}}>({data.tag})</Text>
                                    </View>
                                    <Text style={{...FONTS.fontXs,color:colors.text}}>{data.balance}</Text>
                                </View>
                            </View>
                            <View style={{width:50,height:30,overflow:'hidden',marginRight:30}}>
                                <View style={{marginLeft:-65,marginTop:-8}}>
                                    <LineChart
                                        data={{
                                        datasets: [{
                                            data: data.data,
                                            color: (opacity = 1) => COLORS.success,
                                        }]
                                        }}
                                        transparent={true}
                                        width={120} // from react-native
                                        height={30}
                                        withHorizontalLabels={false}
                                        withVerticalLabels={false}
                                        yAxisInterval={1} // optional, defaults to 1
                                        chartConfig={{
                                            strokeWidth: 2 ,
                                            fillShadowGradientFromOpacity:0,
                                            fillShadowGradientToOpacity:0,
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => 'rgba(255,255,255,0)',
                                            labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                                            propsForBackgroundLines: {
                                                strokeWidth: 0
                                            },
                                            propsForDots: {
                                                r: "0",
                                                strokeWidth: "2",
                                            },
                                        }}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems:'flex-end',
                                    paddingRight:5,
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,marginBottom:5}}>{data.amount}</Text>
                                <Text style={{...FONTS.fontXs,...FONTS.fontMedium,color:COLORS.success}}>{data.gain}</Text>
                            </View>
                        </View>
                        {theme.dark &&
                            <LinearGradient
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                colors={["rgba(255,255,255,.0)","rgba(255,255,255,.1)","rgba(255,255,255,0)"]}
                                style={{
                                    height:1,
                                    width:'100%',
                                    bottom:0,
                                }}
                            >  
                            </LinearGradient>
                        }
                    </View>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    coinList:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:12,
        paddingHorizontal:6,
        paddingVertical:6,
        marginVertical:4,
        marginHorizontal:15,
    }
})

export default TopGainers;
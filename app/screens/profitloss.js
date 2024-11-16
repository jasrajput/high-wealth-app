import React,{useState} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import {
    LineChart,
    BarChart
} from "react-native-chart-kit";

import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES, COLORS, IMAGES } from '../constants/theme';
import HeaderBar from '../layout/header';
import { GlobalStyleSheet } from '../constants/styleSheet';
import AssetsAllocation from '../components/assetsAllocation';
import WalletChart from '../components/wallet/walletChart';


const chartTab = [
    
    {
        status : '1D'
    },
    {
        status : '1W'
    },
    {
        status : '1M'
    },
]


const ProfitLoss = () => {

    const {colors} = useTheme();

    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

    const [status , setStatus] = useState('1M');

    const setChartStatusFilter = status => {
        setStatus(status)
    }

    return(
        <>
            <View style={{...styles.container,backgroundColor:colors.background,flex:1}}>
                <HeaderBar title="Profit & Loss" leftIcon={'back'}/>
                <View
                    style={{flex:1}}
                >
                    <ScrollView>

                        <ImageBackground
                            source={IMAGES.bg1}
                            style={{
                                paddingHorizontal:15,
                                alignItems:'center',
                                paddingVertical:20,
                                overflow:'hidden',
                                borderBottomLeftRadius:20,
                                borderBottomRightRadius:20,
                            }}
                        >
                            <Text style={{...FONTS.font,color:COLORS.white,opacity:.7,marginBottom:6}}>Total Balance</Text>
                            <Text style={{...FONTS.h2,...FONTS.fontMedium,color:COLORS.white,marginBottom:6}}>$5,825.01</Text>
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height:14,
                                        width:14,
                                        borderRadius:16,
                                        marginRight:5,
                                        resizeMode:'contain',
                                    }}
                                    source={IMAGES.bitcoin}
                                />
                                <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.7}}>0.11934841 BTC</Text>
                            </View>
                            <View style={{...GlobalStyleSheet.row,marginTop:25}}>
                                <View style={{...GlobalStyleSheet.col50}}>
                                    <View
                                        style={{
                                            backgroundColor:'rgba(255,255,255,.1)',
                                            paddingHorizontal:15,
                                            alignItems:'center',
                                            paddingVertical:10,
                                            borderRadius:SIZES.radius,
                                        }}
                                    >
                                        <Text style={{...FONTS.fontXs,color:COLORS.white,opacity:.8,textTransform:'uppercase',marginVertical:3}}>Yesterday's P&L</Text>
                                        <View
                                            style={{
                                                flexDirection:'row',
                                                alignItems:'center',
                                            }}
                                            >
                                            <Text style={{...FONTS.h6,color:COLORS.danger}}>- $5.68 </Text>
                                            <Text style={{...FONTS.fontXs,color:COLORS.danger}}>-0.09%</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{...GlobalStyleSheet.col50}}>
                                    <View
                                        style={{
                                            backgroundColor:'rgba(255,255,255,.1)',
                                            paddingHorizontal:15,
                                            alignItems:'center',
                                            paddingVertical:10,
                                            borderRadius:SIZES.radius,
                                        }}
                                    >
                                        <Text style={{...FONTS.fontXs,color:COLORS.white,opacity:.8,textTransform:'uppercase',marginVertical:3}}>Yesterday's P&L</Text>
                                        <View
                                            style={{
                                                flexDirection:'row',
                                                alignItems:'center',
                                            }}
                                        >
                                            <Text style={{...FONTS.h6,color:COLORS.success}}>+$465.37 </Text>
                                            <Text style={{...FONTS.fontXs,color:COLORS.success}}>+4.5%</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                        

                        <View
                            style={{
                                paddingHorizontal:15,
                                paddingTop:20,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor:colors.card,
                                    paddingHorizontal:15,
                                    borderRadius:SIZES.radius,
                                    paddingTop:15,
                                    ...GlobalStyleSheet.shadow,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                        marginBottom:15
                                    }}
                                >
                                    <Text style={{...FONTS.h6,color:colors.title}}>Profit & Loss</Text>
                                    <View style={{flexDirection:'row'}}>
                                        {
                                            chartTab.map((e, index ) => (
                                                <Ripple
                                                    key={index}
                                                    onPress={() => setChartStatusFilter(e.status)}
                                                    style={[
                                                        styles.tabBtn,
                                                        {borderColor:colors.borderColor,
                                                        backgroundColor:colors.card},
                                                        status === e.status && styles.btnTabActive
                                                    ]}
                                                >
                                                    <Text style={[
                                                        {color:colors.text,
                                                        ...FONTS.fontXs},
                                                        status === e.status && styles.btnTabActiveText
                                                    ]}
                                                    >{e.status}</Text>
                                                </Ripple>
                                            ))
                                        }
                                    </View>
                                </View>
                                <View style={{marginBottom:15,marginLeft:-12}}>
                                    <LineChart
                                        data={{
                                            labels: ["12-12", "12-13", "12-14", "12-15", "12-16", "12-17"],
                                            datasets: [{
                                                data: [50,80,50,90,60,80],
                                                color: (opacity = 1) => COLORS.primary,
                                            },
                                            {
                                                data: [70,90,70,110,80,100],
                                                color: (opacity = 1) => COLORS.warning,
                                            }]
                                        }}
                                        width={SIZES.width} // from react-native
                                        height={200}
                                        transparent={true}
                                        bezier
                                        chartConfig={{
                                            strokeWidth:2,
                                            fillShadowGradientFrom:COLORS.primary,
                                            fillShadowGradientFromOpacity:0,
                                            fillShadowGradientTo:'transparent',
                                            fillShadowGradientToOpacity:0,
                                            fillShadowGradientFromOffset:(1 - 0.8),
                                            fillShadowGradientToOffset:(1 - 0.1),
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => 'rgb(255,255,255)',
                                            labelColor: () => colors.title,
                                            propsForBackgroundLines: {
                                                stroke: colors.borderColor
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
                                        decorator={() => {
                                            return tooltipPos.visible ? <View>
                                                <Svg>
                                                    <Rect x={tooltipPos.x - 18} 
                                                        y={tooltipPos.y + 13} 
                                                        width="55" 
                                                        height="25"
                                                        strokeWidth={1}
                                                        stroke={COLORS.primary}
                                                        rx={4}
                                                        fill={colors.background} />
                                                        <TextSVG
                                                            x={tooltipPos.x + 5}
                                                            y={tooltipPos.y + 30}
                                                            fill="white"
                                                            fontSize="14"
                                                            fontWeight="bold"
                                                            textAnchor="middle">
                                                            {tooltipPos.value}
                                                        </TextSVG>
                                                        <TextSVG
                                                            x={tooltipPos.x + 25}
                                                            y={tooltipPos.y + 30}
                                                            fill="white"
                                                            fontSize="14"
                                                            fontWeight="bold"
                                                            textAnchor="middle">
                                                            K
                                                        </TextSVG>
                                                </Svg>
                                            </View> : null
                                        }}

                                        onDataPointClick={(data) => {

                                            let isSamePoint = (tooltipPos.x === data.x 
                                                                && tooltipPos.y === data.y)
                        
                                            isSamePoint ? setTooltipPos((previousState) => {
                                                return { 
                                                        ...previousState,
                                                        value: data.value,
                                                        visible: !previousState.visible
                                                    }
                                            })
                                                : 
                                            setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });
                        
                                        }}

                                    />
                                </View>
                            </View>
                            
                            <AssetsAllocation/>


                            <View
                                style={{
                                    backgroundColor:colors.card,
                                    paddingHorizontal:15,
                                    borderRadius:SIZES.radius,
                                    paddingTop:20,
                                    marginTop:15,
                                    ...GlobalStyleSheet.shadow,
                                }}
                            >

                                <View
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                        marginBottom:15,
                                    }}
                                >
                                    <Text style={{...FONTS.h6,color:colors.title}}>Daily Profit & Loss</Text>
                                    <Text style={{...FONTS.h6,color:COLORS.danger}}>-$5.68</Text>
                                </View>
                                <View
                                    style={{
                                        marginBottom:20,
                                        marginLeft:-12,
                                    }}
                                >
                                    <BarChart
                                        data={{
                                            labels: ["12-12", "12-13", "12-14", "12-15", "12-16", "12-17"],
                                            datasets: [
                                                {
                                                    data: [140, -60, 120, -70, 130 , -40 ,110,-80,50,-40,60,-70,30,-50,70,-20,80,-70,60,-50,30,-60,40,-70],
                                                    colors:[
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                        (opacity = 1) => COLORS.success,
                                                        (opacity = 1) => COLORS.danger,
                                                    ]
                                                }
                                            ],
                                        }}
                                        width={SIZES.width - 55}
                                        height={200}
                                        showBarTops={false}
                                        withCustomBarColorFromData={true}
                                        flatColor={true}
                                        chartConfig={{
                                            backgroundColor: 'transparent',
                                            backgroundGradientFrom: '#fff',
                                            backgroundGradientTo: '#fff',
                                            backgroundGradientFromOpacity:0,
                                            backgroundGradientToOpacity:0,
                                            barPercentage:.25,
                                            barRadius:2,
                                            propsForBackgroundLines: {
                                                stroke: colors.borderColor
                                            },
                                            color: () => COLORS.primary,
                                            labelColor: () => colors.title,
                                        }}
                                    />   
                                </View>
                            </View>

                             <WalletChart/>
                        </View>

                    </ScrollView>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    tabBtn:{
        paddingHorizontal:10,
        paddingVertical:3,
        width:42,
        alignItems:'center',
        borderRadius:4,
        borderWidth:1,
        marginHorizontal:3,
    },
    btnTabActive:{
        backgroundColor:COLORS.primary,
        borderColor:COLORS.primary,
    },
    btnTabActiveText:{
        color:'#fff',
    }
})

export default ProfitLoss;
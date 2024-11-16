import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, IMAGES, SIZES } from '../../constants/theme';

import {
    LineChart
} from "react-native-chart-kit";
import Svg, { Rect , Text as TextSVG } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';


const chartTab = [
    {
        status : '24H'
    },
    {
        status : '1W'
    },
    {
        status : '1M'
    },
    {
        status : '1Y'
    },
    {
        status : 'All'
    }
]

const hourData = [50,80,50,90,60,80]
const weekData = [60,80,60,40,50,80,30,90,70,100]
const monthData = [50,80,50,60,90,70,100]
const yearData = [20,50,20,60,40,60,80]
const allData = [50,80,50,90,60,80,60,90,70,100]

const BalanceChart = (props) => {

    const {colors} = useTheme();

    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

    const [status , setStatus] = useState('All');
    const [chartData , setChartdata] = useState(allData);

    const setChartStatusFilter = status => {
        switch(status){
            case "24H":
                setChartdata(hourData);
                break;
            case "1W":
                setChartdata(weekData);
                break;
            case "1M":
                setChartdata(monthData);
                break;
            case "1Y":
                setChartdata(yearData);
                break; 
            case "All":
                setChartdata(allData);
                break;
        }
        setStatus(status)
    }

    return (
        <>
        
            <View
                style={[{
                    paddingHorizontal:15,
                    paddingVertical:20,
                    backgroundColor:colors.background,
                },
                props.home && {
                    paddingBottom:55,
                }
                ]}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                    <LinearGradient
                        colors={["#6F4FEF","#4628FF"]}
                        style={{
                            height:38,
                            width:38,
                            borderRadius:38,
                            backgroundColor:COLORS.primary,
                            alignItems:'center',
                            justifyContent:'center',
                            marginRight:8,
                        }}
                    >
                        <Image
                            style={{
                                tintColor:COLORS.white,
                                height:22,
                                width:22,
                                resizeMode:'contain',
                            }}
                            source={IMAGES.dollor}
                        />
                    </LinearGradient>
                    <View>
                        <Text style={{...FONTS.fontSm,color:colors.text,marginBottom:6,marginTop:2}}>Total Balance</Text>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <Text style={{...FONTS.h3,color:colors.title,...FONTS.fontMedium}}>$48,864.5</Text>
                            <Text style={{...FONTS.fontSm,color:COLORS.success,marginLeft:6}}>+$313.39(2.5%)</Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        marginLeft:-18,
                        marginTop:15,
                    }}
                >
                    <LineChart
                        data={{
                            labels: ["12-12", "12-13", "12-14", "12-15", "12-16"],
                            datasets: [{
                                data: chartData,
                                color: (opacity = 1) => COLORS.primary,
                            }]
                        }}
                        width={SIZES.width + 35} // from react-native
                        height={165}
                        transparent={true}
                        bezier
                        withVerticalLines={false}
                        chartConfig={{
                            strokeWidth:2,
                            fillShadowGradientFrom:COLORS.primary,
                            fillShadowGradientFromOpacity:.3,
                            fillShadowGradientTo:'transparent',
                            fillShadowGradientToOpacity:0,
                            fillShadowGradientFromOffset:(1 - 0.8),
                            fillShadowGradientToOffset:(1 - 0.1),
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => 'rgb(255,255,255)',
                            labelColor: () => colors.text,
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
                                        fill={colors.cardbackground} />
                                        <TextSVG
                                            x={tooltipPos.x + 5}
                                            y={tooltipPos.y + 30}
                                            fill={colors.title}
                                            fontSize="14"
                                            fontWeight="bold"
                                            textAnchor="middle">
                                            {tooltipPos.value}
                                        </TextSVG>
                                        <TextSVG
                                            x={tooltipPos.x + 25}
                                            y={tooltipPos.y + 30}
                                            fill={colors.title}
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
                <View style={{flexDirection:'row',marginBottom:8,justifyContent:'center',marginTop:20}}>
                    {
                        chartTab.map((e, index ) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setChartStatusFilter(e.status)}
                                style={[
                                    styles.tabBtn,
                                    {
                                        //backgroundColor:'rgba(142,165,200,.3)'
                                        backgroundColor:colors.bgLight,
                                        borderColor:colors.borderColor,
                                    },
                                    e.status === status && {
                                        backgroundColor:COLORS.primary,
                                        borderColor:COLORS.primary,
                                    }
                                ]}
                            >
                                <Text style={[{...FONTS.fontSm,color:colors.title},e.status === status && {color:COLORS.white}]}>{e.status}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

            

        </>
    );
};

const styles = StyleSheet.create({
    tabBtn:{
        paddingHorizontal:15,
        paddingVertical:4,
        alignItems:'center',
        borderRadius:6,
        marginHorizontal:3,
        borderWidth:1,
    },
})

export default BalanceChart;
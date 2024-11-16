import React,{useState} from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';

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
    {
        status : '1Y'
    }
]


const WalletChart = () => {

    const {colors} = useTheme();

    const yearData = [40,25,42,45,50,35,25,48,40,45,42,26,5,30,28,40,38,35,20,38,40,50,35,20,45,35,28,40,20,42,20,25,40,35,20,45,35,28,40,20,42,20,25,40]
    const monthData = [40,25,42,45,50,35,25,48,40,45,42,26,5,30,28,40,38,35,20,38,40,50,35,20,45,35,28,40,20,42,20,25,40]
    const weekData = [28,40,38,35,20,38,40,50,35,20,45,35,28,40,20,42,20,25,40]
    const dayData = [35,20,45,35,28,40,20,42,20,25,40]

    const [status , setStatus] = useState('1M');
    const [data , setData] = useState(monthData);

    const setChartStatusFilter = status => {
        switch(status){
            case "1D":
                setData(dayData);
                break;
            case "1W":
                setData(weekData);
                break;
            case "1M":
                setData(monthData);
                break;
            case "1Y":
                setData(yearData);
                break; 
        }
        setStatus(status)
    }


    return(
            <View style={{
                marginBottom:20,
                backgroundColor:colors.card,
                borderRadius:SIZES.radius,
                paddingHorizontal:15,
                paddingVertical:15,
                marginTop:15,
                ...GlobalStyleSheet.shadow
            }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                    <View>
                        <Text style={{
                            ...FONTS.fontXs,
                            color:colors.text,
                            textTransform:'uppercase',
                            marginBottom:3,    
                        }}>Total Balance</Text>
                        <Text style={{...FONTS.h6,color:COLORS.primary}}>$48,864000.5</Text>
                    </View>
                    
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
                <VerticalBarGraph
                    data={data}
                    width={SIZES.width - 60}
                    height={100}
                    barRadius={1}
                    barColor={COLORS.primary}
                    barWidthPercentage={0.55}
                    baseConfig={{
                        xAxisBackgroundLineStyle:{
                            color:colors.borderColor,
                        },
                        hasYAxisLabels:false,
                        xAxisLabelStyle: {
                            position: 'left',
                            suffix: 'k',
                            ...FONTS.fontXs,
                            width:40,
                            color:colors.title,
                        },
                        yAxisLabelStyle:{
                            fontSize:10,
                            color:colors.title,
                        }
                    }}
                    style={{
                        paddingVertical: 10
                    }}
                />      
            </View>
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


export default WalletChart;
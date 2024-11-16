import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import PieChart from 'react-native-pie-chart';
import { FONTS, SIZES, COLORS } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/styleSheet';

const AssetsAllocation = () => {

    const {colors} = useTheme();

    const widthAndHeight = 110
    const series = [50, 40, 30, 60]
    const sliceColor = [COLORS.danger,COLORS.yellow,COLORS.primary,COLORS.info]

    return(
        
        <View style={[{
            paddingHorizontal:15,
            paddingVertical:15,
            backgroundColor:colors.card,
            borderRadius:SIZES.radius,
            flexDirection:'row',
            alignItems:'center',
            marginTop:15,
            ...GlobalStyleSheet.shadow,
        }
        ]}>
            <View style={{
                marginRight:25,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.85}
                    coverFill={colors.card}
                />
                
                <View
                    style={[{
                        height:60,
                        width:60,
                        borderRadius:60,
                        backgroundColor: colors.card,
                        position:'absolute',
                        alignItems:'center',
                        justifyContent:'center',
                    }]}
                >
                    <Text style={{...FONTS.h4,color:colors.title}}>56%</Text>
                </View>
            </View>
            <View style={{flex:1}}>
                <Text style={{...FONTS.h6,color:colors.title,marginBottom:10}}>Assets Allocation</Text>
                <View style={styles.chartLabel}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{...styles.dot,backgroundColor:COLORS.danger}}></View>
                        <Text style={{
                            ...FONTS.fontXs,
                            color:colors.text,
                            opacity: 1,
                        }}>XTZ(40%)</Text>
                    </View>
                    <Text style={{...FONTS.fontXs,...FONTS.fontBold,color:colors.title}}>$2,672</Text>
                </View>
                <View style={styles.chartLabel}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{...styles.dot,backgroundColor:COLORS.yellow}}></View>
                        <Text style={{
                            ...FONTS.fontXs,
                            color:colors.text,
                            opacity:1,
                        }}>XTZ(40%)</Text>
                    </View>
                    <Text style={{...FONTS.fontXs,...FONTS.fontBold,color:colors.title}}>$2,672</Text>
                </View>
                <View style={styles.chartLabel}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{...styles.dot,backgroundColor:COLORS.primary}}></View>
                        <Text style={{
                            ...FONTS.fontXs,
                            color:colors.text,
                            opacity: 1,
                        }}>XTZ(40%)</Text>
                    </View>
                    <Text style={{...FONTS.fontXs,...FONTS.fontBold,color:colors.title}}>$2,672</Text>
                </View>
                <View style={styles.chartLabel}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{...styles.dot,backgroundColor:COLORS.info}}></View>
                        <Text style={{
                            ...FONTS.fontXs,
                            color:colors.text,
                            opacity: 1,
                        }}>XTZ(40%)</Text>
                    </View>
                    <Text style={{...FONTS.fontXs,...FONTS.fontBold,color:colors.title}}>$2,672</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    dot:{
        height:12,
        width:12,
        borderRadius:12,
        marginRight:8,
    },
    chartLabel:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:5,
    }
})


export default AssetsAllocation;
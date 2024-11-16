import React , {useRef, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Animated,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import {
    LineChart,
} from "react-native-chart-kit";
import Ripple from 'react-native-material-ripple';

import { FONTS, SIZES, COLORS, ICONS } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/styleSheet';

const cardData = [
    {
        id : "1",
        pic: ICONS.wallet2,
        title: "Total Balance",
        balance: "$5,770.90",
        amount: "0.11857418",
        status: "total",
        data : [25,30,35,60,40,70,50,60,40,70,65,75,60,70,45,70,50],
        navigate: 'Wallet'
    },
    {
        id : "2",
        pic: ICONS.chart,
        title: "Profit & Loss",
        balance: "$21,560.90",
        amount: "+4.98%",
        status: "profit&loss",
        data : [25,30,35,60,40,70,50,60,40,70,65,75,60,70,45,70,50],
        navigate: 'profitloss'
    },
    {
        id : "3",
        pic: ICONS.trophy,
        title: "Rewards Earned",
        balance: "21,560.57",
        status: "reward",
        data : [25,30,35,60,40,70,50,60,40,70,65,75,60,70,45,70,50],
        navigate: 'rewards'
    }
]


const BalanceWidgets = () => {

    const {colors} = useTheme();
    const navigation = useNavigation();
    const chartWidth = useRef(new Animated.Value(0)).current;
    
    useEffect(() => { 
        setTimeout(() => {  
            Animated.timing(chartWidth, {
                toValue: 190,
                duration: 7000,
                useNativeDriver:false,
            }).start();
        }, 1000);
    });

    return(
        <FlatList
            horizontal
            contentContainerStyle={{
                paddingLeft:15,
                paddingTop:20,
            }}
            showsHorizontalScrollIndicator={false}
            data={cardData}
            renderItem={({ item }) => (
                <Ripple 
                    onPress={() => navigation.navigate(item.navigate)}
                    style={[{
                        width:140,
                        borderRadius:12,
                        position:'relative',
                        backgroundColor:colors.card,
                        ...GlobalStyleSheet.shadow,
                        marginBottom:30,
                        marginRight:12,
                    }]}
                >
                    <View style={{
                        paddingHorizontal:15,
                        paddingVertical:18,
                    }}>
                        <View style={[styles.cardIco,{backgroundColor:colors.background,borderWidth:1,borderColor:colors.borderColor}]}>
                            <Image style={{
                                width:18,
                                height:18,
                                tintColor:item.status === "total" ? COLORS.warning :
                                        item.status === "profit&loss" ? COLORS.success:
                                        item.status === "reward" ? COLORS.info : COLORS.primary,
                            }} source={item.pic}/>
                        </View>
                        <Text style={{...FONTS.fontXs,marginBottom:6,color:colors.text}}>{item.title}</Text>
                        <Text
                            style={{
                                ...FONTS.h6,
                                marginBottom:4,
                                color:colors.title,
                            }}
                        >{item.balance}</Text>
                        <Animated.View style={{overflow:'hidden',width:chartWidth,marginBottom: 0,marginLeft:-70}}>
                            
                            <LineChart
                                data={{
                                    datasets: [{
                                        data: item.data,
                                        color: (opacity = 1) => item.status === 'total' ? COLORS.warning :
                                        item.status === 'profit&loss' ? COLORS.success:
                                        item.status === 'reward' ?  COLORS.info:
                                        COLORS.primary,
                                    }]
                                }}
                                width={190} // from react-native
                                height={50}
                                withHorizontalLabels={false}
                                transparent={true}
                                withVerticalLabels={false}
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    strokeWidth:2,
                                    fillShadowGradientFrom:
                                    item.status === 'total' ? COLORS.warning :
                                    item.status === 'profit&loss' ? COLORS.success:
                                    item.status === 'reward' ? COLORS.info:
                                    COLORS.primary,
                                    fillShadowGradientFromOpacity:.3,
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
                </Ripple>
            )}
            keyExtractor={(item) => item.id}
        />
    )
}

const styles = StyleSheet.create({
    cardIco:{
        height:42,
        width:42,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,.1)',
        borderRadius:SIZES.radius,
        marginBottom:15,
    },
    cardPattern:{
        position:'absolute',
        width:'100%',
        height:'100%',
        zIndex:-1,
        right:0,
        top:0,
        resizeMode:'cover',
    }
})

export default BalanceWidgets;
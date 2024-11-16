import React , {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {Defs, LinearGradient, Stop} from "react-native-svg";
import { VictoryArea, VictoryChart } from 'victory-native';
import { FONTS, SIZES, COLORS, ICONS, IMAGES } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const chartTab = [
    {
        status : '1H'
    },
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
    },
    {
        status : 'All'
    }
]


const hourData = [50,20,30,20,20,60];
const dayData = [35,20,45,50,35,60,45,70,35];
const weekData = [40,55,31,65,45,55,42,30,65];
const monthData = [60,50,45,38,20,45,65,28,45,52];
const yearData = [25,35,50,32,25,52,62,34,45,25];
const allData = [20,40,35,50,25,60,50,70,60,75,20,50,43];

const BalanceChart = ({headerTitle,header}) => {


    const navigation = useNavigation();

    const [status , setStatus] = useState('All');
    const [chartdata, setChartdata] = useState(allData);
    
    const setChartStatusFilter = status => {
        switch(status){
            case "1H":
                setChartdata(hourData);
                break;
            case "1D":
                setChartdata(dayData);
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
    

    return(
        
        <ImageBackground 
            source={IMAGES.bg1}
            style={[{
                alignItems:'center',
                backgroundColor:COLORS.secondary,
                paddingBottom:20,
                borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
                overflow:'hidden',
            }, header === false && {
                paddingTop:30,
            }]}
        >
            {header != false &&
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:10,
                        flexDirection:'row',
                        width:'100%',
                        alignItems:'center',
                        marginBottom:5,
                    }}
                >
                    <Text style={{...FONTS.h6,color:COLORS.white,flex:1}}>{headerTitle ? headerTitle : "Home"}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('notifications')}
                        style={{
                            height:40,
                            width:40,
                            borderRadius:SIZES.radius,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'rgba(255,255,255,.1)',
                            marginRight:6,
                        }}
                    >
                        <Image
                            source={ICONS.bell}
                            style={{
                                height:20,
                                width:20,
                            }}
                        />
                        <View
                            style={{
                                height:5,
                                width:5,
                                borderRadius:6,
                                backgroundColor:"#B94646",
                                position:'absolute',
                                top:14,
                                right:13,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={{
                            height:40,
                            width:40,
                            borderRadius:SIZES.radius,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'rgba(255,255,255,.1)',
                        }}
                    >
                        <FeatherIcon
                            name='grid'
                            size={20}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                </View>
            }
            <Animatable.Text 
                animation="zoomInUp" 
                duration={1000}
                delay={500}
                style={{
                    ...FONTS.fontXs,
                    color:'rgba(255,255,255,.6)',
                    marginBottom:8,
                }}>Total Balance</Animatable.Text>
            <Animatable.Text 
                animation="zoomInUp" 
                duration={1000}
                delay={500}
                style={{...FONTS.h2,color:COLORS.white}}>$940,563.84</Animatable.Text>
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    backgroundColor:'rgba(255,255,255,.1)',
                    borderRadius:30,
                    paddingHorizontal:20,
                    paddingVertical:6,
                    marginTop:8,
                }}
            >
                <Text style={{...FONTS.fontXs,color:"rgba(255,255,255,.6)",lineHeight:16}}>BTC: 0,00335</Text>
                <Text style={{...FONTS.fontXs,color:COLORS.primary,lineHeight:16,...FONTS.fontMedium}}>+5.64%</Text>
            </View>
            <View style={{width:SIZES.width,alignItems:'flex-start',paddingTop:35}}>
                
                <VictoryChart 
                height={120}
                padding={0}>
                <Defs>
                    <LinearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="gradientStroke" >
                    <Stop offset="0%" stopOpacity={.3} stopColor={COLORS.primary}/>
                    <Stop offset="70%" stopOpacity={0} stopColor={COLORS.primary}/>
                    <Stop offset="100%" stopOpacity={0} stopColor={COLORS.primary}/>
                    </LinearGradient>
                </Defs>
                <VictoryArea
                    domain={{y : [0,80]}}
                    interpolation="natural"
                    animate={{
                    duration: 500,
                    onLoad: { duration: 1000 }
                    }}
                    style={{
                    data: {
                        fill: 'url(#gradientStroke)', fillOpacity: 0.6, stroke: COLORS.primary, strokeWidth: 2
                    },
                    labels: {
                        fontSize: 15,
                        fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
                    },
                    
                    }}
                    data={chartdata}
                    labels={({ datum }) => datum.x}
                />
                </VictoryChart>

            </View>
            <View style={{flexDirection:'row'}}>
                {
                    chartTab.map((e, index ) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setChartStatusFilter(e.status)}
                            style={[
                                styles.tabBtn,
                                {
                                backgroundColor:'rgba(255,255,255,.1)'},
                                status === e.status && styles.btnTabActive,
                            ]}
                        >
                            <Text style={[
                                {color:COLORS.white,
                                ...FONTS.font},
                                status === e.status && styles.btnTabActiveText
                            ]}
                            >{e.status}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    tabBtn:{
        paddingHorizontal:10,
        paddingVertical:4,
        width:50,
        alignItems:'center',
        borderRadius:4,
        marginHorizontal:3,
    },
    btnTabActive:{
        backgroundColor:COLORS.white,
    },
    btnTabActiveText:{
        color:COLORS.title,
    }
})


export default BalanceChart;
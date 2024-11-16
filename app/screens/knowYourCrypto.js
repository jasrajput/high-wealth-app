import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { FONTS, SIZES, COLORS, IMAGES } from '../constants/theme';
import Ripple from 'react-native-material-ripple';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HeaderBar from '../layout/header';
import BalanceChart from '../components/totalBalanceChart';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../constants/styleSheet';

const EventDATA = [
    {
        pic: IMAGES.event1,
        desc:'The transaction was made with what is possibly the largest transaction fee ever to  crypto. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with of struggling. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with operators of struggling. Miners keep on finding ways to use the excess power which would otherwise wasted – this time shaking hands with operators of struggling.',
    },
    {
        pic: IMAGES.event2,
        desc:'The transaction was made with what is possibly the largest transaction fee ever to  crypto. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with of struggling. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with operators of struggling. Miners keep on finding ways to use the excess power which would otherwise wasted – this time shaking hands with operators of struggling.',
    },
    {
        pic: IMAGES.event3,
        desc:'The transaction was made with what is possibly the largest transaction fee ever to  crypto. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with of struggling. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with operators of struggling. Miners keep on finding ways to use the excess power which would otherwise wasted – this time shaking hands with operators of struggling.',
    },
]

const KnowYourCrypto = () => {

    const {colors} = useTheme();

    return(
        <>
            <View style={{...styles.container,backgroundColor:colors.background,flex:1}}>
                <HeaderBar title="Know Your Crypto!" leftIcon={'back'}/>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom:30,
                    }}
                >
                    
                    <BalanceChart header={false}/>
                    
                    <View
                        style={{
                            paddingHorizontal:SIZES.padding,
                            paddingVertical:20,
                            marginBottom:10,
                        }}
                    >
                        
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                            }}
                        >
                            <View>
                                <Text style={{...FONTS.fontXs,color:colors.text,marginBottom:5}}>Price</Text>
                                <Text style={{...FONTS.fontSm,color:colors.title}}>$42,485.92</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={{...FONTS.fontXs,color:colors.text,marginBottom:5}}>24h Change</Text>
                                <Text style={{...FONTS.fontSm,color:COLORS.danger}}>1.11%</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={{...FONTS.fontXs,color:colors.text,marginBottom:5}}>24h Volume</Text>
                                <Text style={{...FONTS.fontSm,color:colors.title}}>$68.58B</Text>
                            </View>
                            <View  style={{alignItems:'flex-end'}}>
                                <Text style={{...FONTS.fontXs,color:colors.text,marginBottom:5}}>Market Cap</Text>
                                <Text style={{...FONTS.fontSm,color:colors.title}}>$549.84B</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[{
                            backgroundColor:colors.card,
                            borderRadius:SIZES.radius,
                            padding:SIZES.padding,
                            marginBottom:SIZES.margin,
                            marginHorizontal:10,
                            ...GlobalStyleSheet.shadow,
                        }]}
                    >
                        <Text style={[FONTS.h6,{color:colors.title,marginBottom:SIZES.margin}]}>About Coin</Text>
                        <View
                            style={{
                                backgroundColor:colors.card,
                                borderWidth:1,
                                borderColor:colors.borderColor,
                                flexDirection:'row',
                                alignItems:'center',
                                borderRadius:SIZES.radius,
                                padding:10,
                                marginBottom:SIZES.margin,
                            }}
                        >
                            <Image 
                                style={{
                                    marginRight:10,
                                    height:35,
                                    width:35,
                                    borderRadius:35,
                                }}
                            source={IMAGES.bitcoin}/>
                            <View style={{flex:1}}>
                                <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,marginBottom:4}}>Digital Cash</Text>
                                <Text style={{...FONTS.fontXs,color:colors.text}}>1 BTC = 68.48 USD</Text>
                            </View>
                            <Ripple
                                style={{
                                    backgroundColor:COLORS.primary,
                                    height:35,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    borderRadius:6,
                                    paddingHorizontal:10,
                                }}
                            >
                                <Text style={{...FONTS.font,color:COLORS.white}}>Trade</Text>
                            </Ripple>
                        </View>
                        
                        <Text style={{...FONTS.fontSm,color:colors.text}}>Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called “masternodes”. The currency permits transactions that can be untraceable.</Text>
                        
                        <Ripple
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center',
                                marginTop:SIZES.margin,
                            }}
                        >
                            <Text style={{...FONTS.fontSm,color:COLORS.primary,marginRight:2}}>Show More</Text>
                            <FeatherIcon color={COLORS.primary} size={18} name='chevron-down'/>
                        </Ripple>

                    </View>
                    <Text style={{...FONTS.h6,color:colors.title,marginHorizontal:10,marginBottom:10,marginTop:10}}>News & Events About Bitcoin</Text>
                    
                    {EventDATA.map((data,index) => {
                        return(
                            <View 
                                key={index}
                                style={[{
                                    ...styles.eventCard,
                                    backgroundColor:colors.card,
                                    ...GlobalStyleSheet.shadow,
                                }]} 
                            >
                                <View
                                    style={{flexDirection:'row'}}
                                >
                                    <Image 
                                        style={{
                                            height:70,
                                            width:100,
                                            borderRadius:SIZES.radius,
                                            marginRight:15,
                                            
                                        }}
                                    source={data.pic}/>
                                    <View style={{flex:1,position:'relative'}}>
                                        <Text numberOfLines={3} style={{...FONTS.font,color:colors.text}}>{data.desc}</Text>
                                        <TouchableOpacity activeOpacity={.9} style={{position:'absolute',right:0,bottom:9,backgroundColor:colors.card,paddingLeft:5}}>
                                            <Text style={{...FONTS.font,color:COLORS.primary}}>Show More</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    eventCard:{
        marginHorizontal:10,
        padding:12,
        borderRadius:SIZES.radius,
        marginBottom:10,
    }
})


export default KnowYourCrypto;
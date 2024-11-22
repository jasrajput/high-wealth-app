import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Modal,
} from 'react-native';

import { FONTS, SIZES, COLORS, ICONS, IMAGES } from '../constants/theme';
import Ripple from 'react-native-material-ripple';

import HeaderBar from '../layout/header';
import { GlobalStyleSheet } from '../constants/styleSheet';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';


const socialLink = [
    {
        icon : ICONS.facebook,
    },
    {
        icon : ICONS.whatsapp,
    },
    {
        icon : ICONS.instagram,
    },
    {
        icon : ICONS.twitter,
    },
]

const tableData = [
    {
        num:'#1',
        split:'25%',
    },
    {
        num:'#2',
        split:'20%',
    },
    {
        num:'#3',
        split:'15%',
    },
    {
        num:'#4',
        split:'10%',
    },
    {
        num:'#5',
        split:'8%',
    },
    {
        num:'#6',
        split:'7%',
    },
    {
        num:'#7',
        split:'6%',
    },
    {
        num:'#8',
        split:'5%',
    },
    {
        num:'#9',
        split:'3%',
    }
]




const Rewards = () => {

    const {colors} = useTheme();

    return(
        <>


            <View style={{...styles.container,backgroundColor:colors.background}}>
                <HeaderBar title="Rewards" leftIcon={'back'}/>
                <ScrollView>
                    <View style={{paddingBottom:30,paddingTop:20}}>
                        <ImageBackground 
                            source={IMAGES.bg1}
                            style={[{
                                borderRadius:SIZES.radius_lg,
                                paddingHorizontal:18,
                                paddingVertical:25,
                                marginHorizontal:15,
                                borderWidth:1,
                                borderColor:colors.borderColor,
                                overflow:'hidden',
                                marginBottom:20
                            }]}
                        >
                            <Text style={{...FONTS.font,...FONTS.fontMedium,color:COLORS.white,marginBottom:18}}>Share your referral link and earn crypto when others trade</Text>
                            <View>
                                <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Referral ID</Text>
                                <LinearGradient 
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    colors={["rgba(255,255,255,.05)","rgba(255,255,255,.1)","rgba(255,255,255,.05)"]}
                                    style={{borderColor:colors.borderColor,...GlobalStyleSheet.formControl}}>
                                    <TextInput
                                        style={{...GlobalStyleSheet.Input,color:COLORS.white}}
                                        value='AZ19ZGSH'
                                    />  
                                    <View style={{
                                        flexDirection:'row',
                                        position:'absolute',
                                        right:18,
                                        top:12,
                                    }}>
                                        <TouchableOpacity>
                                            <Image
                                            style={{
                                                height:20,
                                                width:20,
                                                resizeMode:'contain',
                                                tintColor:COLORS.primary
                                            }}
                                            source={ICONS.copy}/>
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>
                            </View>

                            <View>
                                <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Referral Link</Text>
                                <LinearGradient 
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    colors={["rgba(255,255,255,.05)","rgba(255,255,255,.1)","rgba(255,255,255,.05)"]}
                                    style={{borderColor:colors.borderColor,...GlobalStyleSheet.formControl}}>
                                    <TextInput
                                        style={{...GlobalStyleSheet.Input,color:COLORS.white}}
                                        value='0xbc6b1972ea764159a4cf1c03774'
                                    />  
                                    <View style={{
                                        flexDirection:'row',
                                        position:'absolute',
                                        right:18,
                                        top:12,
                                    }}>
                                        <TouchableOpacity>
                                            <Image
                                            style={{
                                                height:20,
                                                width:20,
                                                resizeMode:'contain',
                                                tintColor:COLORS.primary
                                            }}
                                            source={ICONS.copy}/>
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>
                            </View>
                            
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                {socialLink.map((data,index) => {
                                    return(
                                        <Ripple key={index}
                                            style={[{
                                                ...styles.socialIcon,
                                                backgroundColor:"rgba(255,255,255,.1)"
                                            }]}
                                        >
                                            <Image
                                                style={{
                                                    height:20,
                                                    width:20,
                                                    resizeMode:'contain',
                                                }}
                                                source={data.icon}
                                            />
                                        </Ripple>
                                    )
                                })}
                            </View>

                        </ImageBackground>
                        
                        <View style={{...GlobalStyleSheet.row,paddingHorizontal:15,marginBottom:35}}>
                            <View style={{...GlobalStyleSheet.col50}}>
                                <View
                                    style={{
                                        borderRadius:SIZES.radius,
                                        padding:20,
                                        backgroundColor:colors.card,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >   
                                    <View
                                        style={{
                                            height:40,
                                            width:40,
                                            borderRadius:SIZES.radius,
                                            backgroundColor:COLORS.primaryLight,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            marginBottom:10
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:20,
                                                width:20,
                                                resizeMode:'contain',
                                                tintColor:COLORS.primary,
                                            }}
                                            source={ICONS.customer}
                                        />
                                    </View>
                                    <Text style={{...FONTS.font,color:colors.title}}>Your Community</Text>
                                    <Text style={{...FONTS.h2,color:COLORS.primary,lineHeight:37}}>99</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>Referrals</Text>
                                </View>
                            </View>
                            <View style={{...GlobalStyleSheet.col50}}>
                                <View
                                    style={{
                                        borderRadius:SIZES.radius,
                                        padding:20,
                                        position:'relative',
                                        backgroundColor:colors.card,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >   
                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                                        <View
                                            style={{
                                                height:40,
                                                width:40,
                                                borderRadius:SIZES.radius,
                                                backgroundColor:COLORS.primaryLight,
                                                alignItems:'center',
                                                justifyContent:'center'
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height:22,
                                                    width:22,
                                                    resizeMode:'contain',
                                                    tintColor:COLORS.primary,
                                                }}
                                                source={ICONS.dollor}
                                            />
                                        </View>
                                    </View>
                                    <Text style={{...FONTS.font,color:colors.title}}>Total Rewards</Text>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}
                                    >
                                        <Text style={{...FONTS.h5,...FONTS.fontMedium,lineHeight:37,color:colors.title}}>75.33</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{marginHorizontal:15,marginBottom:20}}>
                            <View style={{alignItems:'center',marginHorizontal:6,marginBottom:20}}>
                                <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title,textAlign:'center',marginBottom:8}}>Track your income with our unique five-tier referral system</Text>
                                <Text style={{...FONTS.fontXs,color:colors.text,textAlign:'center'}}>Crypto Money shares 20% of its trading fee profits from your direct and indirect referrals.</Text>
                            </View>
                            <View   
                                style={[{
                                    backgroundColor:colors.card,
                                    borderRadius:SIZES.radius,
                                    flexDirection:'row',
                                    paddingVertical:10,
                                    ...GlobalStyleSheet.shadow,
                                }]}
                            >
                                <Text style={{...FONTS.font,color:colors.title,flexGrow:150,paddingHorizontal:10}}>#</Text>
                                <Text style={{...FONTS.font,color:colors.title,flexGrow:220,paddingHorizontal:10}}>Reward</Text>
                            </View>
                            {tableData.map((data,index) => {
                                return(
                                    <View key={index}
                                        style={{
                                            flexDirection:'row',
                                            paddingVertical:8,
                                        }}
                                    >
                                        <Text style={{...FONTS.font,color:colors.text,flexGrow:100,paddingHorizontal:10}}>{data.num}</Text>
                                        <Text style={{...FONTS.font,color:colors.text,flexGrow:150,paddingHorizontal:10}}>{data.split}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        

                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    socialIcon:{
        height:35,
        width:35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginHorizontal:4,
    }
})


export default Rewards;
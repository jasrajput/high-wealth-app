import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text ,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native'
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HeaderBar from '../layout/header';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/styleSheet';
// import * as Keychain from 'react-native-keychain';

const Profile = ({navigation}) => {

    const {colors} = useTheme();
    const [imgUrl , setImgUrl] = useState(null);
    // const [walletName , setWalletName] = useState('');

    // useEffect(() => {
    //     async function getWalletName() {
    //         const userWallet = await Keychain.getGenericPassword({ service: "walletName" });
    //         setWalletName(userWallet.password);
    //     }

    //     getWalletName();

    // }, [])
    

    const navLinks = [
        
        {
            icon : ICONS.setting,
            title : "Settings",
            navigate : "settings",
        },
        // {
        //     icon : ICONS.history,
        //     title : "History",
        //     navigate : "history",
        // },
        // {
        //     icon : ICONS.badge,
        //     title : "Rewards",
        //     navigate : "rewards",
        // },
        // {
        //     icon : ICONS.wallet,
        //     title : "Payment",
        //     navigate : "paymentMethod",
        // },
        {
            icon : ICONS.support,
            title : "Helpdesk",
            navigate : "helpdesk",
        },
        // {
        //     icon : ICONS.logout,
        //     title : "Logout",
        //     navigate : "signin",
        // },
    ]


    return (
        <View
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <HeaderBar
                leftIcon={'back'}
                title={"Profile"}
            />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom:100,
                }}
            >
                <View
                    style={{
                        padding:15,
                    }}
                >
                    <ImageBackground
                        source={IMAGES.bg1}
                        style={{
                            flexDirection:'row',
                            paddingHorizontal:30,
                            paddingVertical:13,
                            borderRadius:SIZES.radius_lg,
                            overflow:'hidden',
                            alignItems:'center',
                        }}
                    >
                        <View style={{marginRight:20,borderWidth:3,borderRadius:80,borderColor:'rgba(255,255,255,.1)'}}>
                            
                            <TouchableOpacity
                                activeOpacity={.9}
                                style={{
                                    height:28,
                                    width:28,
                                    position:'absolute',
                                    backgroundColor:COLORS.primary,
                                    borderRadius:28,
                                    bottom:-10,
                                    right:-10,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <FeatherIcon size={14} color={COLORS.white} name='credit-card'/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{...FONTS.h6,color:COLORS.white,marginBottom:7, marginTop: 7}}>Multi-chain wallet</Text>
                        </View>
                    </ImageBackground>
                    <View
                        style={{
                            paddingHorizontal:18,
                            paddingVertical:15,
                            borderRadius:SIZES.radius_lg,
                            backgroundColor:colors.card,
                            marginTop:15,
                            ...GlobalStyleSheet.shadow,
                        }}
                    >
                        {navLinks.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => navigation.navigate(data.navigate)}
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        paddingVertical:16,
                                    }}
                                >
                                    <Image
                                        style={[{
                                            height:20,
                                            width:20,
                                            tintColor:colors.text,
                                            marginRight:14,
                                        }]}
                                        source={data.icon}
                                    />
                                    <Text style={{...FONTS.font,flex:1,...FONTS.fontMedium,color:colors.title}}>{data.title}</Text>
                                    <FeatherIcon size={18} color={colors.text} name='chevron-right'/>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
  )
}

export default Profile
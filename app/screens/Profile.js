import React, { useState } from 'react'
import { 
    View, 
    Text ,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
} from 'react-native'
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HeaderBar from '../layout/header';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../constants/theme';
import { launchImageLibrary } from 'react-native-image-picker';
import { GlobalStyleSheet } from '../constants/styleSheet';

const Profile = ({navigation}) => {

    const {colors} = useTheme();
    const [imgUrl , setImgUrl] = useState(null);
    
    const handleProfileImage = async () => {

        if(Platform.OS === 'ios'){
            let options = {
                mediaType: 'photo',
                maxWidth: 200,
                maxHeight: 200,
                quality: 1,
            };
            launchImageLibrary(options, (response) => {
                if(!response.didCancel){
                    setImgUrl(response.assets[0].uri)
                }
            })
        }else{
            try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            ]).then((result) => {
                if (result['android.permission.CAMERA']
                && result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
                    let options = {
                        mediaType: 'photo',
                        maxWidth: 200,
                        maxHeight: 200,
                        quality: 1,
                    };
                    launchImageLibrary(options, (response) => {
                        if(!response.didCancel){
                            setImgUrl(response.assets[0].uri)
                        }
                    })
                }
            });
            } catch (err) {
                console.warn(err);
            }
        }
    
    }

    const navLinks = [
        {
            icon : ICONS.verified,
            title : "Verification",
            navigate : "verification",
        },
        {
            icon : ICONS.doubts,
            title : "Know Your Crypto",
            navigate : "knowyourcrypto",
        },
        {
            icon : ICONS.setting,
            title : "Settings",
            navigate : "settings",
        },
        {
            icon : ICONS.history,
            title : "History",
            navigate : "history",
        },
        {
            icon : ICONS.badge,
            title : "Rewards",
            navigate : "rewards",
        },
        {
            icon : ICONS.wallet,
            title : "Payment",
            navigate : "paymentMethod",
        },
        {
            icon : ICONS.support,
            title : "Helpdesk",
            navigate : "helpdesk",
        },
        {
            icon : ICONS.logout,
            title : "Logout",
            navigate : "signin",
        },
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
                            paddingHorizontal:18,
                            paddingVertical:18,
                            borderRadius:SIZES.radius_lg,
                            overflow:'hidden',
                            alignItems:'center',
                        }}
                    >
                        <View style={{marginRight:18,borderWidth:3,borderRadius:80,borderColor:'rgba(255,255,255,.1)'}}>
                            <Image
                                source={imgUrl ? {uri : imgUrl} : IMAGES.pic1}
                                style={{
                                    height:80,
                                    width:80,
                                    borderRadius:80,
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => handleProfileImage()}
                                activeOpacity={.9}
                                style={{
                                    height:28,
                                    width:28,
                                    position:'absolute',
                                    backgroundColor:COLORS.primary,
                                    borderRadius:28,
                                    bottom:0,
                                    right:0,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <FeatherIcon size={14} color={COLORS.white} name='edit'/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{...FONTS.h6,color:COLORS.white,marginBottom:7}}>Richard Smith</Text>
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginBottom:3,
                                }}
                            >
                                <FeatherIcon style={{marginRight:6}} color={colors.text} size={14} name='mail' />
                                <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.6}}>example@gmail.com</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <FeatherIcon style={{marginRight:6}} color={colors.text} size={14} name='phone' />
                                <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.6}}>+158 4844 4400</Text>
                            </View>
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
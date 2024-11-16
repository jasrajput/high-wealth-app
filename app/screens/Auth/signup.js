import React, {useState} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, SIZES, COLORS, ICONS, IMAGES } from '../../constants/theme';
import CustomButton from '../../components/customButton';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import LinearGradient from 'react-native-linear-gradient';

const SignIn = ({navigation}) => {

    const theme = useTheme();
    const {colors} = useTheme();
    const [handlePassword,setHandlePassword] = useState(true);
    const [handlePassword2,setHandlePassword2] = useState(true);
    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [isFocused3 , setisFocused3] = useState(false);


    return(
        <View style={{backgroundColor:COLORS.secondary,flex:1}}>
            <View style={{
                height:140,
                backgroundColor:COLORS.secondary,
                position:'absolute',
                width:'100%',
                alignItems:'center',
                justifyContent:'center',
            }}>

                <Image
                    source={IMAGES.logoFullWhite}
                    style={{
                        width:180,
                        resizeMode:'contain',
                        marginBottom:20,
                    }}
                />
            </View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1}}
            >
                <Animatable.View
                    animation="fadeInUpBig" 
                    duration={1000}
                    style={{paddingTop:140,flex:1}}> 
                    {!theme.dark &&
                        <View
                            style={{
                                height:30,
                                backgroundColor:'rgba(255,255,255,.2)',
                                left:20,
                                right:20,
                                position:'absolute',
                                top:114,
                                borderRadius:40,
                            }}
                        />
                    }
                    <View 
                        style={{
                            ...styles.container,
                            backgroundColor:colors.background,
                            position:'relative',
                        }}>
                        {theme.dark &&
                            <LinearGradient
                                colors={["rgba(22,23,36,.7)","rgba(22,23,36,0)"]}
                                style={{
                                position:'absolute',
                                height:'100%',
                                width:'100%',
                                }}
                            >
                            </LinearGradient>
                        }
                        <View style={{
                            paddingHorizontal:SIZES.padding,
                            paddingTop:20,
                            flex:1,
                        }}>
                            <View style={{alignItems:'center',paddingTop:15,marginBottom:30}}>
                                <Animatable.Text
                                    animation="fadeInUp" 
                                    duration={1000}
                                    delay={700}
                                    style={{...FONTS.h3,color:colors.title}}>Create Account</Animatable.Text>
                                <Animatable.Text
                                    animation="fadeInUp" 
                                    duration={1000}
                                    delay={700}
                                    style={{...FONTS.font,color:colors.text}}>Enter your details below</Animatable.Text>
                            </View>
                            
                            <Animatable.View 
                                animation="fadeInUp" 
                                duration={1000}
                                delay={1000}
                                style={[styles.inputGroup]}>
                                <Text style={{...FONTS.fontSm,color:colors.title,marginBottom:6}}>Email</Text>
                                <View
                                    style={{
                                        ...GlobalStyleSheet.shadow,
                                        backgroundColor:colors.card,
                                        borderRadius:SIZES.radius,
                                    }}
                                >
                                    <View style={styles.inputIco}>
                                        <FeatherIcon name='mail' color={COLORS.primary} size={18}/>
                                    </View>
                                    <TextInput 
                                        onFocus={() => setisFocused(true)}
                                        onBlur={() => setisFocused(false)}
                                        style={[
                                            styles.input,
                                            {color:colors.title,
                                            backgroundColor:colors.card},
                                            isFocused ? styles.inputActive : ""
                                        ]}
                                        placeholderTextColor={colors.text}
                                        placeholder='Enter your email'
                                    />
                                </View>
                            </Animatable.View>
                            <Animatable.View
                                animation="fadeInUp" 
                                duration={1000}
                                delay={1200}
                                style={styles.inputGroup}>
                                <Text style={{...FONTS.fontSm,color:colors.title,marginBottom:6}}>Password</Text>
                                <View
                                    style={{
                                        ...GlobalStyleSheet.shadow,
                                        backgroundColor:colors.card,
                                        borderRadius:SIZES.radius,
                                    }}
                                >
                                    <View style={styles.inputIco}>
                                        <FeatherIcon name='lock' color={COLORS.primary} size={18}/>
                                    </View>
                                    <TextInput 
                                        onFocus={() => setisFocused2(true)}
                                        onBlur={() => setisFocused2(false)}
                                        style={[
                                            styles.input,
                                            {color:colors.title,
                                            backgroundColor:colors.card},
                                            isFocused2 ? styles.inputActive : ""
                                        ]}
                                        placeholderTextColor={colors.text}
                                        placeholder='Create password'
                                        secureTextEntry={handlePassword}
                                    />
                                    { (handlePassword) ?
                                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword(false)}>
                                            <FeatherIcon name='eye' color={COLORS.primary} size={18}/>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword(true)}>
                                            <FeatherIcon name='eye-off' color={COLORS.primary} size={18}/>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </Animatable.View>    
                            <Animatable.View
                                animation="fadeInUp" 
                                duration={1000}
                                delay={1400}
                                style={styles.inputGroup}>
                                <Text style={{...FONTS.fontSm,color:colors.title,marginBottom:6}}>Confirm password</Text>
                                <View
                                    style={{
                                        ...GlobalStyleSheet.shadow,
                                        backgroundColor:colors.card,
                                        borderRadius:SIZES.radius,
                                    }}
                                >
                                    <View style={styles.inputIco}>
                                        <FeatherIcon name='lock' color={COLORS.primary} size={18}/>
                                    </View>
                                    <TextInput 
                                        onFocus={() => setisFocused3(true)}
                                        onBlur={() => setisFocused3(false)}
                                        style={[
                                            styles.input,
                                            {color:colors.title,
                                            backgroundColor:colors.card},
                                            isFocused3 ? styles.inputActive : ""
                                        ]}
                                        placeholderTextColor={colors.text}
                                        placeholder='Confirm password'
                                        secureTextEntry={handlePassword2}
                                    />
                                    { (handlePassword2) ?
                                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword2(false)}>
                                            <FeatherIcon name='eye' color={COLORS.primary} size={18}/>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword2(true)}>
                                            <FeatherIcon name='eye-off' color={COLORS.primary} size={18}/>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </Animatable.View>    
                            
                            <Animatable.View
                                animation="fadeInUp" 
                                duration={1000}
                                delay={1500}
                            >
                                <CustomButton 
                                    onPress={() => {navigation.navigate('signin')}}
                                    title="Create"
                                />
                            </Animatable.View>
                            <View style={{flexDirection:'row',justifyContent:'center',marginVertical:15}}>
                                <Text style={{
                                    ...FONTS.font,
                                    marginRight:5,
                                    color:colors.text,
                                }}>Don't have an account?</Text>
                                <TouchableOpacity onPress={()=> navigation.navigate('signin')}>
                                    <Text style={{...FONTS.font,color:COLORS.primary}}>Sign in</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:'center',
                                }}
                            >
                                <View style={{
                                    alignItems:'center',
                                    justifyContent:'center',
                                    position:'relative',
                                    marginVertical:10,
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}>
                                    <LinearGradient
                                        colors={theme.dark ? ["rgba(255,255,255,0)","rgba(255,255,255,.1)"] : ["rgba(0,0,0,0)","rgba(0,0,0,.1)"]}
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        style={{
                                            flex:1,
                                            height:1,
                                        }}
                                    >
                                    </LinearGradient>
                                    <Text style={{
                                        ...FONTS.fontSm,
                                        paddingHorizontal:12,
                                        color:colors.text
                                    }}>Or sign in with</Text>
                                    <LinearGradient
                                        colors={theme.dark ? ["rgba(255,255,255,.1)","rgba(255,255,255,0)"] : ["rgba(0,0,0,.1)","rgba(0,0,0,0)"]}
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        style={{
                                            flex:1,
                                            height:1,
                                        }}
                                    >
                                    </LinearGradient>
                                </View>
                            </View>
                            <View
                                style={[GlobalStyleSheet.row,{marginBottom:20,marginTop:15}]}
                            >   
                                <View style={GlobalStyleSheet.col50}>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            borderWidth:1,
                                            justifyContent:'center',
                                            paddingHorizontal:15,
                                            paddingVertical:12,
                                            borderRadius:SIZES.radius,
                                            borderColor:colors.borderColor,
                                            backgroundColor:colors.card,
                                            ...GlobalStyleSheet.shadow,
                                        }}
                                    >
                                        <Image 
                                            source={ICONS.google}
                                            style={{
                                                height:18,
                                                width:18,
                                                marginRight:12,
                                            }}    
                                        />
                                        <Text style={{...FONTS.font,color:colors.title,...FONTS.fontMedium}}>Google</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={GlobalStyleSheet.col50}>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            borderWidth:1,
                                            justifyContent:'center',
                                            paddingHorizontal:15,
                                            paddingVertical:12,
                                            borderRadius:SIZES.radius,
                                            borderColor:colors.borderColor,
                                            backgroundColor:colors.card,
                                            ...GlobalStyleSheet.shadow,
                                        }}
                                    >
                                        <Image 
                                            source={ICONS.facebook}
                                            style={{
                                                height:18,
                                                width:18,
                                                marginRight:12,
                                            }}    
                                        />
                                        <Text style={{...FONTS.font,color:colors.title,...FONTS.fontMedium}}>Facebook</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
               
               </Animatable.View> 
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderTopLeftRadius:SIZES.radius_lg,
        borderTopRightRadius:SIZES.radius_lg,
        overflow:'hidden',
        marginTop:-16,
    },
    inputGroup:{
        position:'relative',
        marginBottom:15,
    },
    input:{
        height:48,
        borderWidth:1,
        borderColor:'transparent',
        fontSize:SIZES.font,
        borderRadius:SIZES.radius,
        paddingLeft:50,
    },
    inputActive:{
        borderColor:COLORS.primary,
    },
    inputGroupActive:{
        shadowColor: COLORS.primary,
        shadowOffset:{
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    inputIco:{
        position:'absolute',
        left:17,
        top:15,
        tintColor:COLORS.primary,
        height:18,
        width:18,
        resizeMode:'contain',
        zIndex:1,
    },
    seprator:{
        height:1,
        width:'100%',
        position:'absolute',
    },
    eyeIcon:{
        position:'absolute',
        right:0,
        top:0,
        height:48,
        width:48,
        alignItems:'center',
        justifyContent:'center',
    },
    eyeImg:{
        height:20,
        width:20,
    }
})

export default SignIn;
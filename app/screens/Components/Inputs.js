import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/header';
import CustomInput from '../../components/Input/CustomInput';

const Inputs = () => {

    const {colors} = useTheme();
    const [passwordShow , setPasswordShow ] = useState(true);
    
    const handndleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
                <Header 
                    titleLeft
                    title={'Inputs'}  
                    leftIcon={'back'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Input with icon</Text>
                            </View>

                            <View style={{marginBottom:15}}>
                                <View style={styles.inputIcon}>
                                    <FeatherIcon name={'user'} size={20} color={COLORS.primary}/>
                                </View>
                                <TextInput
                                    style={[styles.inputStyle,{borderColor:colors.borderColor,color:colors.title}]}
                                    placeholder='Username'
                                    placeholderTextColor={colors.text}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <View style={styles.inputIcon}>
                                    <FeatherIcon name={'mail'} size={20} color={COLORS.primary}/>
                                </View>
                                <TextInput
                                    style={[styles.inputStyle,{borderColor:colors.borderColor,color:colors.title}]}
                                    placeholder='Email'
                                    placeholderTextColor={colors.text}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <View style={styles.inputIcon}>
                                    <FeatherIcon name={'lock'} size={20} color={COLORS.primary}/>
                                </View>
                                <TextInput
                                    secureTextEntry={passwordShow}
                                    style={[styles.inputStyle,{borderColor:colors.borderColor,color:colors.title}]}
                                    placeholder='Password'
                                    placeholderTextColor={colors.text}
                                />
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Password"
                                    accessibilityHint="Password show and hidden"
                                    onPress={() => handndleShowPassword()}
                                    style={styles.eyeIcon}>
                                    <FeatherIcon color={colors.text} size={18} name={passwordShow ? 'eye-off' : 'eye'}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Modern Fields</Text>
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                    value={''}  
                                    placeholder="Enter Email"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    type={'password'}
                                    icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Password"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Input with different sizes</Text>
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputLg
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputSm
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                        </View>   
                        
                        
                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Modern Fields With Radius</Text>
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputRounded
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputRounded
                                    icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                    value={''}  
                                    placeholder="Enter Email"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputRounded
                                    type={'password'}
                                    icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Password"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Minimalist Fields</Text>
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputBorder
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputBorder
                                    icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                    value={''}  
                                    placeholder="Enter Email"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputBorder
                                    type={'password'}
                                    icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Password"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Range Slider</Text>
                            </View>
                            <View style={{marginBottom:15}}>

                                <MultiSlider
                                    enableLabel
                                    customLabel={() => 
                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between',
                                            position:'absolute',
                                            bottom:-4,
                                            width:'100%',
                                        }}>
                                            <Text style={{...FONTS.fontSm,color:colors.text}}>0%</Text>
                                            <Text style={{...FONTS.fontSm,color:colors.text}}>25%</Text>
                                            <Text style={{...FONTS.fontSm,color:colors.text}}>50%</Text>
                                            <Text style={{...FONTS.fontSm,color:colors.text}}>75%</Text>
                                            <Text style={{...FONTS.fontSm,color:colors.text}}>100%</Text>
                                        </View>
                                    }
                                    trackStyle={{height:4,borderRadius:2,backgroundColor:'rgba(142,165,200,.3)'}}
                                    selectedStyle={{
                                        backgroundColor:COLORS.primary,
                                    }}
                                    markerStyle={{
                                        backgroundColor:COLORS.white,
                                        top:1,
                                        height:16,
                                        width:16,
                                        borderWidth:3,
                                        borderColor:COLORS.primary,
                                    }}
                                    sliderLength={SIZES.width - 60}
                                    max={100}
                                />

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    card : {
        padding:15,
        borderRadius:SIZES.radius,
        marginBottom:15,
        borderWidth:1,
        borderColor:COLORS.borderColor,
        backgroundColor:COLORS.white,
    },
    inputStyle:{
        ...FONTS.font,
        height:50,
        paddingLeft:60,
        borderWidth : 1,
        borderRadius: SIZES.radius,
    },
    inputIcon:{
        backgroundColor:COLORS.primaryLight,
        height:40,
        width:40,
        borderRadius:10,
        position : 'absolute',
        left:5,
        top : 5,
        alignItems:'center',
        justifyContent:'center',
    },
    eyeIcon:{
        position:'absolute',
        height:50,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        right:0,
        zIndex:1,
        top:0,
    }
})


export default Inputs;
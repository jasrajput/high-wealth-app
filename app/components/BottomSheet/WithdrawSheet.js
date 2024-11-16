import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { SvgXml } from 'react-native-svg';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../../Utils/theme';
import CustomButton from '../CustomButton';

const CoinItem = [
    {
        icon : IMAGES.bitcoin,
        coin : 'Bitcoin',
        sortName : 'BTC',
    },
    {
        icon : IMAGES.etherium,
        coin : 'Etherium',
        sortName : 'ETH',
    },
    {
        icon : IMAGES.litherium,
        coin : 'litherium',
        sortName : 'LTC',
    },
    
];

const WithdrawSheet = (props) => {

    const [modalVisible , setModalVisible] = useState(false);
    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [ItemValue , setItemValue] = useState('Select Coin');
    const {colors} = useTheme();
    const shadowOpt = {
        width:SIZES.width - 30,
        height:48,
        color:colors.shadow,
        border:5,
        radius:10,
        opacity:0.6,
        x:0,
        y:3,
        style:{marginBottom:15}
    }

    return (
        <>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View
                style={[styles.modalContainer,{backgroundColor:colors.background}]}
            >
                <View
                    style={{
                        height:55,
                        backgroundColor:COLORS.primary,
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:20,
                    }}
                >
                    <TouchableOpacity style={{marginRight:10}}>
                      <Image
                        style={{
                          height:20,
                          width:20,
                        }}
                        source={IMAGES.search}
                      />
                    </TouchableOpacity>
                    <TextInput
                        style={{
                            ...FONTS.fontLg,
                            color:COLORS.white,
                            flex:1,
                            top:1,
                        }}
                        placeholder="Search Here"
                        placeholderTextColor={'rgba(255,255,255,.8)'}
                    />
                    <TouchableOpacity
                        onPress={()=> setModalVisible(false)}
                        style={{height:50,width:50,marginRight:-10,alignItems:'center',justifyContent:'center'}}
                    >   
                        <SvgXml
                            stroke={COLORS.white}
                            xml={ICONS.close}
                        />
                    </TouchableOpacity>
                </View>
                    
                    <ScrollView contentContainerStyle={{paddingTop:10}}>
                        {CoinItem.map((data,index) => (
                            <TouchableOpacity 
                                onPress={()=> {setItemValue(data.coin);setModalVisible(false)}}
                                key={index}
                                style={[{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginHorizontal:15,
                                    paddingVertical:10,
                                    borderBottomWidth:1,
                                    borderColor:colors.borderColor,
                                },ItemValue === data.coin && {
                                    borderWidth:1,
                                    borderColor:COLORS.primary,
                                    backgroundColor:colors.bgLight,
                                    marginHorizontal:5,
                                    paddingHorizontal:10,
                                    borderRadius:SIZES.radiusLg,
                                }]}
                            >
                                <Image
                                    style={{
                                        height:35,
                                        width:35,
                                        marginRight:10,
                                    }}
                                    source={data.icon}
                                />
                                <Text style={{...FONTS.h6,color:colors.title,flex:1}}>{data.coin}</Text>
                                <Text style={{...FONTS.fontSm,color:colors.title}}>{data.sortName}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>



            <View style={{...GlobalStyleSheet.container,paddingTop:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15}}>
                    <Text style={{...FONTS.h5,color:colors.title}}>Withdraw Crypto</Text>
                </View>
                
                <View style={{marginBottom:15}}>
                    <TouchableOpacity
                        onPress={()=> setModalVisible(true)}
                        style={{
                            ...styles.selectBtn,
                            backgroundColor:colors.inputBg,
                            borderColor:colors.borderColor,
                        }}
                    >
                        <Text style={[{...FONTS.fontLg,color:colors.title}]}>{ItemValue}</Text>
                        <SvgXml
                            height={18}
                            width={18}
                            fill={colors.title}
                            xml={ICONS.down}
                        />
                    </TouchableOpacity>
                </View>
                
                <View style={{marginBottom:15}}>
                    <TextInput
                        style={[{
                            ...GlobalStyleSheet.formControl,
                            ...FONTS.fontMedium,
                            backgroundColor:colors.inputBg,
                            color:colors.title,
                            borderColor:colors.borderColor,
                            paddingRight:95,
                        },isFocused && styles.inputActive]}
                        onFocus={() => setisFocused(true)}
                        onBlur={() => setisFocused(false)}
                        defaultValue="078745457874374753285776418"
                        placeholderTextColor={colors.text}
                        placeholder="Amount"
                    />
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            position:'absolute',
                            right:5,
                            top:1,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height:43,
                                width:43,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <SvgXml
                                fill={COLORS.primary}
                                xml={ICONS.copy2}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                height:43,
                                width:43,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <SvgXml
                                fill={COLORS.primary}
                                xml={ICONS.qr}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{flexDirection:'row',alignItems:'center',marginBottom:6}}>
                    <View style={{flexDirection:'row',flex:1}}>
                        <Text style={{...FONTS.font,color:colors.title}}>Available: </Text>
                        <Text style={{...FONTS.font,color:COLORS.primary}}>3,776.02997291 BTC</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{...FONTS.fontXs,color:colors.title}}>BTC</Text>
                        <View
                            style={{
                                height:20,
                                backgroundColor:COLORS.primary,
                                justifyContent:'center',
                                paddingHorizontal:8,
                                borderRadius:4,
                                marginLeft:6,
                            }}
                        >
                            <Text style={{...FONTS.fontXs,color:COLORS.white}}>Max</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginBottom:15}}>
                    <TextInput
                        style={[{
                            ...GlobalStyleSheet.formControl,
                            backgroundColor:colors.inputBg,
                            color:colors.title,
                            borderColor:colors.borderColor,
                        },isFocused2 && styles.inputActive]}
                        onFocus={() => setisFocused2(true)}
                        onBlur={() => setisFocused2(false)}
                        placeholderTextColor={colors.text}
                        placeholder="Amount"
                    />
                </View>
                
                <View style={{alignItems:'center',paddingHorizontal:15,paddingTop:15,paddingBottom:30}}>
                    <Text style={{...FONTS.h2,color:colors.title}}>0.00 BTC</Text>
                    <Text style={{...FONTS.font,color:COLORS.primary}}>Receive amount</Text>
                </View>
                
                <CustomButton title="Withdraw"/>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    selectBtn:{
        borderRadius:SIZES.radius,
        height: 48,
        borderWidth:1,
        borderColor:'transparent',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:12
    },
    modalContainer:{
        flex:1,
    },
    inputActive:{
        borderColor:COLORS.primary,
    },
})


export default WithdrawSheet;
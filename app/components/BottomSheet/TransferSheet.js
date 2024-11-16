import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { 
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
  } from "react-native";
import { IMAGES, SIZES, COLORS, ICONS, FONTS } from '../../Utils/theme';
import { SvgXml } from 'react-native-svg';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import LinearGradient from 'react-native-linear-gradient';
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

const TransferSheet = (props) => {

    const [modalVisible , setModalVisible] = useState(false);
    const [isFocused , setisFocused] = useState(false);
    const [ItemValue , setItemValue] = useState(CoinItem[0].coin);
    
    const {colors} = useTheme();

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
                <Text style={{...FONTS.h5,color:colors.title,marginBottom:15}}>Wallet Transfer</Text>

                <View style={{marginBottom:15}}>
                <View
                    style={{
                    height:70,
                    borderRadius:SIZES.radius,
                    borderWidth:1,
                    borderColor:colors.borderColor,
                    backgroundColor:colors.background,
                    paddingHorizontal:15,
                    paddingVertical:9,
                    }}
                >
                    <Text style={{...FONTS.font,color:COLORS.primary,...FONTS.fontSemiBold,marginBottom:3}}>From</Text>
                    <TextInput
                    style={{
                        ...FONTS.h6,color:colors.title,
                        padding:0,
                    }}
                    value="Spot Wallet"
                    />
                </View>
                </View>

                <View
                style={{
                    alignItems:'center',
                    justifyContent:'center',
                    marginBottom:20,
                    marginTop:5,
                }}
                >
                <LinearGradient
                    start={{x: 0, y: 1}} end={{x: 1, y: 0.5}}
                    colors={['rgba(255,255,255,0)', COLORS.primary , 'rgba(255,255,255,0)']}
                    style={{
                        height:2,
                        width:'70%',
                        position:'absolute',
                    }}
                >

                    </LinearGradient>
                    <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        height:43,
                        width:43,
                        borderRadius:43,
                        backgroundColor:COLORS.primary,
                        alignItems:'center',
                        justifyContent:'center',
                        transform:[{rotate:'90deg'}]
                    }}
                >
                    <Image
                        style={{
                        height:28,
                        width:28,
                        transform:[{rotate:'90deg'}],
                        }}
                        source={IMAGES.change}
                    />
                </TouchableOpacity>
            </View>

                <View style={{marginBottom:15}}>
                <View
                    style={{
                    height:70,
                    borderRadius:SIZES.radius,
                    borderWidth:1,
                    borderColor:colors.borderColor,
                    backgroundColor:colors.background,
                    paddingHorizontal:15,
                    paddingVertical:9,
                    }}
                >
                    <Text style={{...FONTS.font,color:COLORS.primary,...FONTS.fontSemiBold,marginBottom:3}}>To</Text>
                    <TextInput
                    style={{
                        ...FONTS.h6,color:colors.title,
                        padding:0,
                    }}
                    value="Futures Wallet"
                    />
                </View>
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
                        <Text style={[{...FONTS.fontLg,color:colors.title},props.size === "small" && {...FONTS.fontSm}]}>{ItemValue}</Text>
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
                            backgroundColor:colors.inputBg,
                            color:colors.title,
                            borderColor:colors.borderColor,
                        },isFocused && styles.inputActive]}
                        onFocus={() => setisFocused(true)}
                        onBlur={() => setisFocused(false)}
                        placeholderTextColor={colors.text}
                        placeholder="Amount"
                    />
                    <Text 
                        style={{
                            ...FONTS.fontLg,
                            color:colors.title,
                            position:'absolute',
                            right:12,
                            top:13,
                        }}
                    >Max</Text>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginBottom:20,
                    }}
                >
                    <Text style={{...FONTS.font,color:colors.title}}>Available:</Text>
                    <Text style={{...FONTS.font,color:COLORS.primary}}>0.000123</Text>
                </View>
                
                <CustomButton title="Confirm Transfer"/>

            </View>
        </>
    );
};


const styles = StyleSheet.create({
    btn:{
        height:35,
        borderRadius:4,
        borderWidth:1,
        borderColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
    },
    inputActive:{
        borderColor:COLORS.primary,
    },
    modalContainer:{
        flex:1,
    },
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
  
    inputBox:{
        borderRadius:SIZES.radius,
        width: SIZES.width - 110,
        height:45,
        borderWidth:2,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    inputBoxInner:{
        position:'absolute',
        zIndex:-1,
    },
})


export default TransferSheet;
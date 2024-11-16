import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import CustomSelectBox from '../CustomSelectBox';
import { COLORS, FONTS, SIZES } from '../../Utils/theme';
import { BoxShadow } from 'react-native-shadow';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const FutureTrade = (props) => {

    const [itemValue , setItemValue] = useState('');
    const [activeTab , setActiveTab] = useState('Short');
    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [isFocused3 , setisFocused3] = useState(false);
    const { colors } = useTheme();
    const shadowInput = {
        width:SIZES.width - 30,
        height:48,
        color:colors.shadow,
        border:6,
        radius:10,
        opacity:0.6,
        x:0,
        y:2,
        style:{marginBottom:18}
    }

    const shadowInput2 = {
        width:(SIZES.width / 2) - 25,
        height:48,
        color:colors.shadow,
        border:6,
        radius:10,
        opacity:0.6,
        x:0,
        y:2,
        style:{marginBottom:18}
    }

    return (
        <View style={{...GlobalStyleSheet.container}}>
            <View style={{marginBottom:18}}>
                <CustomSelectBox
                    selectItems={['Profit & Loss' , 'Response']}
                    defaultValue={'Profit & Loss'}
                    value={itemValue}
                    setValue={setItemValue}
                />
            </View>
            <View style={{flexDirection:'row',marginHorizontal:-5,marginBottom:20}}>
                <View style={{flex:1,paddingHorizontal:5}}>
                    <TouchableOpacity
                        onPress={()=> setActiveTab('Long')}
                        style={[styles.tabBtn,{backgroundColor:'rgba(111,79,239,.2)'},activeTab === "Long" && {backgroundColor:COLORS.primary}]}
                    >
                        <Text style={[{...FONTS.fontLg,...FONTS.fontMedium,color:COLORS.primary},activeTab === "Long" && {color:COLORS.white}]}>LONG</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,paddingHorizontal:5}}>
                    <TouchableOpacity
                        onPress={()=> setActiveTab('Short')}
                        style={[styles.tabBtn,{backgroundColor:'rgba(235,87,87,.1)'},activeTab === "Short" && {backgroundColor:COLORS.danger}]}
                        >
                        <Text style={[{...FONTS.fontLg,...FONTS.fontMedium,color:COLORS.danger},activeTab === "Short" && {color:COLORS.white}]}>SHORT</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginBottom:18}}>
                <TextInput
                    style={[{
                        ...GlobalStyleSheet.formControl,
                        backgroundColor:colors.background,
                        color:colors.title,
                        borderColor:colors.borderColor,
                    },isFocused && styles.inputActive]}
                    placeholder="Quantity"
                    placeholderTextColor={colors.text}
                    onFocus={() => setisFocused(true)}
                    onBlur={() => setisFocused(false)}
                />  
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{marginBottom:18,flex:1,marginRight:10}}>
                    <TextInput
                        style={[{
                            ...GlobalStyleSheet.formControl,
                            backgroundColor:colors.background,
                            color:colors.title,
                            borderColor:colors.borderColor,
                        },isFocused2 && styles.inputActive]}
                        placeholder="Entry Price"
                        placeholderTextColor={colors.text}
                        onFocus={() => setisFocused2(true)}
                        onBlur={() => setisFocused2(false)}
                    />  
                </View>
                <View style={{marginBottom:18,flex:1,marginLeft:10}}>
                    <TextInput
                        style={[{
                            ...GlobalStyleSheet.formControl,
                            backgroundColor:colors.background,
                            color:colors.title,
                            borderColor:colors.borderColor,
                        },isFocused3 && styles.inputActive]}
                        placeholder="Exit Price"
                        placeholderTextColor={colors.text}
                        onFocus={() => setisFocused3(true)}
                        onBlur={() => setisFocused3(false)}
                    />  
                </View>
            </View>

            <View style={{marginBottom:20,marginTop:-10}}>
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
                        backgroundColor:COLORS.primary,
                        top:1,
                        height:16,
                        width:16,
                        borderWidth:3,
                        borderColor:COLORS.primary,
                    }}
                    sliderLength={SIZES.width - 30}
                    max={100}
                />
            </View>

            <View style={{
                borderTopWidth:1,
                borderColor:colors.borderColor,
                paddingTop:10,
            }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:2}}>
                    <Text style={{...FONTS.fontSm,color:colors.text}}>Initial margin</Text>
                    <Text style={{...FONTS.fontSm,color:colors.title}}>0 USDT</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:2}}>
                    <Text style={{...FONTS.fontSm,color:colors.text}}>PNL</Text>
                    <Text style={{...FONTS.fontSm,color:colors.title}}>0 USDT</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{...FONTS.fontSm,color:colors.text}}>Profit/Loss %</Text>
                    <Text style={{...FONTS.fontSm,color:colors.title}}>0 %</Text>
                </View>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    tabBtn:{
        height:48,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
        paddingVertical:8,
    },
    inputActive:{
        borderColor:COLORS.primary,
    },
})


export default FutureTrade;
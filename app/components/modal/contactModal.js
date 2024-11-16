import React,{useRef} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../customButton';
import RBSheet from "react-native-raw-bottom-sheet";
import SelectDropdown from 'react-native-select-dropdown';
import SecurityOTP from './securityOtp';


const ContactModal = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const refRBSheet = useRef();

    const countriesWithFlags = [
        {title: '+971', image: require('../../assets/images/flags/UnitedArabEmirates.png')},
        {title: '+61', image: require('../../assets/images/flags/Australia.png')},
        {title: '+91', image: require('../../assets/images/flags/india.png')},
        {title: '+1', image: require('../../assets/images/flags/UnitedStates.png')},
    ];

    return(
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={270}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        //backgroundColor: appTheme.modalBackLayer,
                    },
                    container:{
                        backgroundColor: colors.background,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                    draggableIcon: {
                        width:90,
                        backgroundColor: colors.borderColor,
                    }
                }}
            >
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
                <SecurityOTP/>

            </RBSheet>


            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:10}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Contact Us</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <View style={{marginBottom:20}}>
                    <Text style={{...FONTS.font,color:COLORS.primary,marginBottom:8}}>Enter Phone Number</Text>
                    <View
                        style={{
                            backgroundColor:colors.card,
                            borderRadius:SIZES.radius,
                            ...GlobalStyleSheet.shadow,
                        }}
                    >
                    <View style={{
                        paddingLeft:85
                    }}>
                        <View
                            style={{
                                position:'absolute',
                                flexDirection:'row',
                                alignItems:'center',
                                left:12,
                                top:12,
                                borderRightWidth:1,
                                borderColor:colors.borderColor,
                            }}
                        >
                            <SelectDropdown
                                data={countriesWithFlags}
                                defaultValue={countriesWithFlags[0]}
                                onSelect={(selectedItem, index) => {}}
                                buttonStyle={{
                                    padding:0,
                                    backgroundColor:'transparent',
                                    width:82,
                                    paddingRight:0,
                                    height:24,
                                }}
                                renderCustomizedButtonChild={(selectedItem, index) => {
                                    return (
                                      <View style={{flexDirection:'row'}}>
                                        {selectedItem ? 
                                        <View
                                            style={{
                                                borderWidth:1,
                                                borderColor:COLORS.white,
                                                borderRadius:4,
                                                overflow:'hidden',
                                                marginRight:6,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width:30,
                                                    height:20,
                                                }}
                                                source={selectedItem.image}
                                            />
                                        </View>
                                        : undefined
                                        }
                                        <Text  style={{...FONTS.font,color:colors.title}}>{selectedItem ? selectedItem.title : 'Select country'}</Text>
                                      </View>
                                    );
                                }}
                                dropdownStyle={{
                                    backgroundColor:colors.card,
                                    width:100,
                                    borderRadius:4,
                                }}
                                rowStyle={{
                                   height:40,
                                   borderBottomColor:colors.borderColor,
                                }}
                                renderCustomizedRowChild={(item, index) => {
                                    return (
                                        <View style={{flexDirection:'row',paddingHorizontal:10}}>
                                            <View
                                                style={{
                                                    borderWidth:1,
                                                    borderColor:COLORS.white,
                                                    borderRadius:4,
                                                    overflow:'hidden',
                                                    marginRight:6,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width:30,
                                                        height:20,
                                                    }}
                                                    source={item.image}
                                                />
                                            </View>
                                            <Text style={{...FONTS.font,color:colors.title}}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                        <TextInput
                            style={{...GlobalStyleSheet.Input,color:colors.text}}
                            defaultValue='564466552'
                            placeholderTextColor={colors.text}
                        />  
                         </View>
                    </View>
                </View>
                <CustomButton 
                    onPress={() => {refRBSheet.current.open()}}
                    title='Continue'
                />

            </View>
            
        </>
    )
}


export default ContactModal;
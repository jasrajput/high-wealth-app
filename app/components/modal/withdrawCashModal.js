import React,{useRef} from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';
import SecurityVerification from './securityVerification';

const WithdrawCashModal = () => {

    const {colors} = useTheme();

    const refRBSheet = useRef();

    return(
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={260}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        //backgroundColor: appTheme.modalBackLayer,
                    },
                    container:{
                        backgroundColor:colors.background,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                    draggableIcon: {
                        width:90,
                        backgroundColor: colors.borderColor,
                    }
                }}
            >
                <SecurityVerification/>
            </RBSheet>

            <View
                style={{
                    paddingHorizontal:15,
                    paddingTop:15,
                }}
            >
                <Text style={{...FONTS.h5,color:colors.title}}>Withdraw Cash</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
               
                <View style={{marginBottom:10}}>
                    
                    <View style={{marginBottom:20,position:'relative'}}>
                        
                        <View style={{
                            borderRadius:SIZES.radius,
                            backgroundColor:colors.card,
                            paddingHorizontal:15,
                            paddingVertical:15,
                            ...GlobalStyleSheet.shadow,
                        }}>
                            <View style={GlobalStyleSheet.row}>
                                <View style={[GlobalStyleSheet.col50,{marginBottom:14}]}>
                                    <Text style={{...FONTS.fontXs,color:colors.title}}>Account Holder Name</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>John Doe</Text>
                                </View>
                                <View style={[GlobalStyleSheet.col50,{marginBottom:14}]}>
                                    <Text style={{...FONTS.fontXs,color:colors.title}}>Bank Name</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>ABC Center Bank</Text>
                                </View>
                                <View style={GlobalStyleSheet.col50}>
                                    <Text style={{...FONTS.fontXs,color:colors.title}}>IBAN</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>AED12345673748</Text>
                                </View>
                                <View style={GlobalStyleSheet.col50}>
                                    <Text style={{...FONTS.fontXs,color:colors.title}}>Swift Code</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>123456jhd6</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:8}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{...FONTS.font,color:colors.text,marginRight:5}}>Available:</Text>
                            <Text style={{...FONTS.font,color:COLORS.primary}}>3,776.02997291 BTC</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.formControl,
                            ...GlobalStyleSheet.shadow,
                        }}
                    >
                        <TextInput
                            style={{...GlobalStyleSheet.Input,color:colors.text}}
                            placeholder='Amount'
                            placeholderTextColor={colors.text}
                        /> 
                    </View>
                </View>
                <View style={{marginBottom:12}}>
                    <CustomButton 
                        color={'rgba(0,186,135,.15)'}
                        textColor={COLORS.primary}
                        title='Payment Options'
                    />
                </View>
                <CustomButton 
                    onPress={() => refRBSheet.current.open()}
                    title='Withdraw Cash'
                />
            </View>
        </>
    )
}

export default WithdrawCashModal;
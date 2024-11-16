import React from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';


const WithdrawCryptoOTP = () => {

    const {colors} = useTheme();

    return(
        <>
            <View
                style={{
                    paddingHorizontal:15,
                    marginTop:15,
                }}
            >
                <Text style={{...FONTS.h5,color:colors.title}}>Withdraw Crypto</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                
                <View
                    style={{
                        backgroundColor:colors.card,
                        ...GlobalStyleSheet.formControl,
                        ...GlobalStyleSheet.shadow,
                    }}
                >
                    <TextInput
                        style={{...GlobalStyleSheet.Input,color:colors.text}}
                        placeholder='Email Address OTP'
                        placeholderTextColor={colors.text}
                    />  
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
                        placeholder='Mobile Number OTP'
                        placeholderTextColor={colors.text}
                    />  
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
                        placeholder='Google Authenticator OTP'
                        placeholderTextColor={colors.text}
                    />  
                </View>
                
                <CustomButton title='Continue'/>

            </View>
            
        </>
    )
}

export default WithdrawCryptoOTP;
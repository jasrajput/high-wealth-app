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


const SecurityOTP = () => {

    const {colors} = useTheme();

    return(
        <>
            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:10}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Security Verification</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <View style={{marginBottom:10}}>
                    <Text style={{...FONTS.font,color:colors.text,textAlign:'right',marginBottom:8}}>Didn't get the code?</Text>
                    <View
                        style={{
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.formControl,
                            ...GlobalStyleSheet.shadow,
                        }}
                    >
                        <TextInput
                            style={{...GlobalStyleSheet.Input,color:colors.title}}
                            placeholder='Enter OTP'
                            placeholderTextColor={colors.text}
                        />  
                    </View>
                </View>
                <CustomButton title='Verify'/>

            </View>
            
        </>
    )
}


export default SecurityOTP;
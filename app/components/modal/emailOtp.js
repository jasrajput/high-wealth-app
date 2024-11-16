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


const EmailOTP = () => {

    const {colors} = useTheme();
    
    return(
        <>
            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:5}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Enter OTP</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <View style={{marginBottom:10}}>
                    <View
                        style={{
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.formControl,
                            ...GlobalStyleSheet.shadow,
                        }}
                    >
                        <TextInput
                            style={{
                                ...GlobalStyleSheet.Input,
                                backgroundColor:colors.card,
                                color:colors.title}}
                            placeholder='Enter OTP'
                            placeholderTextColor={colors.text}
                        />  
                    </View>
                </View>
                <CustomButton title='Continue'/>

            </View>
            
        </>
    )
}

export default EmailOTP;
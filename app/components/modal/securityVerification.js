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


const SecurityVerification = () => {

    const {colors} = useTheme();

    return(
        <>
            <View style={{...GlobalStyleSheet.modalHeader}}>
                <Text style={{...FONTS.h5,color:colors.title}}>Security Verification</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <View style={{alignItems:'flex-end',marginBottom:8}}>
                    <Text style={{...FONTS.fontXs,color:colors.text}}>Didn't get the code?</Text>
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
                        placeholder='Enter OTP'
                        placeholderTextColor={colors.text}
                    />  
                </View>

                <CustomButton title='Verify'/>
            </View>
            
        </>
    )
}

export default SecurityVerification;
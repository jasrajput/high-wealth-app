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

const AddNewAccount = () => {

    const {colors} = useTheme();

    return(
        <>

            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:5}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Add New Account</Text>
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
                        style={{...GlobalStyleSheet.Input,color:colors.title}}
                        placeholder="Account Holder Name"
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
                        style={{...GlobalStyleSheet.Input,color:colors.title}}
                        placeholder="Bank Name"
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
                        style={{...GlobalStyleSheet.Input,color:colors.title}}
                        placeholder="IBAN"
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
                        style={{...GlobalStyleSheet.Input,color:colors.title}}
                        placeholder="Country"
                        placeholderTextColor={colors.text}
                    />  
                </View>
                <View
                    style={{
                        backgroundColor:colors.card,
                        ...GlobalStyleSheet.formControl,
                        ...GlobalStyleSheet.shadow,
                        marginBottom:20,
                    }}
                >
                    <TextInput
                        style={{...GlobalStyleSheet.Input,color:colors.title}}
                        placeholder="SWIFT/BIC Code"
                        placeholderTextColor={colors.text}
                    />  
                </View>
                <CustomButton 
                    title='Save Account'
                />

            </View>
            
        </>
    )
}


export default AddNewAccount;
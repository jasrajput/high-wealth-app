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


const ChangePassword = () => {

    const {colors} = useTheme();

    return(
        <>
            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:10}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Change Password</Text>
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
                        style={{
                            ...GlobalStyleSheet.Input,
                            backgroundColor:colors.card,
                            color:colors.title
                        }}
                        placeholder='Current Password'
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
                        style={{
                            ...GlobalStyleSheet.Input,
                            backgroundColor:colors.card,
                            color:colors.title
                        }}
                        placeholder='New Password'
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
                        style={{
                            ...GlobalStyleSheet.Input,
                            backgroundColor:colors.card,
                            color:colors.title
                        }}
                        placeholder='Confirm Password'
                        placeholderTextColor={colors.text}
                    />  
                </View>
                
                <CustomButton title='Continue'/>

            </View>
            
        </>
    )
}

export default ChangePassword;
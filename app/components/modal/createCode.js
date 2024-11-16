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

const CreateCode = () => {

    const {colors} = useTheme();

    return(
        <>
           
            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:10}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Creat Code</Text>
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
                            style={{...GlobalStyleSheet.Input,color:colors.title}}
                            placeholder='Creat Code'
                            placeholderTextColor={colors.text}
                        />  
                    </View>
                </View>
                <CustomButton 
                    title='Save'
                />

            </View>
            
        </>
    )
}



export default CreateCode;
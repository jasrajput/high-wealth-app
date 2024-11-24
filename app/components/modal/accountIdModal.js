import React from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';


const AccountModal = ({accountId}) => {

    const {colors} = useTheme();

    return(
        <>
            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:10}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Account ID</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <View style={{marginBottom:10}}>
                    <Text style={{...FONTS.font,color:COLORS.primary,marginBottom:5}}>Account ID</Text>
                    <TextInput
                        editable={false}
                        style={[{
                            ...GlobalStyleSheet.Input,
                            color:colors.title,
                            paddingHorizontal:20,
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                            marginBottom:10,
                        }]}
                        placeholderTextColor={colors.text}
                        value={accountId}
                    />  
                </View>
                {/* <CustomButton title='Copy'/> */}

            </View>
            
        </>
    )
}


export default AccountModal;
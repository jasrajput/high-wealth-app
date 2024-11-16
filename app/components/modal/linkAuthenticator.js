import React,{useRef} from 'react';
import {
    View,
    Text,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';

const LinkAuthenticator = () => {

    const {colors} = useTheme();

    return(
        <>
            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:5}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Link your Authenticator</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <View style={{marginBottom:20,flex:1}}>
                    <Text style={{...FONTS.font,color:colors.text}}>Please download and install Google Authenticator. Than, tap "Link" to link your Crypto Money account.</Text>
                </View>
                <CustomButton 
                    title='Link'/>

            </View>
            
        </>
    )
}

export default LinkAuthenticator;
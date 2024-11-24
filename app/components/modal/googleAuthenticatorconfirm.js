import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';


const GoogleAuthenticatorConfirm = ({onClose}) => {

    const {colors} = useTheme();

    const removeBiometricAuth = async (onClose) => {
        try {
            // Remove biometric settings from AsyncStorage
            await AsyncStorage.removeItem('biometricEnabled');
            await AsyncStorage.removeItem('biometricType');
    
            Snackbar.show({
                text: 'Biometric authentication removed successfully!',
                backgroundColor: '#4CAF50',
                duration: Snackbar.LENGTH_SHORT,
            });
    
            if (typeof onClose === 'function') {
                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (error) {
            console.error('Error removing biometrics:', error);
            Snackbar.show({
                text: 'Failed to remove biometric authentication.',
                backgroundColor: '#F44336',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };

    return(
        <>
            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:5}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Remove Biometrics</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <View style={{marginBottom:20,flex:1}}>
                    <Text style={{...FONTS.font,color:colors.text}}>Are you sure you want to remove biometrics ?</Text>
                </View>
                <View style={{flexDirection:'row',marginHorizontal:-5}}>
                    <View style={{paddingHorizontal:5,width:'50%'}}>
                        <CustomButton onPress={() => removeBiometricAuth(onClose)} title='Yes'/>
                    </View>
                    <View style={{paddingHorizontal:5,width:'50%'}}>
                        <CustomButton onPress={onClose} color='#f72b50' title='No'/>
                    </View>
                </View>
            </View>
            
        </>
    )
}

export default GoogleAuthenticatorConfirm;
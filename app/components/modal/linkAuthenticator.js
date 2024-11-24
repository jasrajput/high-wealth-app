import React, { useEffect } from 'react';
import {
    View,
    Text,
    Alert
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

const LinkAuthenticator = ({ onClose }) => {

    const { colors } = useTheme();

    const enableBiometricAuth = async () => {
        const rnBiometrics = new ReactNativeBiometrics();
        try {
            const resultObject = await rnBiometrics.isSensorAvailable();
            const { available, biometryType } = resultObject;

            if (available) {
                if (biometryType === BiometryTypes.FaceID) {
                    promptEnableBiometricAuth('FaceID');
                } else if (biometryType === BiometryTypes.TouchID) {
                    promptEnableBiometricAuth('TouchID');
                } else if (biometryType === BiometryTypes.Biometrics) {
                    // Adjust message to cover all supported types
                    promptEnableBiometricAuth('Device-supported biometrics (e.g., FaceID/TouchID)');
                }
            } else {
                Snackbar.show({
                    text: 'Biometric authentication is not supported on this device.',
                    backgroundColor: '#F44336',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Snackbar.show({
                text: 'An error occurred while checking biometrics availability.',
                backgroundColor: '#F44336',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };


    const promptEnableBiometricAuth = async (biometricType) => {
        const authSuccess = await handleBiometricAuth();
        if (authSuccess) {
            await AsyncStorage.setItem('biometricEnabled', 'true');
            await AsyncStorage.setItem('biometricType', biometricType);

            Snackbar.show({
                text: `${biometricType} authentication enabled successfully!`,
                backgroundColor: '#4CAF50',
                duration: Snackbar.LENGTH_SHORT,
            });

            setTimeout(() => {
                onClose();
            }, 2000);
        }
    };


    const handleBiometricAuth = async () => {
        const rnBiometrics = new ReactNativeBiometrics();
        try {
            const { success } = await rnBiometrics.simplePrompt({
                promptMessage: 'Authenticate to enable biometrics',
            });

            if (success) {
                Snackbar.show({
                    text: 'Biometric authentication successful!',
                    backgroundColor: '#4CAF50',
                    duration: Snackbar.LENGTH_SHORT,
                });
                return true;
            } else {
                Snackbar.show({
                    text: 'Authentication failed. Please try again.',
                    backgroundColor: '#F44336',
                    duration: Snackbar.LENGTH_SHORT,
                });
                return false;
            }
        } catch (error) {
            console.error('[handleBiometricAuth] Error:', error);
            Snackbar.show({
                text: 'An error occurred during biometric authentication.',
                backgroundColor: '#F44336',
                duration: Snackbar.LENGTH_SHORT,
            });
            return false;
        }
    };


    return (
        <>
            <View style={{ ...GlobalStyleSheet.modalHeader, paddingBottom: 5 }}>
                <Text style={{ ...FONTS.h6, color: colors.title }}>Enable Biometric Authentication</Text>
            </View>
            <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
                <View style={{ marginBottom: 20, flex: 1 }}>
                    <Text style={{ ...FONTS.font, color: colors.text }}>
                        Secure your Crypto Money account by enabling biometric authentication. Use your fingerprint or face ID for quick and secure access.
                    </Text>
                </View>
                <CustomButton
                    title="Enable"
                    onPress={enableBiometricAuth}
                />
            </View>
        </>
    )
}

export default LinkAuthenticator;
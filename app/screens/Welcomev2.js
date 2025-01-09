import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { WELCOMEIMAGES, FONTS, COLORS, SIZES } from '../constants/theme';
import ButtonOutline from '../components/Button/ButtonOutline';
import * as Keychain from 'react-native-keychain';

const WelcomeV2 = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [isFocused, setisFocused] = useState(false);
    const [walletName, setWalletName] = useState('');

    const saveWalletName = async () => {
        try {
            await Keychain.setGenericPassword("walletName", walletName, { service: "walletName" });
            navigation.navigate('welcomev3')
        } catch (error) {
            console.error('Failed to save wallet name:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.imageContainer}>
                <Image source={WELCOMEIMAGES.second} style={styles.img} />
            </View>

            <View
                style={{ flex: 1, marginTop: 100 }}>
                <Text style={{ ...FONTS.h4, textAlign: 'center' }}>Give your wallet a name</Text>
                <Text style={{ ...FONTS.xs, textAlign: 'center', marginTop: 5, paddingHorizontal: 10 }}>
                    To be able to recognize your wallet. Please give your wallet a  name
                </Text>
                <View style={{ margin: 10 }}>
                    <Text style={{ marginTop: 20 }}>Wallet name</Text>
                    <TextInput
                        value={walletName}
                        onChangeText={text => setWalletName(text)}
                        onFocus={() => setisFocused(true)}
                        onBlur={() => setisFocused(false)}
                        placeholderTextColor={colors.text}
                        style={[
                            { height: 40, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, color: colors.text, marginTop: 5 },
                            isFocused ? styles.inputActive : ""
                        ]}
                        placeholder='Enter your wallet name'
                    />
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', position: 'relative', bottom: 10, margin: 10 }}>
                <ButtonOutline onPress={saveWalletName} title="Get Started" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    img: {
        resizeMode: 'contain',
        width: 350,
        marginTop: 100
    },

    inputGroup: {
        position: 'relative',
        marginBottom: 15,
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: 'transparent',
        fontSize: SIZES.font,
        borderRadius: SIZES.radius,
        paddingLeft: 50,
    },
    inputActive: {
        borderColor: COLORS.primary,
    },
})


export default WelcomeV2;
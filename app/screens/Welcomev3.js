import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {  useNavigation } from '@react-navigation/native';
import { FONTS, COLORS, SIZES } from '../constants/theme';
import ButtonOutline from '../components/Button/ButtonOutline';
import 'react-native-get-random-values';
import Snackbar from 'react-native-snackbar';
import * as Keychain from 'react-native-keychain';
import { generateMnemonic } from 'bip39';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';

global.Buffer = Buffer;

const WelcomeV3 = () => {
    const navigation = useNavigation();
    const [recoveryPhrase, setRecoveryPhrase] = useState('');
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [phraseWords, setPhraseWords] = useState([]);


    useEffect(() => {
        const generateKeys = async () => {
            try {
                const mnemonic = generateMnemonic();
                setRecoveryPhrase(mnemonic);
                setPhraseWords(mnemonic.split(' '));
                setLoading(false);

                // const wallet = ethers.Wallet.fromMnemonic(mnemonic);
                // console.log(wallet)
                // setWallet(wallet);
            
            } catch (error) {
                console.error('Error generating keys:', error);
                setLoading(false);
            }
        };

        generateKeys();

    }, []);


    const savePhrase = async () => {
        await Keychain.setGenericPassword("recoveryPhrase", recoveryPhrase, { service: "recoveryData" });
        console.log('Recovery phrase saved securely');
        navigation.navigate('welcomeImport', {
            phrases: phraseWords
        });
    }


    const copyToClipboard = () => {
        Clipboard.setString(recoveryPhrase);
        Snackbar.show({
            text: 'Copied',
            backgroundColor: COLORS.success,
            duration: Snackbar.LENGTH_SHORT,
        });
    };


    if(loading) {
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    return (
        <View style={{ flex: 1, }}>
            <View
                style={{ flex: 1, marginTop: 100 }}>
                <Text style={{ ...FONTS.h4, textAlign: 'center' }}>Secret Recovery Phrase</Text>
                <Text style={{ ...FONTS.xs, textAlign: 'center', marginTop: 5 }}>
                    This is the only way you will be able to recover your account.Please store it somewhere safe!
                </Text>
            </View>
            
            <View style={styles.phraseContainer}>
                {phraseWords.map((word, index) => (
                    <View key={index + index} style={styles.wordContainer}>
                        <Text style={styles.wordNumber}>{index + 1}</Text>
                        <Text style={styles.wordText}>{word}</Text>
                    </View>
                ))}
                {
                    phraseWords.length > 0 && (
                        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                            <Text style={styles.copyButtonText}>📋 Copy to clipboard</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', position: 'relative', bottom: 10, margin: 10 }}>
                <ButtonOutline onPress={savePhrase}  title="Okay, I have it saved" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    privateKey: {
        fontSize: 16,
        color: '#333',
    },

    generateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    phraseContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 20,
    },
    wordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#333',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        margin: 4,
        minWidth: 134,
    },
    wordNumber: {
        color: '#aaa',
        fontSize: 14,
        marginRight: 6,
    },
    wordText: {
        color: '#fff',
        fontSize: 16,
    },
    copyButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    copyButtonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
})


export default WelcomeV3;
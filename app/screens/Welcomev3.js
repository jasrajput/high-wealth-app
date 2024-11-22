import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { FONTS, COLORS } from '../constants/theme';
import ButtonOutline from '../components/Button/ButtonOutline';
import 'react-native-get-random-values';
import Snackbar from 'react-native-snackbar';
import * as Keychain from 'react-native-keychain';
import { generateMnemonic } from 'bip39';
import { ethers } from '../../custom-ether';

const WelcomeV3 = () => {
    const navigation = useNavigation();
    const [recoveryPhrase, setRecoveryPhrase] = useState('');
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [phraseWords, setPhraseWords] = useState([]);
    const [showPhrase, setShowPhrase] = useState(false);


    useEffect(() => {
        const generateKeys = async () => {
            try {
                const mnemonic = generateMnemonic();
                setRecoveryPhrase(mnemonic);
                setPhraseWords(mnemonic.split(' '));
                setLoading(false);

                const wallet = ethers.Wallet.fromPhrase(mnemonic);
                console.log(wallet)
                setWallet(wallet);

            } catch (error) {
                console.error('Error generating keys:', error);
                setLoading(false);
            }
        };

        generateKeys();

    }, []);


    const savePhrase = async () => {
        if(showPhrase) {
            await Keychain.setGenericPassword("recoveryPhrase", recoveryPhrase, { service: "recoveryData" });
            console.log('Recovery phrase saved securely');
            navigation.navigate('welcomeImport', {
                phrases: phraseWords
            });
        } else {
            Snackbar.show({
                text: 'Please backup your phrase first',
                backgroundColor: COLORS.danger,
                duration: Snackbar.LENGTH_SHORT,
            });
    
        }
    }


    const copyToClipboard = () => {
        console.log('clicked');
        Clipboard.setString(recoveryPhrase);
        Snackbar.show({
            text: 'Copied',
            backgroundColor: COLORS.success,
            duration: Snackbar.LENGTH_SHORT,
        });
    };


    if (loading) {
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, marginTop: 100 }}>
                <Text style={{ ...FONTS.h4, textAlign: 'center' }}>Secret Recovery Phrase</Text>
                <Text style={{ ...FONTS.xs, textAlign: 'center', marginTop: 5 }}>
                    This is the only way you will be able to recover your account. Please store it somewhere safe!
                </Text>
            </View>

            <View style={styles.phraseContainer}>
                {/* Background overlay for hiding the phrases */}
                {!showPhrase && (
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={() => setShowPhrase(true)} // Toggle state when overlay is tapped
                    >
                        <Text style={styles.overlayText}>Tap to reveal phrase</Text>
                    </TouchableOpacity>
                )}

                {/* Phrase content */}
                {showPhrase && (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {phraseWords.map((word, index) => (
                            <View key={index} style={styles.wordContainer}>
                                <Text style={styles.wordNumber}>{index + 1}</Text>
                                <Text style={styles.wordText}>{word}</Text>
                            </View>
                        ))}

                        {/* <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                            <Text style={styles.copyButtonText}>📋 Copy to clipboard</Text>
                        </TouchableOpacity> */}
                    </View>
                )}
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', position: 'relative', bottom: 10, margin: 10 }}>
                <ButtonOutline onPress={savePhrase} title="Okay, I have it saved" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    phraseContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        position: 'relative',
    },
    overlay: {
        height: 300,
        width: '80%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(54, 54, 135, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        zIndex: 10,
        opacity: 0.4,
    },
    overlayText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
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
        zIndex: 30,

    },
    copyButtonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
})


export default WelcomeV3;
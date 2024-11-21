import React, { useState, useRef } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { FONTS, COLORS, SIZES } from '../constants/theme';
import ButtonOutline from '../components/Button/ButtonOutline';
import * as Keychain from 'react-native-keychain';
import Snackbar from 'react-native-snackbar';
import { ethers } from 'ethers';
import { wordlists } from "bip39";

let title = 'Secret Recovery Phrase'
let paragraph = "Please give us your secret recovery phrase so we can restore it";
let button = "Restore";
const WelcomeImport = ({ route }) => {
    const {phrases} = route.params;
    
    if(phrases) {
        title = 'Verify Recovery Phrase';
        paragraph = 'You’ve just backed up your recovery phrase. Please verify it by entering the words below.'
        button = 'Verify'
    }
    console.log(phrases);


    const navigation = useNavigation();
    const { colors } = useTheme();
    const [isFocused, setisFocused] = useState(false);
    const [recoveryPhrase, setRecoveryPhrase] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);


    const validateRecoveryPhrase = (phrase) => {
        try {
            const wallet = ethers.Wallet.fromMnemonic(phrase);
            return wallet;
        } catch (error) {
            return error;
        }
    };

    const handleSuggestionSelect = (item) => {
        const words = recoveryPhrase.trim().split(' ');
        words.pop();
        words.push(item);
        setRecoveryPhrase(words.join(' ') + ' ');
      };
      
      

    const generateSuggestions = (input) => {
        if (input.length > 0) {
            const matchedWords = wordlists.english
                .filter((word) => word.startsWith(input.toLowerCase()))
                .slice(0, 5); // Limit to first 5 matches
            setSuggestions(matchedWords);
        } else {
            setSuggestions([]);
        }
    };


    const restorePhrase = async () => {
        try {
            // If the user is verifying a phrase, check if input matches the backup phrase
            if (phrases && phrases.length > 0) {
                if (!recoveryPhrase) {
                    throw new Error("Please enter the recovery phrase to verify.");
                }
    
                // Split the entered phrase and compare it to the backed-up phrase
                const enteredWords = recoveryPhrase.split(' ');
                if (enteredWords.length !== phrases.length) {
                    throw new Error("Recovery phrase does not match the original backup.");
                }
    
                // Compare each word in the recovery phrase
                for (let i = 0; i < enteredWords.length; i++) {
                    if (enteredWords[i] !== phrases[i]) {
                        throw new Error(`Word ${i + 1} does not match the backup phrase.`);
                    }
                }
    
                console.log('Recovery phrase verified successfully');
                navigation.navigate('welcomev4', {
                    // wallet: wallet // Assuming you have a valid wallet object ready for navigation
                });
            } else {
                // If `phrases` doesn't exist, we're in the import mode (restore)
                if (!recoveryPhrase) {
                    throw new Error("Recovery phrase cannot be empty");
                }
    
                const wallet = validateRecoveryPhrase(recoveryPhrase);
                if (!wallet.address) {
                    throw new Error('Invalid recovery phrase');
                }
    
                await Keychain.setGenericPassword("recoveryPhrase", recoveryPhrase, { service: "recoveryData" });
                console.log('Recovery phrase saved securely');
                navigation.navigate('welcomev4', {
                    wallet: wallet
                });
            }
        } catch (error) {
            return Snackbar.show({
                text: error.message,
                backgroundColor: COLORS.danger,
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };
    

    return (
        <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 20 }}>

            <Text style={{ ...FONTS.h4, textAlign: 'center' }}>{title}</Text>
            <Text style={{ ...FONTS.xs, textAlign: 'center', marginTop: 5, paddingHorizontal: 10 }}>
                {paragraph}
            </Text>
            <Text style={{ marginTop: 20 }}>Secret Recover Phrase</Text>

            

            <TextInput
            ref={inputRef}
                value={recoveryPhrase}
                onChangeText={(text) => {
                    setRecoveryPhrase(text);
                    generateSuggestions(text.split(' ').pop() || '');
                }}
                onFocus={() => setisFocused(true)}
                onBlur={() => setisFocused(false)}
                placeholderTextColor={colors.text}
                style={[
                    { height: 40, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, color: colors.text, marginTop: 5 },
                    isFocused ? styles.inputActive : ""
                ]}
                placeholder='Enter your recovery phrase'
            />

            <ScrollView horizontal={false} contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps={'always'}>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 1,
                        height: 200
                    }}
                >
                    {suggestions.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSuggestionSelect(item)}
                            style={{
                                backgroundColor: '#fff',
                                padding: 10,
                                margin: 5,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: '#ccc',
                            }}
                        >
                            <Text style={{ color: colors.text }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={{ flex: 1, justifyContent: 'flex-end', position: 'relative', bottom: 10, margin: 10 }}>
                <ButtonOutline onPress={restorePhrase} title={button} />
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


export default WelcomeImport;
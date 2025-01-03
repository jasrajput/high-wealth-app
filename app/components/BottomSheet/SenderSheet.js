import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CryptoActionsSheet from './CryptoActionsSheet';
import ButtonOutline from '../Button/ButtonOutline';
import Clipboard from '@react-native-clipboard/clipboard';

const SendCryptoActionsSheet = ({ currency, refRBSheet, address, scan, onTransfer }) => {
    const [senderAddress, setSenderAddress] = useState(address);
    const [amount, setAmount] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const pasteAddress = async () => {
        const clipboardContent = await Clipboard.getString();
        setSenderAddress(clipboardContent); 
    };

    const handleTransfer = () => {
        onTransfer(senderAddress, amount);
    }
    
    useEffect(() => {
        setSenderAddress(address);
    }, [address]);


    return (
        <CryptoActionsSheet ref={refRBSheet} title={`Send ${currency}`}>
            <View style={{ margin: 10 }}>
                <Text style={styles.label}>Sender Address</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={senderAddress}
                        onChangeText={setSenderAddress}
                        placeholderTextColor="#888"
                        style={[
                            styles.textInput,
                            isFocused && styles.inputActive
                        ]}
                        placeholder="Sender Wallet Address"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    <View style={styles.inputActions}>
                        <TouchableOpacity onPress={pasteAddress}>
                            <Text style={styles.pasteText}>Paste</Text>
                        </TouchableOpacity>
                        <FontAwesome onPress={scan} name="qrcode" size={20} color="#000" />
                    </View>
                </View>

                <Text style={styles.label}>Amount</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        style={styles.textInput}
                        placeholder="Enter Amount"
                    />
                </View>
            </View>

            <View style={styles.footerSend}>
                <ButtonOutline onPress={handleTransfer} title="Send" />
            </View>

        </CryptoActionsSheet>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        color: '#333',
    },
    inputActive: {
        borderColor: '#00A4E4',
    },
    inputActions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    pasteText: {
        color: '#007BFF',
        marginRight: 20,
    },
    footerSend: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
    },
});

export default SendCryptoActionsSheet;

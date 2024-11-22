import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    Text,
    View,
    TextInput,
} from "react-native";
import { SIZES, COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton.js';
import CryptoActionsSheet from './CryptoActionsSheet';
import * as Keychain from 'react-native-keychain';


const TransferSheet = ({ currency, amount, fromAddress, toAddress, refTransfer }) => {

    const { colors } = useTheme();
    const [networkFee, setNetworkFee] = useState(0);
    const [maxTotal, setMaxTotal] = useState(0);

    const truncateAddress = (address) => {
        return `${address.slice(0, 12)}...${address.slice(-8)}`;
    };


    const getGasPrice = async () => {
        const url = 'https://api-testnet.bscscan.com/api?module=proxy&action=eth_gasPrice';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            return parseInt(data.result, 16); // Convert hex to integer and return gas price in wei
        } catch (error) {
            console.error('Error fetching gas price:', error);
            return 0;
        }
    };

    const estimateGasLimit = async (toAddress, amount) => {
        const url = `https://api-testnet.bscscan.com/api?module=proxy&action=eth_estimateGas&to=${toAddress}&value=${amount}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            return parseInt(data.result, 16); // Return gas limit in integer (wei)
        } catch (error) {
            console.error('Error estimating gas limit:', error);
            return 0;
        }
    };

    const calculateNetworkFee = (gasPrice, gasLimit) => {
        return gasPrice * gasLimit; // In wei (for BSC or ETH)
    };

    const weiToBNB = (wei) => {
        return wei / Math.pow(10, 18); // Convert wei to BNB (or ETH)
    };

    const getMaxTotal = (amountSent, gasPrice, gasLimit) => {
        const networkFee = calculateNetworkFee(gasPrice, gasLimit);
        const maxTotal = amountSent + networkFee;  // Total cost including network fee
        return maxTotal;
    };

    const calculateAllDetails = async () => {
        const amountSent = amount * Math.pow(10, 18); // For example, 1 ETH (in wei)
        const gasPrice = await getGasPrice();
        const gasLimit = await estimateGasLimit(toAddress, amountSent);

        const networkFee = calculateNetworkFee(gasPrice, gasLimit);
        const maxTotal = getMaxTotal(amountSent, gasPrice, gasLimit);

        const networkFeeBNB = weiToBNB(networkFee);
        const maxTotalBNB = weiToBNB(maxTotal);
        console.log('Network Fee in BNB:', networkFeeBNB);
        console.log('Max Total (Transaction Cost) in BNB:', maxTotalBNB);

        return { networkFeeBNB, maxTotalBNB }
    }

    useEffect(() => {
        if (amount && toAddress) {
            // Call the async function inside useEffect properly
            const fetchDetails = async () => {
                const { networkFeeBNB, maxTotalBNB } = await calculateAllDetails();
                setNetworkFee(networkFeeBNB);
                setMaxTotal(maxTotalBNB);
            };

            fetchDetails(); // Call the async function
        }
    }, [amount, toAddress]); // Dependencies to trigger this effect

    const onConfirmTransfer = async () => {
        // Prepare transaction data
        try {
            const transactionData = {
                from: fromAddress,  // Sender's address
                to: toAddress,        // Recipient's address
                value: amountInWei,   // Amount to send (in wei)
                gas: gasLimit,        // Gas limit
                gasPrice: gasPrice,   // Gas price
                data: "0x",           // Any additional data (can be used for smart contract interactions)
            };

            const signedTransaction = await signTransaction(transactionData);

            // Send the transaction (you can use an RPC call here)
            const response = await sendTransaction(signedTransaction);

            if (response && response.transactionHash) {
                console.log("Transaction sent successfully:", response.transactionHash);
                // You can track the transaction status with the tx hash
            } else {
                console.log("Transaction failed");
            }
        } catch (error) {
            console.error("Error sending transaction:", error);
        }
    }

    return (
        <>
            <CryptoActionsSheet ref={refTransfer} title={`Transfer`}>
                <View style={{ ...GlobalStyleSheet.container, paddingTop: 10 }}>
                    <Text style={{ ...FONTS.h3, color: colors.title, marginBottom: 15, textAlign: 'center' }}>
                        -{amount} {currency}
                    </Text>

                    <View style={{ marginBottom: 15 }}>
                        <View
                            style={{
                                height: 70,
                                borderRadius: SIZES.radius,
                                borderWidth: 1,
                                borderColor: colors.borderColor,
                                backgroundColor: colors.background,
                                paddingHorizontal: 15,
                                paddingVertical: 9,
                            }}
                        >
                            <Text style={{ ...FONTS.font, color: COLORS.primary, ...FONTS.fontSemiBold, marginBottom: 3 }}>From</Text>
                            <TextInput
                                style={{
                                    ...FONTS.h6, color: colors.title,
                                    padding: 0,
                                }}
                                editable={false}
                                value={truncateAddress(fromAddress)}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <View
                            style={{
                                height: 70,
                                borderRadius: SIZES.radius,
                                borderWidth: 1,
                                borderColor: colors.borderColor,
                                backgroundColor: colors.background,
                                paddingHorizontal: 15,
                                paddingVertical: 9,
                            }}
                        >
                            <Text style={{ ...FONTS.font, color: COLORS.primary, ...FONTS.fontSemiBold, marginBottom: 3 }}>To</Text>
                            <TextInput
                                style={{
                                    ...FONTS.h6, color: colors.title,
                                    padding: 0,
                                }}
                                editable={false}
                                value={truncateAddress(toAddress)}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                            marginTop: 20,
                            marginHorizontal: 10
                        }}
                    >
                        <Text style={{ ...FONTS.font, color: colors.title }}>Network Fee:</Text>
                        <Text style={{ ...FONTS.font, color: COLORS.primary }}>{networkFee}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                            marginHorizontal: 10
                        }}
                    >
                        <Text style={{ ...FONTS.font, color: colors.title }}>Max Total:</Text>
                        <Text style={{ ...FONTS.font, color: COLORS.primary }}>{maxTotal}</Text>
                    </View>

                    <CustomButton title="Confirm" onPress={onConfirmTransfer} />

                </View>
            </CryptoActionsSheet>
        </>
    );
};


export default TransferSheet;
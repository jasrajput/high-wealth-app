import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import CryptoActionsSheet from './CryptoActionsSheet';
import Snackbar from 'react-native-snackbar';

const RecipientSheet = ({ refRBSheet2, walletAddress, COLORS, symbol }) => {
    const copyToClipboard = () => {
        Clipboard.setString(walletAddress);
        Snackbar.show({
          text: 'Copied',
          backgroundColor: COLORS.success,
          duration: Snackbar.LENGTH_SHORT,
        });
    };

      
    const onShareAddress = async () => {
        try {
    
          const shareOptions = {
            title: 'Share Wallet Address',
            message: `My Public Address to Receive ${symbol}\n. Pay me via High Wealth`,
            subject: `My  Wallet Address`,
            url: walletAddress,
          };
    
          await Share.open(shareOptions);
        } catch (error) {
          console.log(error.message);
        }
      };

    return (
        <CryptoActionsSheet ref={refRBSheet2} title={`Receive ${symbol}`}>
            <View style={styles.modalOverlay}>
                <View style={styles.container}>
                    {/* Warning Banner */}
                    <View style={styles.warningBanner}>
                        <Text style={styles.warningText}>
                            ⚠️ Only send {symbol} assets to this address. Other assets will be lost forever.
                        </Text>
                    </View>

                    {/* QR Code with Logo */}
                    <View style={styles.qrCodeContainer}>
                        <QRCode
                            value={walletAddress}
                            size={250}
                            logo={require('../../assets/images/logo-full-white.png')}
                            logoSize={30}
                            logoBorderRadius={10}
                            logoMargin={10}
                            logoBackgroundColor="black"
                        />
                        <Text style={styles.addressText}>{walletAddress}</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={copyToClipboard} style={styles.button}>
                            <Text style={styles.buttonText}>Copy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onShareAddress} style={styles.button}>
                            <Text style={styles.buttonText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </CryptoActionsSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
      },
    
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },

    qrCodeContainer: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginVertical: 20,
    },
    addressText: {
        fontSize: 14,
        color: '#333333',
        marginTop: 10,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginHorizontal: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#2C2C2E',
        width: '50%',
        marginHorizontal: 2
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },

    warningText: {
        color: '#F0B90B',
        fontSize: 12,
        textAlign: 'center',
    },

    warningBanner: {
        backgroundColor: '#594A1E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        margin: 20
    },
});

export default RecipientSheet;

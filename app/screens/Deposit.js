import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import axios from 'axios';
import HeaderBar from '../layout/header';
import BalanceChart from '../components/totalBalanceChart';
import { FONTS, COLORS } from '../constants/theme';
import { ethers } from 'ethers';
import * as Keychain from 'react-native-keychain';
import QRCode from 'react-native-qrcode-svg';
import RBSheet from "react-native-raw-bottom-sheet";
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import 'text-encoding';
import Snackbar from 'react-native-snackbar';



const Deposit = ({ route }) => {
  const { tokenId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenData, setTokenData] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  
  const [priceChange, setPriceChange] = useState(0);

  // const getAddressFromSeed = () => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       // Retrieve the seed phrase from the Keychain
  //       const credentials = await Keychain.getGenericPassword({ service: "recoveryData" });
  //       if (credentials) {
  //         const seedPhrase = credentials.password;

  //         try {
  //           const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
  //           // const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
  //           setWalletAddress(wallet.address);

  //           console.log("User Address: ", wallet.address);
  //           resolve(wallet.address); // Resolve with the wallet address
  //         } catch (error) {
  //           console.error(error);
  //           reject(error); // Reject if there's an error generating the wallet
  //         }
  //       } else {
  //         console.error("No seed phrase found in Keychain");
  //         reject("No seed phrase found"); // Reject if no credentials are found
  //       }
  //     } catch (error) {
  //       console.error("Error retrieving credentials:", error);
  //       reject(error); // Reject if there's an error with Keychain retrieval
  //     }
  //   });
  // };

  const getAddressFromSeed = () => {
    setWalletAddress("0x21295aaAb6a1c2a88bB09BECfB51833469096063");
    return '0x21295aaAb6a1c2a88bB09BECfB51833469096063';
  }

  const copyToClipboard = () => {
      Clipboard.setString(walletAddress);
      Snackbar.show({
          text: 'Copied',
          backgroundColor: COLORS.success,
          duration: Snackbar.LENGTH_SHORT,
      });
  };

  const fetchTransactions = async (address) => {
    try {
        const apiKey = 'VJACNZIGAXCD6PGTI6CHRIS6DRHTBNRNXP';
        const url = `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        return data.result;
    } catch (er) {
      setError(er.message);
      return [];
    }
  };

  const onShareAddress = async () => {
    try {

      const shareOptions = {
        title: 'Share Wallet Address',
        message: `My Public Address to Receive ${tokenData.symbol.toUpperCase()}\n. Pay me via High Wealth`,
        subject: `My  Wallet Address`,
        url: walletAddress,
      };
  
      // Open the share dialog
      await Share.open(shareOptions);
    } catch (error) {
      // console.error('Error sharing address: ', error);
      setError(error.message);
    }
  };
  


  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}`);
        setTokenData(response.data);

        const priceChange = response.data.market_data.price_change_percentage_24h;
        setPriceChange(priceChange);
      } catch (ex) {
        setError(ex.message);
      }
    }

    const fetchData = async () => {
      const address = await getAddressFromSeed();
      if (address) {
        try {
          const txs = await fetchTransactions(address);
          setTransactions(txs);
          setLoading(false);

        } catch (err) {
          setError('Failed to fetch transactions');
          setLoading(false);
        }
      } else {
        setError('Unable to derive address');
        setLoading(false);
      }
    };

    fetchData();
    fetchTokenDetails();
  }, [tokenId]);

  if (!tokenData) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if(error) {
    Snackbar.show({
        text: error,
        backgroundColor: COLORS.danger,
        duration: Snackbar.LENGTH_SHORT,
    });
  }

  return (
    <View style={styles.container}>

      <HeaderBar title={tokenData.name.toUpperCase() + `(${tokenData.symbol.toUpperCase()})`} leftIcon={'back'} />
      <BalanceChart onSend={() => refRBSheet2.current.open()} onReceive={() => refRBSheet.current.open()} headerTitle={tokenData.name.toUpperCase()} header={false} />

      <Text style={styles.header}>Transactions List</Text>
      {transactions.length > 0 ? (
        transactions.map((tx, index) => (
          <View key={index} style={styles.txItem}>
            <Text style={styles.txHash}>Hash: {tx.hash}</Text>
            <Text style={styles.txDetails}>From: {tx.from}</Text>
            <Text style={styles.txDetails}>To: {tx.to}</Text>
            <Text style={styles.txAmount}>Amount: {ethers.utils.formatEther(tx.value)} ETH</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noTransactions}>No transactions found.</Text>
      )}


      {/* Receive */}
      <RBSheet
        height={750}
        ref={refRBSheet}
        openDuration={300}
        draggable={true}
        closeOnDragDown={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}

      >
        <View style={styles.modalOverlay}>
          <View style={styles.container}>
            {/* Warning Banner */}
            <View style={styles.warningBanner}>
              <Text style={styles.warningText}>
                ⚠️ Only send {tokenData.symbol.toUpperCase()} assets to this address. Other assets will be lost forever.
              </Text>
            </View>

            {/* QR Code with Logo */}
            <View style={styles.qrCodeContainer}>
              <QRCode
                value={walletAddress}
                size={250}
                logo={require('../assets/images/logo-full-white.png')} // Local logo image
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
      </RBSheet>


      <View style={styles.footer}>
        <Text style={styles.tokenName}>Current {tokenData.symbol.toUpperCase()} Price</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.tokenPrice}>${tokenData.market_data.current_price.usd}</Text>
          <Text style={[styles.priceChange, { color: priceChange > 0.0000 ? 'green' : 'red' }]}>
            {priceChange > 0.0000 ? `+${priceChange.toFixed(2)}%` : `${priceChange.toFixed(2)}%`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.darkBackground,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },

  tokenName: {
    ...FONTS.h6,
    color: '#fff',
    marginRight: 10,
  },
  tokenPrice: {
    ...FONTS.h6,
    color: '#fff',
    marginRight: 10,
  },
  priceChange: {
    ...FONTS.h6,
    fontWeight: 'bold',
  },
  priceChangePositive: {
    color: 'green',
  },
  priceChangeNegative: {
    color: 'red',
  },

  warningBanner: {
    backgroundColor: '#594A1E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 20
  },
  warningText: {
    color: '#F0B90B',
    fontSize: 12,
    textAlign: 'center',
  },
  cryptoInfo: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  cryptoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F0B90B',
    marginRight: 5,
  },
  chainText: {
    fontSize: 14,
    color: '#8E8E93',
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
  depositButton: {
    backgroundColor: '#2C2C2E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  depositText: {
    color: '#32CD32',
    fontSize: 14,
    fontWeight: 'bold',
  },
  depositSubText: {
    color: '#8E8E93',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20

  },


  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 20,
    color: '#333',
    paddingHorizontal: 10
  },
  txItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  txHash: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff', // Transaction hash color
    marginBottom: 5,
  },
  txDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for amounts
    marginTop: 5,
  },
  noTransactions: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

export default Deposit;

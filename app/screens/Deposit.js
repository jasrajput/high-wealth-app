import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import HeaderBar from '../layout/header';
import BalanceChart from '../components/totalBalanceChart';
import { FONTS, COLORS } from '../constants/theme';
import { ethers } from 'ethers';
import 'text-encoding';
import Snackbar from 'react-native-snackbar';
import SenderSheet from '../components/BottomSheet/SenderSheet';
import RecipientSheet from '../components/BottomSheet/RecipientSheet';
import * as Keychain from 'react-native-keychain';



const Deposit = ({ route }) => {
  const { tokenId } = route.params;
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
    setWalletAddress("0xbfD47Cb7B74E9D0F6397C0Df02FAFeA8983362AF");
    return '0xbfD47Cb7B74E9D0F6397C0Df02FAFeA8983362AF';
  }

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

  if (error) {
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


      {/* Send */}
      
      <SenderSheet currency={tokenData.symbol.toUpperCase()} refRBSheet={refRBSheet2} />

      {/* Receive */}
      <RecipientSheet COLORS={COLORS} walletAddress={walletAddress} tokenData={tokenData} refRBSheet={refRBSheet} />

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
  }
});

export default Deposit;

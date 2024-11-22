import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import HeaderBar from '../layout/header';
import BalanceChart from '../components/totalBalanceChart';
import { FONTS, COLORS } from '../constants/theme';
import 'text-encoding';
import Snackbar from 'react-native-snackbar';
import SenderSheet from '../components/BottomSheet/SenderSheet';
import RecipientSheet from '../components/BottomSheet/RecipientSheet';
import { getAddressFromSeed } from '../helpers/wallet';
import ScanSheet from '../components/BottomSheet/ScanSheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TransferSheet from '../components/BottomSheet/TransferSheet';

const Deposit = ({ route }) => {
  const { tokenId } = route.params;
  const [address, setAddress] = useState(''); // State to hold the sender address
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenData, setTokenData] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [balanceUsdValue, setBalanceUsdValue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const scanSheetRef = useRef();
  const transferSheetRef = useRef();
  const [priceChange, setPriceChange] = useState(0);


  const categorizeTransaction = (tx, walletAddress) => {
    if (tx.from.toLowerCase() === walletAddress.toLowerCase()) {
      return 'Send';
    }
    if (tx.to.toLowerCase() === walletAddress.toLowerCase()) {
      return 'Receive';
    }
    if (tx.input !== "0x" || tx.contractAddress !== "") {
      return 'Smart Contract Call';
    }
    return 'Unknown';
  };

  
  const formatDate = (timestamp) => {
    const transactionDate = new Date(timestamp * 1000); // Convert from Unix timestamp
    const now = new Date();
    
    const diffTime = now - transactionDate; // Difference in milliseconds
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)); // Difference in days
  
    if (diffDays === 1) {
      return 'Yesterday';
    }
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return transactionDate.toLocaleDateString('en-US', options); // Format date (e.g., Sep 24, 2024)
  };
  
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const fetchTransactions = async (address) => {
    try {
      const apiKey = 'VJACNZIGAXCD6PGTI6CHRIS6DRHTBNRNXP';
      const url = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      return data.result;
    } catch (er) {
      setError(er.message);
      return [];
    }
  };

  const handleScannedData = (data) => {
    setAddress(data);
  };

  const handleTransfer = (senderAddress, amount) => {
    transferSheetRef.current.open();
    setAmount(amount);
    setAddress(senderAddress);
  }

  useEffect(() => {
    // Fetch wallet address and transactions
    const fetchData = async () => {
      const address = await getAddressFromSeed();
      setWalletAddress(address);

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

    fetchData();  // Call to fetch wallet address and transactions
  }, [tokenId]); // Only runs when tokenId changes

  const getBalance = async (wallAddress) => {
    const url = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [wallAddress, 'latest'],
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      const data = await response.json();
      const balance = data.result;
      return parseInt(balance, 16) / Math.pow(10, 18);
    } catch (error) {
      return 0;
    }
  };

  useEffect(() => {
    // Fetch token details and balance after walletAddress is set
    const fetchTokenDetails = async () => {

      if (!walletAddress) return; // Ensure that walletAddress is available

      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}`);
        const priceChange = response.data.market_data.price_change_percentage_24h;
        const bal = await getBalance(walletAddress);

        setBalance(bal);
        setBalanceUsdValue(bal * response.data.market_data.current_price.usd);
        setPriceChange(priceChange);
        setTokenData(response.data);

      } catch (ex) {
        setError(ex.message);
      }
    };

    if (walletAddress) {
      fetchTokenDetails();  // Fetch token details after walletAddress is set
    }
  }, [walletAddress, tokenId]);  // Runs when walletAddress or tokenId changes

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

      <HeaderBar title={String(tokenData.name).toUpperCase() + `(${String(tokenData.symbol).toUpperCase()})`} leftIcon={'back'} />
      <BalanceChart balance={balance} balanceUSD={`$${parseFloat(balanceUsdValue).toFixed(2)}`} onSend={() => refRBSheet2.current.open()} onReceive={() => refRBSheet.current.open()} headerTitle={String(tokenData.name).toUpperCase()} header={false} />

      <Text style={styles.header}>Transactions List</Text>
      {transactions.length > 0 ? (
        transactions.map((tx, index) => {
          const transactionType = categorizeTransaction(tx, walletAddress);
          const formattedDate = formatDate(tx.timeStamp);
          const valueInBNB = parseInt(tx.value) / Math.pow(10, 18);


          return (
            <View key={index} style={styles.txItem}>
              <View style={styles.txDateRow}>
                <Text style={styles.txDate}>{formattedDate}</Text>
              </View>

              <View style={styles.txRow}>
                <View style={styles.iconContainer}>
                  {transactionType === 'Send' && (
                    <MaterialIcons name="arrow-forward" size={24} color="blue" />
                  )}
                  {transactionType === 'Receive' && (
                    <MaterialIcons name="arrow-back" size={24} color="green" />
                  )}
                  {transactionType === 'Smart Contract Call' && (
                    <MaterialIcons name="build" size={24} color="orange" />
                  )}
                </View>

                <View style={styles.txDetails}>
                  <Text style={styles.txType}>{transactionType}</Text>
                  <Text style={styles.txAddress}>
                  {transactionType === 'Send'
                  ? `To: ${truncateAddress(tx.to)}`
                  : `From: ${truncateAddress(tx.from)}`}

                  </Text>
                </View>

                <View style={styles.txValueContainer}>
                  <Text style={styles.txValue}>{valueInBNB.toFixed(2)} BNB</Text>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <Text style={styles.noTransactions}>No transactions found.</Text>
      )}


      {/* Send */}
      <SenderSheet onTransfer={handleTransfer} scan={() => scanSheetRef.current.open()} address={address} currency={String(tokenData.symbol).toUpperCase()} refRBSheet={refRBSheet2} />

      {/* Receive */}
      <RecipientSheet COLORS={COLORS} walletAddress={walletAddress} symbol={String(tokenData.symbol).toUpperCase()} refRBSheet2={refRBSheet} />

      {/* Scanner */}
      <ScanSheet ref={scanSheetRef} onScanSuccess={handleScannedData} />

      {/* Transfer */}
      <TransferSheet fromAddress={walletAddress} toAddress={address} amount={amount} refTransfer={transferSheetRef} currency={String(tokenData.symbol).toUpperCase()}  />

      <View style={styles.footer}>
        <Text style={styles.tokenName}>Current {String(tokenData.symbol).toUpperCase()} Price</Text>
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
    marginTop: 20,
    marginBottom: 25,
    color: '#333',
    paddingHorizontal: 10
  },
  txItem: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  txDateRow: {
    marginBottom: 5,
  },
  txDate: {
    fontSize: 14,
    color: '#888',
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  txDetails: {
    flex: 1,
  },
  txType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txAddress: {
    fontSize: 14,
    color: '#555',
  },
  txValueContainer: {
    marginLeft: 'auto',
  },
  txValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noTransactions: {
    textAlign: 'center',
    color: '#888',
  },
});

export default Deposit;

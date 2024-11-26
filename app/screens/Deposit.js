import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tronWeb from 'tronweb';
import * as solanaWeb3 from "@solana/web3.js";


const Deposit = ({ route }) => {
  const { tokenId } = route.params;
  const [address, setAddress] = useState(''); // State to hold the sender address
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenData, setTokenData] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [balanceUsdValue, setBalanceUsdValue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const scanSheetRef = useRef();
  const transferSheetRef = useRef();
  const [priceChange, setPriceChange] = useState(0);

  const rpcUrls = [
  {
    name: 'binancecoin',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    decimals: 18, // Native token (BNB) uses 18 decimals
  },
  {
    name: 'tether',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    decimals: 18, // Native token (USDT) uses 18 decimals
  },
  {
    name: 'ethereum',
    rpcUrl: 'https://eth.drpc.org',
    decimals: 18, // Native token (ETH) uses 18 decimals
  },
  {
    name: 'matic-network',
    rpcUrl: 'https://polygon.drpc.org',
    decimals: 18, // Native token (MATIC) uses 18 decimals
  },
  {
    name: 'solana',
    rpcUrl: 'https://neon-proxy-mainnet.solana.p2p.org',
    decimals: 9, // Native token (SOL) uses 9 decimals
  },
  {
    name: 'dogecoin',
    rpcUrl: 'https://rpc-us.dogechain.dog',
    decimals: 8, // Native token (DOGE) uses 8 decimals
  },
  {
    name: 'tron',
    rpcUrl: 'https://api.trongrid.io',
    decimals: 6, // Native token (TRX) uses 6 decimals
  },
];


const categorizeTransaction = (tx, walletAddress, tokenName) => {
  switch (tokenName) {
    case 'ethereum':
    case 'binance':
    case 'polygon': {
      // Ethereum-compatible chains (BSC, Polygon, etc.)
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
    }
    
    case 'tron': {
      // Tron blockchain based on the provided output
      const { raw_data, ret, txID } = tx;

      // Check if the transaction is a 'Send' or 'Receive'
      if (raw_data.contract && raw_data.contract.length > 0) {
        const contract = raw_data.contract[0];
        const { owner_address, to_address } = contract.parameter.value;

        // Check for "Send" transaction
        if (owner_address && owner_address.toLowerCase() === walletAddress.toLowerCase()) {
          return 'Send';
        }

        // Check for "Receive" transaction
        if (to_address && to_address.toLowerCase() === walletAddress.toLowerCase()) {
          return 'Receive';
        }

        // Check if the transaction is a smart contract call
        if (contract.type === "TriggerSmartContract") {
          return 'Smart Contract Call';
        }
      }

      return 'Unknown'; // Default if not identified
    }

    case 'bitcoin':
    case 'dogecoin': {
      // Bitcoin and Dogecoin transactions
      if (tx.inputs && tx.inputs.some(input => input.address === walletAddress)) {
        return 'Send';
      }
      if (tx.outputs && tx.outputs.some(output => output.address === walletAddress)) {
        return 'Receive';
      }
      return 'Unknown';
    }

    case 'solana': {
      // Solana blockchain
      if (tx.from.toLowerCase() === walletAddress.toLowerCase()) {
        return 'Send';
      }
      if (tx.to.toLowerCase() === walletAddress.toLowerCase()) {
        return 'Receive';
      }
      if (tx.type === 'smart_contract') {
        return 'Smart Contract Call';
      }
      return 'Unknown';
    }

    case 'xrp': {
      // XRP blockchain
      if (tx.Account.toLowerCase() === walletAddress.toLowerCase()) {
        return 'Send';
      }
      if (tx.Destination.toLowerCase() === walletAddress.toLowerCase()) {
        return 'Receive';
      }
      return 'Unknown';
    }

    // Add more cases for other blockchains as needed

    default:
      return 'Unknown';
  }
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
    return transactionDate.toLocaleDateString('en-US', options);
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const fetchTransactions = async (address, chain) => {
    try {
      switch (chain) {
        case 'binancecoin': {
          const apiKey = 'VJACNZIGAXCD6PGTI6CHRIS6DRHTBNRNXP';
          const url = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
          return data.result || [];
        }

        case 'tether': {
          const apiKey = 'VJACNZIGAXCD6PGTI6CHRIS6DRHTBNRNXP';
          const url = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
          return data.result || [];
        }
  
        case 'ethereum': {
          const apiKey = 'VJACNZIGAXCD6PGTI6CHRIS6DRHTBNRNXP';
          const url = `https://api-testnet.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
          return data.result || [];
        }

        case 'matic-network': {
          const apiKey = 'RG7X63WC3BC75C3GTPUJFHI89QJCT38AR7';
          const url = `https://amoy.polygonscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
          return data.result || [];
        }
  
        case 'tron': {
          const fetchTransactionsTron = async (address) => {
            try {
              const url = `https://api.shasta.trongrid.io/v1/accounts/${address}/transactions`;
              
              const response = await fetch(url);
              const data = await response.json();
              
              if (data && data.data) {
                return data.data; // List of transactions
              } else {
                return [];
              }
            } catch (error) {
              console.error('Tron Transactions Fetch Error:', error);
              return [];
            }
          };

          const transactions = await fetchTransactionsTron(address);
          return transactions; // Returning the transactions data
      
        }
  
        case 'bitcoin': {
          const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full`; // BlockCypher Testnet API
          const response = await fetch(url);
          const data = await response.json();
          return data.txs || [];
        }
  
        case 'dogecoin': {
          const url = `https://dogechain.info/api/v1/address/transactions/${address}`; // Dogechain API
          const response = await fetch(url);
          const data = await response.json();
          return data.transactions || [];
        }
  
        case 'solana': {
          const url = `https://api.devnet.solana.com`; // Solana Devnet RPC
          const body = JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getConfirmedSignaturesForAddress2',
            params: [address, { limit: 10 }],
          });
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
          });
          const data = await response.json();
          return data.result || [];
        }
  
        default:
          return [];
      }
    } catch (error) {
      console.error(`${chain} Transactions Fetch Error:`, error.message);
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


  const fetchBalanceEVM = async (walletAddress, rpcUrl, decimals) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [walletAddress, 'latest'],
    });
  
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
  
      const data = await response.json();
      const balance = data.result;
      console.log("balance: ", balance)

      return balance ? parseInt(balance, 16) / Math.pow(10, decimals) : 0;


    } catch (error) {
      console.error(`EVM Balance Fetch Error:`, error);
      return 0;
    }
  };
  
  const fetchBalanceBitcoin = async (walletAddress) => {
    try {
      const response = await fetch(`https://blockchain.info/q/addressbalance/${walletAddress}`);
      const satoshis = await response.text();
      return satoshis / 1e8; // Convert Satoshis to BTC
    } catch (error) {
      console.error(`Bitcoin Balance Fetch Error:`, error);
      return 0;
    }
  };
  
  const fetchBalanceDogecoin = async (walletAddress) => {
    try {
      const response = await fetch(`https://dogechain.info/api/v1/address/balance/${walletAddress}`);
      const { balance } = await response.json();
      return parseFloat(balance);
    } catch (error) {
      console.error(`Dogecoin Balance Fetch Error:`, error);
      return 0;
    }
  };
  
  const fetchBalanceSolana = async (walletAddress) => {
    try {
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
      const balance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
      return balance / Math.pow(10, 9); // Convert Lamports to SOL
    } catch (error) {
      console.error(`Solana Balance Fetch Error:`, error);
      return 0;
    }
  };
  
  const fetchBalanceTron = async (walletAddress) => {
    try {
      const tronInstance = new tronWeb({
        fullHost: 'https://api.shasta.trongrid.io',
      });
      const balance = await tronInstance.trx.getBalance(walletAddress);
      return balance / 1e6;
    } catch (error) {
      console.error(`Tron Balance Fetch Error:`, error);
      return 0;
    }
  };


  const fetchBalance = async (tokenName, walletAddress) => {
    console.log("TOken: ", tokenName);
    const rpcDetails = rpcUrls.find((chain) => chain.name === tokenName);

    switch (tokenName.toLowerCase()) {
      case "ethereum":
        return fetchBalanceEVM(walletAddress, rpcDetails.rpcUrl, rpcDetails.decimals);
  
      case "binancecoin":
        return fetchBalanceEVM(walletAddress, rpcDetails.rpcUrl, rpcDetails.decimals);
      
      case "tether":
        return fetchBalanceEVM(walletAddress, rpcDetails.rpcUrl, rpcDetails.decimals);
  
      case "matic-network":
        return fetchBalanceEVM(walletAddress, rpcDetails.rpcUrl, rpcDetails.decimals);
  
      case "bitcoin":
        return fetchBalanceBitcoin(walletAddress);
  
      case "dogecoin":
        return fetchBalanceDogecoin(walletAddress);
  
      case "solana":
        return fetchBalanceSolana(walletAddress);
  
      case "tron":
        return fetchBalanceTron(walletAddress);
  
      default:
        console.error(`Unsupported token: ${tokenName}`);
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
        // const rpcDetails = rpcUrls.find((chain) => chain.name === tokenId);

        const bal = await fetchBalance(tokenId, walletAddress);

        setBalance(bal);
        setCategories(response.data.categories);
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Name of the token: ", tokenId);
        const address = await getAddressFromSeed(tokenId);
        setWalletAddress(address);

        if (address) {
          try {
            const txs = await fetchTransactions(address, tokenId);
            // console.log(txs);
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
      } catch (er) {
        console.log(er.message);
      }
    };

    fetchData();
  }, [address, tokenId]);

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
      <BalanceChart currency={String(tokenData.symbol).toUpperCase()} tokenImage={tokenData?.image?.small} balance={balance} balanceUSD={`$${parseFloat(balanceUsdValue).toFixed(2)}`} onSend={() => refRBSheet2.current.open()} onReceive={() => refRBSheet.current.open()} headerTitle={String(tokenData.name).toUpperCase()} header={false} />

      <Text style={styles.header}>Transactions List</Text>
      {transactions.length > 0 ? (
        transactions.map((tx, index) => {
          const transactionType = categorizeTransaction(tx, walletAddress, tokenId);
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
                  <Text style={styles.txValue}>{valueInBNB.toFixed(2)} {tokenData.symbol}</Text>
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
      <TransferSheet fromAddress={walletAddress} toAddress={address} amount={amount} refTransfer={transferSheetRef} currency={String(tokenData.symbol).toUpperCase()} />

      <View style={styles.footer}>
        <Text style={styles.tokenName}>Current {String(tokenData.symbol).toUpperCase()} Price</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.tokenPrice}>${tokenData.market_data.current_price.usd}</Text>
          <Text style={[styles.priceChange, { color: priceChange > 0.0000 ? 'green' : 'red' }]}>
            {priceChange > 0.0000 ? `+${priceChange.toFixed(2)}%` : `${priceChange.toFixed(2)}%`}
          </Text>
        </View>
      </View>

      {
        categories.length >= 1 && (
          <View style={styles.keywordsView}>
            <Text style={{ paddingHorizontal: 15, color: 'black', fontWeight: 'bold', fontSize: 16 }}>
              Keywords
              <Text>{' '}</Text>
              <FontAwesome name="chevron-right" size={16} color="black" />
            </Text>
            <ScrollView
              contentContainerStyle={[styles.footerKeywords, { flexDirection: 'row' }]}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
            >
              {categories.map((category, index) => (
                <Text
                  key={index}
                  style={{
                    backgroundColor: COLORS.darkBackground,
                    color: '#fff',
                    padding: 9,
                    margin: 10,
                    borderRadius: 5,
                  }}
                >
                  {category}
                </Text>
              ))}
            </ScrollView>
          </View>
        )
      }




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  keywordsView: {
    flex: 1,
    position: 'absolute',
    bottom: 35,
    paddingVertical: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
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

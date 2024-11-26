import * as Keychain from 'react-native-keychain';
import { ethers } from '../../custom-ether';
import tronWeb from 'tronweb';

import * as bitcoin from "bitcoinjs-lib";
import * as solanaWeb3 from "@solana/web3.js";
import { deriveKeypair, deriveAddress } from "ripple-keypairs";

// Derivation paths for each blockchain
const paths = {
  ethereum: "m/44'/60'/0'/0/0", // Ethereum path
  binance: "m/44'/60'/0'/0/0", // Same as Ethereum
  polygon: "m/44'/60'/0'/0/0", // Same as Ethereum
  bitcoin: "m/44'/0'/0'/0/0", // Bitcoin path
  dogecoin: "m/44'/3'/0'/0/0", // Dogecoin path
  tron: "m/44'/195'/0'/0/0", // Tron path
  xrp: "m/44'/144'/0'/0/0", // XRP path
  solana: "m/44'/501'/0'/0/0", // Solana path
};


const fetchPrivateKey = (mnemonic, path) => {
  const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, '', path);
  return wallet;
}

const evmWalletAddress = (mnemonic, path) => {
  const evmWallet = fetchPrivateKey(mnemonic, path);
  const evmAddress = evmWallet.address;
  return evmAddress;
}
const generateAddresses = async (mnemonic, tokenName) => {

  switch (tokenName) {
    case "tron":
      const tronWallet = fetchPrivateKey(mnemonic, paths.tron);
      const tronPrivateKeys = tronWallet.privateKey.replace(/^0x/, "");
      const tronAddress = tronWeb.address.fromPrivateKey(tronPrivateKeys);
      return tronAddress

    case "bitcoin":
      // Bitcoin
      const deriveBitcoinLikeAddress = (path, network) => {

        const bitcoinWallet = fetchPrivateKey(mnemonic, path);
        const cleanPublicKey = bitcoinWallet.publicKey.replace(/^0x/, ''); // Remove the "0x" prefix
        const pubkey = Buffer.from(cleanPublicKey, 'hex'); // Convert public key to Buffer

        const { address } = bitcoin.payments.p2pkh({ pubkey, network }); // Pass the correct network

        return address;
      };

      const bitcoinAddress = deriveBitcoinLikeAddress(paths.bitcoin, bitcoin.networks.bitcoin);
      return bitcoinAddress;

    case "dogecoin":
      const dogecoinNetwork = {
        messagePrefix: '\x19Dogecoin Signed Message:\n',
        bech32: null,
        bip32: {
          public: 0x02facafd, // Dogecoin's public key prefix
          private: 0x02fac398, // Dogecoin's private key prefix
        },
        pubKeyHash: 0x1e, // Prefix for Dogecoin's P2PKH addresses (starts with 'D')
        scriptHash: 0x16, // Prefix for Dogecoin's P2SH addresses
        wif: 0x9e, // Wallet Import Format prefix
      };

      const dogecoinAddress = deriveBitcoinLikeAddress(paths.dogecoin, dogecoinNetwork)
      return dogecoinAddress;

    case "solana":
      const generateSolanaAddress = (mnemonic, solanaPath) => {
        const solanaWallet = fetchPrivateKey(mnemonic, solanaPath);

        const solanaSeed = solanaWallet.privateKey; // Derive the key for Solana
        const solanaKeyPair = solanaWeb3.Keypair.fromSeed(Buffer.from(solanaSeed.slice(2), "hex")); // Slice off the "0x" prefix
        const solanaAddress = solanaKeyPair.publicKey.toBase58(); // Generate the address

        return solanaAddress;
      };

      const solanaAddress = generateSolanaAddress(mnemonic, paths.solana);
      return solanaAddress;

    default: {
      const evmChains = ["ethereum", "binancecoin", "matic-network", "tether"]; // Group similar cases
      if (evmChains.includes(tokenName)) {
        if(paths[tokenName] === 'binancecoin') {
          paths[tokenName] = 'binance';
        } 

        return evmWalletAddress(mnemonic, paths[tokenName]);
      }

      throw new Error(`Unsupported token here: ${tokenName}`);
    }
  }
};


export const getAddressFromSeed = (tokenName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: "recoveryData" });
      if (credentials) {
        const seedPhrase = credentials.password;
        try {

          console.log(tokenName);
          const address = await generateAddresses(seedPhrase, tokenName);
          console.log(address);
          // console.log(data);
          // return;

          // const wallet = ethers.HDNodeWallet.fromPhrase(seedPhrase);
          // console.log("Root wallet: ", wallet);

          // const wallets = ethers.HDNodeWallet.fromPhrase(seedPhrase);
          // console.log("Root wallet: ", wallets);

          // const mnemonic = wallets.mnemonic

          // const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, paths.ethereum)
          // console.log("Derived wallet: ", wallet);
          // const tronPrivateKey = derivedWallet1.privateKey.replace(/^0x/, ''); // Remove "0x"
          // const tronPrivateKey = derivedWallet1.privateKey;
          // const tronAddress = tronWeb.address.fromPrivateKey(tronPrivateKey);
          // console.log("Tron address: ", tronAddress);



          // console.log(wallets);

          // console.log(mnemonicToSeedSync(seedPhrase));
          // const seed = bip39.mnemonicToSeed(seedPhrase);
          // const path = "m/44'/0'/0'/0/0"; // Standard Bitcoin path
          // console.log(seed);

          // const wallet = ethers.Wallet.fromPhrase(seedPhrase);

          // Get the private key and derive Tron address
          // const privateKey = wallet.privateKey;
          // console.log("privateKey: ", privateKey);

          // const hdNode = ethers.Wallet;  // In v6, directly from ethers

          // console.log(hdNode);
          // const tronInstance = new tronWeb({
          //   fullHost: 'https://api.trongrid.io',
          // });

          // tronInstance.setPrivateKey(privateKey);
          // Get the tron address
          // const address = tronWeb.address.fromHex(wallet.address);
          console.log("address: ", address)
          resolve(address);
          // resolve(address);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      } else {
        
        reject("No seed phrase found");
      }
    } catch (error) {
      reject(error);
    }
  });
};
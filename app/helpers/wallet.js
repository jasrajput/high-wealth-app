import * as Keychain from 'react-native-keychain';
import { ethers } from '../../custom-ether';
import tronWeb from 'tronweb';

// const tronInstance = new tronWeb({
//   fullHost: 'https://api.trongrid.io'
// });

// console.log(tronInstance);



export const getAddressFromSeed = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = await Keychain.getGenericPassword({ service: "recoveryData" });
        if (credentials) {
          const seedPhrase = credentials.password;
  
          try {

            const wallets = ethers.HDNodeWallet.fromPhrase(seedPhrase)

            const mnemonic = wallets.mnemonic

            const path1 = "m/44'/195'/0'/0/0";

            const derivedWallet1 = ethers.HDNodeWallet.fromMnemonic(mnemonic, path1)
            console.log("Derived wallet: ", derivedWallet1);
            const tronPrivateKey = derivedWallet1.privateKey.replace(/^0x/, ''); // Remove "0x"
            // const tronPrivateKey = derivedWallet1.privateKey;
            const tronAddress = tronWeb.address.fromPrivateKey(tronPrivateKey);
            console.log("Tron address: ", tronAddress);



            // console.log(wallets);

            // console.log(mnemonicToSeedSync(seedPhrase));
            // const seed = bip39.mnemonicToSeed(seedPhrase);
            // const path = "m/44'/0'/0'/0/0"; // Standard Bitcoin path
            // console.log(seed);

            const wallet = ethers.Wallet.fromPhrase(seedPhrase);
            
            // Get the private key and derive Tron address
            const privateKey = wallet.privateKey;
            console.log("privateKey: ", privateKey);

            // const hdNode = ethers.Wallet;  // In v6, directly from ethers

            // console.log(hdNode);
            // const tronInstance = new tronWeb({
            //   fullHost: 'https://api.trongrid.io',
            // });
  
            // tronInstance.setPrivateKey(privateKey);
            // Get the tron address
            // const address = tronWeb.address.fromHex(wallet.address);
            // console.log("address: ", address)
            resolve(wallet.address);
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
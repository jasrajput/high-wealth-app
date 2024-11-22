import * as Keychain from 'react-native-keychain';
import { ethers } from '../../custom-ether';

export const getAddressFromSeed = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Retrieve the seed phrase from the Keychain
        const credentials = await Keychain.getGenericPassword({ service: "recoveryData" });
        if (credentials) {
          const seedPhrase = credentials.password;
  
          try {
            const wallet = ethers.Wallet.fromPhrase(seedPhrase);
            console.log("User Address: ", wallet.address);
            resolve(wallet.address); // Resolve with the wallet address
          } catch (error) {
            console.error(error);
            reject(error); // Reject if there's an error generating the wallet
          }
        } else {
          console.error("No seed phrase found in Keychain");
          reject("No seed phrase found"); // Reject if no credentials are found
        }
      } catch (error) {
        console.error("Error retrieving credentials:", error);
        reject(error); // Reject if there's an error with Keychain retrieval
      }
    });
  };
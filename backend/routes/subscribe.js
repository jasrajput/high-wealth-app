require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Subscription = require('../models/Subscription');
const FundTransaction = require('../models/FundTransaction'); 

const ethers = require('ethers');
const ABI = require('../abi/contract.json');
const tokenABI = require('../abi/tokenABI.json');

const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();
const tokenAddress = process.env.TOKEN_CONTRACT_ADDRESS;
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.WALLET_PRIVATE_KEY;
const walletAddress = process.env.WALLET_ADDRESS;

router.post('/subscribe', verifyToken, async (req, res) => {
    let amount = Number(req.body.amount); 

    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.deposit_wallet < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        };

        const packagesInInr = [1800, 4500, 9000, 18000, 45000, 90000, 180000];
        const packagesInUSD = [20, 50, 100, 200, 500, 1000, 2000];

        let level = packagesInInr.indexOf(amount);
        const usdAmount = packagesInUSD[level];

        

        if (level !== -1) {
            level += 1;
        } else {
            return res.status(400).json({ error: 'Invalid amount' });
        }


        console.log(level);
        console.log(amount);
        console.log(usdAmount);

        const wallet = await Wallet.findOne({ user: user._id });
        if (!wallet) {
            return res.status(400).json({ error: 'Wallet not found' });
        }

        let referralId = 6001;
        let referral_address = "";

        const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_RPC_URL);
        const signer = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const is_exist = await contract.isUserExists(wallet.address);
        if(is_exist) {
          const result = await contract.users(wallet.address);
          referral_address = result.referrer.toString();
        } else {
          if(referralId) {
            referral_address = await contract.idToAddress(referralId);
          } else {
            return res.status(500).json({ error: 'Referral Required'});
          }
        }
        
        if(referral_address == "0x0000000000000000000000000000000000000000") return res.status(500).json({ error: 'No such referral'});
        const isValid = ethers.utils.isAddress(referral_address);

        if(isValid) {
            const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            const bal = await tokenContract.balanceOf(walletAddress);
            const tokenBalance = ethers.utils.formatEther(bal);
 
            const gasPrice = await provider.getGasPrice();
            const gasLimit = await contract.estimateGas.buyNewLevelFor(wallet.address, referral_address, level, 1);

            if (parseFloat(tokenBalance) >= parseFloat(usdAmount)) {
                  
                  const buyTx = await contract.buyNewLevelFor(wallet.address, referral_address, level, 1, {
                    gasLimit: gasLimit,
                    gasPrice: gasPrice,
                  });
        
                  console.log('Transaction sent:', buyTx.hash);
                  const receipt = await buyTx.wait();
                  console.log('Transaction was mined:', receipt);

                  if (receipt.status === 1) {
                    user.deposit_wallet -= amount;
                    user.isSubscribed = 1;

                    const subscription = new Subscription({
                        user_id: user._id,
                        amount_token: usdAmount,
                        amount_inr: amount,
                        txn_id: buyTx.hash
                    });

                    const transactionHistory = new FundTransaction({
                        user_id: user._id,
                        debit: amount,
                        particular: `Subscribed with ${usdAmount} tokens worth ${amount}`,
                        direction: 2
                    });

                    await user.save();
                    await subscription.save();
                    await transactionHistory.save();

                    res.status(200).json({
                        message: 'Subscription successful',
                        transactionHash: buyTx.hash,
                        // receipt,
                    });
                  } else {
                    res.status(500).json({ error: 'Txn failed'});
                  }
            } else {
                res.status(500).json({ error: 'Insufficient balance for authority' });
            }
        } else {
            res.status(500).json({ error: 'Already subscribed' });
        }
    } catch (error) {
        console.error('Error in sending transaction:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
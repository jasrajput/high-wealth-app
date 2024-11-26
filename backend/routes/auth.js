const express = require('express');
const User = require('../models/User');
const Bank = require('../models/Bank');
const { generateUniqueCode, validateRefCode, insertLevels } = require('../helpers/user');
const { validateUserRegistration, validateBankDetails, handleValidationErrors } = require('../middlewares/validation');
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const FundTransaction = require('../models/FundTransaction');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const Level = require('../models/Level');

const router = express.Router();

// Register
router.post('/register', validateUserRegistration, handleValidationErrors, async (req, res) => {
  const { name, email, ref_code, walletAddress } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User({ name, email, walletAddress });

    if (ref_code) {
      const referrer = await validateRefCode(ref_code);

      if (referrer) {
        user.real_sponsor_id = referrer.user_id;
      } else {
        return res.status(400).json({ error: 'Invalid referral code' });
      }
    } else {
      const firstUser = await User.findOne().sort({ _id: 1 });

      if (firstUser) {
        user.real_sponsor_id = firstUser.user_id;
      } else {
        user.real_sponsor_id = null;
      }
    }

    user.user_id = await generateUniqueCode();
    await user.save();

    const wallet = new Wallet({
      user: user._id
    })

    await wallet.save();

    await insertLevels(user.real_sponsor_id, user._id);

    const tokenData = generateToken(user);

    res.json({
      token: tokenData.token,
      expiresIn: tokenData.expiresIn
    });
  } catch (error) {
    if (error.code === 11000 && error.keyValue.walletAddress) {
      return res.status(500).json({ error: 'Wallet address must be unique' });
    } else {
      res.status(500).json({
        error: error.message
      });
    }
  }
});


// Claim Credit
router.post('/claim-credit', verifyToken, async (req, res) => {
  try {
    // req.user will contain the decoded token data (e.g., userId)
    const userId = req.user.userId;

    // Fetch user data from the database using the userId from the token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isClaimed = 1;
    user.save();

    res.status(200).json({
      status: true,
      message: 'Claimed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { walletAddress } = req.body;

  try {
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const tokenData = generateToken(user);
    res.status(200).json({
      token: tokenData.token,
      expiresIn: tokenData.expiresIn,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// User Details
router.get('/me', verifyToken, async (req, res) => {
  try {
    // req.user will contain the decoded token data (e.g., userId)
    const userId = req.user.userId;

    // Fetch user data from the database using the userId from the token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let wallet = await Wallet.findOne({ user: user._id });
    if (wallet) {
      wallet = {
        bot_com: wallet.bot_com,
        level_com: wallet.level_com,
        withdraw_wallet: wallet.withdraw_wallet,
      }
    }


    const totalReferrals = await User.countDocuments({ real_sponsor_id: user.user_id });
    const totalDownline = await Level.countDocuments({ to_id: user._id });

    const totalRewards = await Transaction.aggregate([
      { $match: { user_id: user._id } },
      { $group: { _id: null, totalCredit: { $sum: "$credit" } } }
    ]);

    const totalCredit = totalRewards.length > 0 ? totalRewards[0].totalCredit : 0;

    const transactions = await Transaction.aggregate([
      {
        $match: {
          user_id: user._id,
          direction: 111,
        },
      },
      {
        $group: {
          _id: "$level", // Group by level
          totalCredit: { $sum: "$credit" }, // Sum the credit for each level
        },
      },
      {
        $sort: { _id: 1 }, // Sort by level (optional)
      },
    ]);


    const dailyTotalEarnings = await Transaction.aggregate([
      {
        $match: {
          user_id: user._id,
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
            $lt: new Date(new Date().setHours(23, 59, 59, 999)), // End of today
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCredit: { $sum: "$credit" },
        },
      },
    ]);

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // Start of the month
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999); // End of the month

    const monthlyTotal = await Transaction.aggregate([
      {
        $match: {
          user_id: user._id, // Filter by user_id
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCredit: { $sum: "$credit" },
        },
      },
    ]);

    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      user_id: user.user_id,
      real_sponsor_id: user.real_sponsor_id,
      wallet: user.address,
      isClaimed: user.isClaimed,
      wallet,
      transactions: transactions,
      totalReferrals,
      totalDownline,
      totalCredit,
      dailyEarnings: dailyTotalEarnings[0]?.totalCredit || 0,
      monthlyEarnings: monthlyTotal[0]?.totalCredit || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Bonus Details
router.get('/bonus-history', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions = await Transaction.find({ user_id: userId }).sort({ createdAt: -1 });
    res.status(200).json({
      // bonus_history: transactions.map(tx => ({
      //   credit: tx.credit,
      //   debit: tx.debit,
      //   description: tx.description,
      //   direction: tx.direction,
      //   date: tx.createdAt,
      //   from_id: tx.from_id,
      //   level: tx.level
      // }))

       transactions
    });
  } catch (error) {
    console.error('Error fetching bonus history:', error);
    res.status(500).json({ error: error.message });
  }
});



// Transfer P2p
router.post('/transfer', verifyToken, async (req, res) => {
  const { amount, partner } = req.body;

  try {
    const userId = req.user.userId;

    const sender = await User.findById(userId);
    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    // Check if sender is trying to transfer to themselves
    if (sender.phoneNumber === partner) {
      return res.status(400).json({ error: 'Self-transfer is not allowed' });
    }

    const recipient = await User.findOne({ phoneNumber: partner });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Check if sender has enough balance in deposit_wallet
    if (sender.deposit_wallet < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Update sender's balance (debit)
    sender.deposit_wallet -= amount;
    await sender.save();

    // Update recipient's balance (credit)
    recipient.deposit_wallet += amount;
    await recipient.save();

    // Create transaction history for sender (debit)
    const senderTransaction = new FundTransaction({
      user_id: sender._id,
      debit: amount,
      particular: `P2P transfer to ${recipient.phoneNumber}`,
      direction: 3
    });
    await senderTransaction.save();

    // Create transaction history for recipient (credit)
    const recipientTransaction = new FundTransaction({
      user_id: recipient._id,
      credit: amount,
      particular: `Received from ${sender.phoneNumber}`,
      direction: 3
    });
    await recipientTransaction.save();

    // Send success response
    res.status(200).json({ message: 'Transfer successful' });

  } catch (error) {
    console.error('Error during transfer:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


router.put('/add-bank', verifyToken, validateBankDetails, handleValidationErrors, async (req, res) => {
  const { full_name, bank_name, account_no, ifsc_code, branch, state, city } = req.body;

  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newBank = new Bank({
      user_id: userId,
      full_name,
      bank_name,
      account_no,
      ifsc_code,
      branch,
      state,
      city,
    });

    await newBank.save();

    res.status(200).json({ message: 'Bank Added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/bank-details', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bankDetails = await Bank.find({ user_id: user._id });

    res.status(200).json({
      bankDetails
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;

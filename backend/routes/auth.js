const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Bank = require('../models/Bank');
const { generateUniqueCode, validateRefCode } = require('../helpers/user');
const { validateUserRegistration, validateBankDetails, handleValidationErrors } = require('../middlewares/validation');
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const FundTransaction = require('../models/FundTransaction');

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
        user.ref_code = referrer.invite_code;
      } else {
        return res.status(400).json({ error: 'Invalid referral code' });
      }
    } else {
      const firstUser = await User.findOne().sort({ _id: 1 });

      if (firstUser) {
        user.ref_code = firstUser.invite_code;
      } else {
        user.ref_code = '0';
      }
    }

    user.invite_code = await generateUniqueCode();
    await user.save();

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


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
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

    // Return user data (excluding sensitive information)
    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      invite_code: user.invite_code,
      ref_code: user.ref_code,
      wallet: user.address
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
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

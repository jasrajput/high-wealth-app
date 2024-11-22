require('dotenv').config();
const express = require('express');
const { Cashfree } = require('cashfree-pg');
const User = require('../models/User');
const { verifyToken } = require('../middlewares/authMiddleware');
const Order = require('../models/Order'); 
const FundTransferDetails = require('../models/FundTransfer'); 
const FundTransaction = require('../models/FundTransaction'); 
const { generateUniqueOrderId } = require('../helpers/order');

const router = express.Router();

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION' ? Cashfree.Environment.PRODUCTION : Cashfree.Environment.SANDBOX;

const BASE_URL = process.env.BASE_URL;

router.post('/create', verifyToken, async (req, res) => {
  const { orderAmount } = req.body;

  // Validate input
  if (!orderAmount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (orderAmount < 100) {
    return res.status(400).json({ error: 'Minimum top up is Rs.100' });
  }

  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const cryptoAmt = parseFloat(orderAmount / 90).toFixed(2);
  const orderId = String(await generateUniqueOrderId());

  var request = {
    order_id: orderId,
    order_amount: orderAmount,
    order_currency: 'INR',
    customer_details: {
      customer_id: user._id,
      customer_name: user.name,
      customer_email: user.email,
      customer_phone: user.phoneNumber,
    },
    order_meta: {
      return_url: BASE_URL + `/api/orders/success?order_id=${orderId}`,
    },
    order_note: `Payment for user ${userId} on orderId ${orderId}`,
    order_tags: {
      method: 'topup',
      cryptoAmount: cryptoAmt
    }
  };

  try {
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    const { payment_session_id } = response.data;

    res.status(200).json({ 'payment_link': BASE_URL + `/api/checkout/${payment_session_id}` });
  } catch (error) {
    console.error('Error setting up order request:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


router.get('/success', async (req, res) => {
  const orderId = req.query.order_id;

  if (!orderId) {
    return res.status(400).send('Missing order_id in query parameters');
  }

  try {
    const orderDetails = await Cashfree.PGFetchOrder('2023-08-01', orderId);
    console.log(orderDetails.data);

    if (orderDetails) {
      res.render('success', { orderDetails: orderDetails.data });
    } else {
      res.status(500).send('Error fetching order details');
    }
  } catch (error) {
    console.error('Error fetching order:', error.message);
    res.status(500).send('Error fetching order from Cashfree');
  }
});

router.post('/webhook', async function (req, res) {
  try {
      const signature = req.headers["x-webhook-signature"];
      const rawBody = req.rawBody;
      const timestamp = req.headers["x-webhook-timestamp"];

      const isVerified = Cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);

      if (!isVerified) {
          return res.status(400).send("Invalid signature");
      }

      // Handle the webhook payload
      const webhookData = req.body; 
      const paymentStatus = webhookData.data.payment.payment_status;
      const paymentId = webhookData.data.payment.cf_payment_id;
      const paymentMethod = webhookData.data.payment.payment_group;

      const orderId = webhookData.data.order.order_id;
      const orderAmount = webhookData.data.order.order_amount.toString();
      const orderTags = webhookData.data.order.order_tags || {};
      const orderMethod = orderTags.method || 'unknown';
      const cryptoAmount = orderTags.cryptoAmount ? orderTags.cryptoAmount.toString() : '0';
      const userId = webhookData.data.customer_details.customer_id;

      const networkFees = orderAmount * 2.5 / 100;
      const gatewayFees = orderAmount * 2.5 / 100;
      const netOrderAmount = orderAmount - networkFees - gatewayFees;
      const netCryptoAmount = orderAmount - networkFees - gatewayFees;

      if(paymentStatus === 'SUCCESS') {
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).send({
              error: "User not found"
            });
          }

          const newOrder = new Order({
            userId: user._id,
            orderId: orderId,
            amount: netOrderAmount,
            cryptoAmount: netCryptoAmount,
            paymentStatus: paymentStatus,
            paymentId: paymentId,
            paymentMethod: paymentMethod,
            orderMethod: orderMethod
          });

          if (user.deposit_wallet) {
            user.deposit_wallet = user.deposit_wallet + parseFloat(netOrderAmount);
          } else {
            user.deposit_wallet = parseFloat(netOrderAmount);
          }

          const fundHistory = new FundTransferDetails({
            user_id: user._id,
            fund: orderAmount,
            remarks: `Received ${cryptoAmount} tokens worth ${orderAmount}`,
            transfer_by: 'Gateway'
          })

          const transactionHistory = new FundTransaction({
            user_id: user._id,
            credit: orderAmount,
            particular: `Received ${cryptoAmount} tokens worth ${orderAmount}`,
            direction: 1
          })

          await newOrder.save();
          await user.save();
          await fundHistory.save();
          await transactionHistory.save();

          res.status(200).send({
            message: "Order successful",
            orderId: newOrder._id
          });
      } else {
        res.status(200).send({
          message: "Payment not successful",
          paymentStatus: paymentStatus
        });
      }
  } catch (err) {
      console.log("Error in webhook:", err.message);
      res.status(500).send({
        error: err.message
      });
  }
});

router.get('/order-history', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(userId);
    const fundSummmary = await FundTransaction.find({user_id: userId}).sort({ createdAt: -1 });
    res.status(200).json({ fundSummmary });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
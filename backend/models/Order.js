const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: String, required: true }, // Cashfree order ID
  amount: { type: Number, default: 0, required: true },
  cryptoAmount: { type: Number, default: 0, required: true },
  paymentStatus: { type: String, default: 'PENDING' }, // SUCCESS, FAILED
  paymentId: { type: String }, // Cashfree Payment ID
  paymentMethod: { type: String }, // Payment method (e.g., net_banking, UPI)
  orderMethod: { type: String, required: true }, // e.g., topup, other methods
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
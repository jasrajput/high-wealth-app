const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount_token: { type: Number, required: true, default: 0 },
    amount_inr: { type: Number, required: true, default: 0 },
    txn_id: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);

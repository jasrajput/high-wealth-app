const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    invite_code: { type: String, required: true, unique: true },
    ref_code: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    walletAddress: { type: String, required: true, unique: true }
    // phoneNumber: { type: String, required: true },
    // password: { type: String, required: true },
    // deposit_wallet: { type: Number, default: 0, required: true },
    // withdraw_wallet: { type: Number, default: 0, required: true },
    // isSubscribed: { type: Number, default: 0, required: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
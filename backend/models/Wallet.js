const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    direct_com: { type: Number, default: 0, required: true },
    level_com: { type: Number, default: 0, required: true },
    bot_com: { type: Number, default: 0, required: true },
    withdraw_wallet: { type: Number, default: 0, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    direct_com: { type: Number, default: 0 },
    level_com: { type: Number, default: 0 },
    bot_com: { type: Number, default: 0 },
    withdraw_wallet: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);
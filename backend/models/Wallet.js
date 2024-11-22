const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    encryptedPrivateKey: { type: String, required: true },
    salt: { type: String, required: true },
    iv: { type: String, required: true },
    authTag: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);
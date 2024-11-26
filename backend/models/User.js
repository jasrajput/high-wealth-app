const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: String, required: true, unique: true },
    real_sponsor_id: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    walletAddress: { type: String, required: true, unique: true },
    isClaimed: { type: Number, default: 0, required: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
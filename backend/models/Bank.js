const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    full_name: { type: String, required: true },
    bank_name: { type: String, required: true },
    account_no: { type: Number, required: true, default: 0, unique: true },
    ifsc_code: { type: String, required: true },
    branch: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    
}, { timestamps: true });

module.exports = mongoose.model('Bank', bankSchema);

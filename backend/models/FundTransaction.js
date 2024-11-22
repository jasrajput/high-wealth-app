const mongoose = require('mongoose');
const fundTransactionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    credit: { type: Number, default: 0, required: false },
    debit: { type: Number, default: 0, required: false },
    particular: { type: String, required: true },
    direction: { type: Number, min: 0, max: 10, required: true },
}, { timestamps: true });

module.exports = mongoose.model('FundTransaction', fundTransactionSchema);

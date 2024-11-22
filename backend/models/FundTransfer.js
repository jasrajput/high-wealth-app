const mongoose = require('mongoose');
const fundTransferDetailsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fund: { type: Number, required: true, default: 0, required: true },
    remarks: { type: String, required: true },
    transfer_by: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FundTransferDetails', fundTransferDetailsSchema);

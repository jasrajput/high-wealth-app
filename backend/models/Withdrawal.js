const withdrawalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    pending_balance: { type: mongoose.Schema.Types.Decimal128, required: true },
    date_of_withdrawal: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Withdrawal', withdrawalSchema);

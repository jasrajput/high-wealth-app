const { check, validationResult } = require('express-validator');

// Validation middleware for user registration
const validateUserRegistration = [
    check('name', 'Name is required').not().isEmpty(),    
    check('email', 'Please include a valid email').isEmail(),
    check('walletAddress', 'Wallet address is required').not().isEmpty(),
];


// Validation middleware for bank
const validateBankDetails = [
    check('full_name').notEmpty().withMessage('Full name is required'),
    check('bank_name').notEmpty().withMessage('Bank name is required'),
    check('account_no')
        .isNumeric().withMessage('Account number must be a numeric value')
        .notEmpty().withMessage('Account number is required'),
    check('ifsc_code').notEmpty().withMessage('IFSC code is required'),
    check('branch').notEmpty().withMessage('Branch is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('city').notEmpty().withMessage('City is required'),
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};



module.exports = { validateUserRegistration, validateBankDetails, handleValidationErrors };

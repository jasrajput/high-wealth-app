const crypto = require('crypto');
const User = require('../models/User');

// Function to generate a unique invite code
const generateUniqueCode = async () => {
    const codeLength = 10;
    let inviteCode;

    do {
        inviteCode = crypto.randomBytes(codeLength / 2).toString('hex').toUpperCase(); // Generate hex code
    } while (await User.findOne({ invite_code: inviteCode })); // Check for uniqueness

    return inviteCode;
};

// Function to validate a ref_code
const validateRefCode = async (ref_code) => {
    return await User.findOne({ invite_code: ref_code });
};

module.exports = {
    generateUniqueCode,
    validateRefCode,
};
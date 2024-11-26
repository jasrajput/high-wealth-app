const crypto = require('crypto');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Level = require('../models/Level');
const Transaction = require('../models/Transaction');


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

const insertLevels = async (sponsorId, userId) => {
    let parentId = sponsorId;
    let userLevel = 1;

    while (parentId != 0 && userLevel <= 50) {
        const user = await User.findOne({ invite_code: parentId });

        if (!user) {
            break;
        }

        const sponsorId = user._id;
        const newSponsor = user.invite_code;

        await Level.create({
            from_id: userId,
            to_id: sponsorId,
            level: userLevel,
        });

        parentId = newSponsor;
        userLevel++;
    }
};

const distributionBotCommission = async () => {
    try {
        // Fetch all users
        const users = await User.find({}); // Add filters if needed

        // Loop through each user
        for (const user of users) {
            const roi = 1000 * 0.03;

            // Fetch user's wallet
            const userWallet = await Wallet.findOne({ user: user._id });

            if (!userWallet) {
                console.log(`Wallet not found for user ${user._id}`);
                continue;
            }

            // Update wallet balances
            await userWallet.updateOne({
                $inc: {
                    withdraw_wallet: roi,
                    bot_com: roi,
                },
            });

            // Add a new transaction record
            await Transaction.create({
                credit: roi,
                user_id: user._id,
                description: `Daily commission $${roi} credited`,
                direction: 7,
            });


            await distributeLevelIncome(user.ref_code, user._id, roi);

            console.log(`Processed ROI for user ${user._id}: $${roi}`);
        }
    } catch (error) {
        console.error('Error processing user ROI:', error);
    }
};


const distributeLevelIncome = async (sponsorId, userId, amount) => {
    let userLevel = 1;
    let i = 0;
    let parentId = sponsorId;
    const percentage = [25, 20, 15, 10, 8, 7, 6, 5, 3, 1];

    while (userLevel <= 10 && parentId !== null) {
        const sponsor = await User.findOne({ invite_code: parentId });

        if (!sponsor) {
            break;
        }

        const { _id: realId, invite: commSponsorId } = sponsor;
        const upComs = (amount * percentage[i]) / 100;

        if (upComs > 0.0) {
            const directIncTra = 111;
            const description = `Level Income from ${userId} of level ${userLevel}`;

            // Create a transaction
            await Transaction.create({
                credit: upComs,
                direction: directIncTra,
                user_id: realId,
                description: description,
                from_id: userId,
                level: userLevel
            });

            const userWallet = await Wallet.findOne({ user: realId });
            if (userWallet) {
                await userWallet.updateOne({
                    $inc: {
                        level_com: upComs,
                        withdraw_wallet: upComs,
                    },
                });
            }
        }

        parentId = commSponsorId;
        userLevel++;
        i++;
    }
};


module.exports = {
    generateUniqueCode,
    validateRefCode,
    insertLevels,
    distributeLevelIncome,
    distributionBotCommission
};
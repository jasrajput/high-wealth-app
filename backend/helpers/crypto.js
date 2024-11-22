const crypto = require('crypto');
const { randomBytes } = crypto;
const argon2 = require('argon2');

// Encrypt private key with user password
async function encryptPrivateKey(privateKey, password) {
    const salt = randomBytes(16);
    const iv = randomBytes(12);

    // Derive a 256-bit key from the password using PBKDF2
    const derivedKey = await new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, 32, 'sha256', (err, key) => {
            if (err) return reject(err);
            resolve(key);
        });
    });

    const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, iv);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    return {
        encryptedPrivateKey: encrypted,
        salt: salt.toString('hex'),
        iv: iv.toString('hex'),
        authTag: authTag
    };
}

// Decrypt the private key with a password
async function decryptPrivateKey(encryptedData, password) {
    const { encryptedPrivateKey, salt, iv, authTag } = encryptedData;

    // Derive the same key from the password and salt
    const derivedKey = await new Promise((resolve, reject) => {
        crypto.pbkdf2(Buffer.from(password), Buffer.from(salt, 'hex'), 100000, 32, 'sha256', (err, key) => {
            if (err) return reject(err);
            resolve(key);
        });
    });

    const decipher = crypto.createDecipheriv('aes-256-gcm', derivedKey, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(encryptedPrivateKey, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


module.exports = { encryptPrivateKey, decryptPrivateKey };

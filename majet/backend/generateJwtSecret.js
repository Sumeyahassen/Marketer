const crypto = require('crypto');

// Generate a strong 64-byte random secret (512 bits – very secure)
const secret = crypto.randomBytes(64).toString('hex');

console.log('Your strong JWT_SECRET:');
console.log(secret);
console.log('\nCopy this and paste into your .env file as JWT_SECRET=');
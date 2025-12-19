const bcrypt = require('bcrypt');

// This is your desired password
const plainPassword = 'admin123';

bcrypt.hash(plainPassword, 10)
  .then(hash => {
    console.log('COPY THIS FULL HASH:');
    console.log(hash);
  })
  .catch(err => console.error(err));
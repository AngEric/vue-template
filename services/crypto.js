const crypto = require('crypto');
const SALT_LENGTH = 32;

module.exports = {
  generateSalt: () => {
    return crypto.randomBytes(Math.ceil(SALT_LENGTH/2))
      .toString('hex'
      .slice(0, SALT_LENGTH));
  },
  hash: (password, salt) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
  },
};
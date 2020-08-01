const database = require('../models');
const crypto = require('../services/crypto');
const validator = require('../services/validator');
const {PASSWORD_MIN_LENGTH} = require('../config/constants');
module.exports = {
  create: async (req, res) => {
    try {
      const {email, password, name} = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({status: 'error', message: 'Name, Email & Password are required.'});
      }

      if (!validator.validateEmail(email)) {
        return res.status(400).json({status: 'error', message: 'Invalid email format.'});
      }
      
      if (password.toString().length < PASSWORD_MIN_LENGTH) {
        return res.status(400).json({status: 'error', message: `Min password length is ${PASSWORD_MIN_LENGTH}`});
      }

      const existingUser = await database.adminUser.findOne({where: {email: email}});
      if (existingUser) {
        return res.status(400).json({status: 'error', message: 'This email is already used.'});
      }
      
      const salt = crypto.generateSalt();
      const hashedPassword = crypto.hash(password.toString(), salt);

      const user = {
        name: name,
        email: email,
        password: hashedPassword,
        salt: salt,
        status: 1,
      };
      
      await database.adminUser.create(user);
      return res.json({status: 'ok', message: 'New user succesfully created.'});
    } catch (err) {
      console.log(err);
      return res.status(500).json({status: 'error', message: err.message});
    }
  },
};
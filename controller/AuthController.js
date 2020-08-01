const jwt = require('jsonwebtoken');
const crypto = require('../services/crypto');
const database = require('../models');

module.exports = {
  login: async (req, res) => {
    try {
      const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log(ipAddress);
      const {email, password} = req.body;

      if (!email || !password) {
        return res.status(400).json({status: 'error', message: 'Email & Password are required to login.'});
      }

      const existingUser = await database.adminUser.findOne({where: {email: email}});
      if (!existingUser) {
        return res.status(400).json({status: 'error', message: 'There is no account under this email.'});
      }

      if (existingUser.status === 0) {
        return res.status(400).json({status: 'error', message: 'Your account is disabled. Please contact system administrator to enable your account.'});
      }

      const hashedPassword = crypto.hash(password.toString(), existingUser.salt);
      if (hashedPassword !== existingUser.password) {
        return res.status(400).json({status: 'error', message: 'Password is invalid.'});
      }

      const user = {
        name: existingUser.name,
        email: existingUser.email,
      };

      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        issuer: process.env.JWT_ISSUER,
      });

      return res.json({status: 'ok', data: {token}});
    } catch (err) {
      console.error(err);
      return res.status(500).json({status: 'error', message: 'Something is wrong, unable to login.'});
    }
  },
};
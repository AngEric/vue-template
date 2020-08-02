const database = require('../models');

module.exports = {
  list: async (req, res) => {
    try {
      const result = await database.permission.findAll();
      return res.json({status: 'ok', data: result});
    } catch (err) {
      return res.status(500).json({status: 'error', message: 'Something is wrong. Cannot get permisison list.'})
    }
  },
};
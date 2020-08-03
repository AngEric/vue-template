const { find, isEqual } = require('lodash');
const database = require('../models');
const converter = require('../services/converter');

module.exports = {
  list: async (req, res) => {
    try {
      const result = await database.role.getAllData();
      return res.json({status: 'ok', data: result});
    } catch (err) {
      console.error(err);
      return res.status(500).json({status: 'error', message: 'Something is wrong. Cannot get role list.'})
    }
  },
  create: async (req, res) => {
    try {
      const { name, permissions } = req.body;
      if (!name || !permissions) {
        return res.status(400).json({status: 'error', message: 'Name & Permission(s) are required.'});
      }

      if (permissions.length === 0) {
        return res.status(400).json({status: 'error', message: 'You need at least 1 permission.'});
      }

      const existingData = await database.role.findAll();
      const roleSameName = find(existingData, (r) => r.name.toUpperCase() === name.toUpperCase());
      if (roleSameName) {
        return res.status(400).json({status: 'error', message: `Role with '${name}' name already exists.`});
      }

      const roleSamePermissions = find(existingData, (r) => r.permissions.sort().join(',') === permissions.sort().join(','));
      if (roleSamePermissions) {
        return res.status(400).json({status: 'error', message: `Role '${roleSamePermissions.name}' already has same permission(s).`});
      }

      const param = {
        name: converter.toTitleCase(name),
        permissions,
        status: 1, // default status 1 (active)
      };
      await database.role.create(param); 

      const result = await database.role.getAllData();
      return res.json({status: 'ok', data: result, message: 'New role successfully created.'});
    } catch (err) {
      console.error(err);
      return res.status(500).json({status: 'error', message: 'Something is wrong. Cannot create new role.'})
    }
  },
};
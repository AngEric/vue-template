const projectPackage = require('../package.json');

module.exports = {
  checkStatus: (req, res) => {
    return res.json({status: 'ok', version: projectPackage.version});
  },
};
module.exports = {
  validateUpdateStatus: (req, res, next) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({status: 'error', message: 'Invalid request'});
    }
    next();
  },
};

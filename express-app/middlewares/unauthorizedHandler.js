module.exports = function unauthorizedHandler(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return next();
};

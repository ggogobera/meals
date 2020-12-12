module.exports = function errorHandler(err, req, res, next) {
  if (err) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  return next();
};

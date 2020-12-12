const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserSession = require('../models/UserSession');
const safeUser = require('../utils/safeUser');
const tokenSecret = process.env.JWT_SECRET;

module.exports = function authenticate(req, res, next) {
  req.user = null;

  const { token } = req.cookies;

  const clearCookieAndNext = () => {
    res.clearCookie('token');
    next();
  };

  if (!token) {
    return clearCookieAndNext();
  }

  try {
    jwt.verify(token, tokenSecret, async (err, decodedToken) => {
      if (err) {
        return clearCookieAndNext();
      }

      const session = await UserSession.findOne({ sid: decodedToken.sid });

      if (!session) {
        return clearCookieAndNext();
      }

      const user = await User.findById(session.user._id);

      if (!user) {
        return clearCookieAndNext();
      }

      req.session.payload = session;
      req.user = safeUser(user);

      next();
    });
  } catch (e) {
    next(e);
  }
};

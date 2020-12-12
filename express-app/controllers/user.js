const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const { pick } = require('ramda');

const User = require('../models/User');
const UserSession = require('../models/UserSession');
const userCredentialsValidation = require('../utils/userCredentialsValidation');
const userUpdateValidation = require('../utils/userUpdateValidation');
const safeUser = require('../utils/safeUser');
const { ROLES } = require('../constants');
const tokenSecret = process.env.JWT_SECRET;

function attachSession(user) {
  const sessionId = uuid();
  const sessionUser = pick(['_id', 'role'])(user);
  const claims = { sid: sessionId, user: sessionUser };
  const signedToken = jwt.sign(claims, tokenSecret, { expiresIn: '1h' });

  return new Promise((resolve, reject) => {
    new UserSession({ sid: sessionId, user: sessionUser })
      .save()
      .then(() => resolve(signedToken))
      .catch(reject);
  });
}

exports.register = async (req, res, next) => {
  try {
    const { userName, fullName, email, password, role } = req.body;
    const { isValid, errors } = userCredentialsValidation({
      userName: true,
      email: true,
      password: true,
      confirmPassword: true
    })(req.body);

    if (!isValid) {
      res.status(400).json({ message: errors });
    } else {
      const users = await User.find({ userName });

      if (users.length > 0) {
        res.status(400).json({ message: 'Username is already taken' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ userName, email, fullName, hashedPassword, role });

        await user.save();

        attachSession(user).then(signedToken => {
          res
            .status(201)
            .cookie('token', signedToken, { maxAge: 1000 * 60 * 60 })
            .json({ message: 'Success', data: safeUser(user) });
        });
      }
    }
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (passwordMatch) {
      attachSession(user).then(signedToken => {
        res
          .status(200)
          .cookie('token', signedToken, { maxAge: 1000 * 60 * 60 })
          .json({ message: 'Success', data: safeUser(user) });
      });
    } else {
      res.status(400).json({ message: 'Wrong password' });
    }
  } catch (e) {
    next(e);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await UserSession.findOneAndDelete({ sid: req.session.payload.sid });

    req.session.destroy(e => {
      if (e) {
        return next(e);
      }

      res
        .status(200)
        .clearCookie('token')
        .json({ message: 'Success' });
    });
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { userName, fullName, email, password, role } = req.body;
    const { isValid, message } = userCredentialsValidation({
      userName: true,
      email: true,
      password: true,
      role: true
    })(req.body);

    if (!isValid) {
      res.status(400).json({ message });
    } else {
      const users = await User.find({ userName });

      if (users.length > 0) {
        res.status(400).json({ message: 'User already exists' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ userName, email, fullName, role, hashedPassword });

        await user
          .save()
          .then(newUser => {
            res.status(201).json({ message: 'Success', data: safeUser(newUser) });
          })
          .catch(e => next(e));
      }
    }
  } catch (e) {
    next(e);
  }
};

exports.read = async (req, res, next) => {
  try {
    const { id } = req.query;
    const users = await User.find(id ? { _id: id } : undefined);

    const safeUsers = users.map(user => safeUser(user));

    res.status(200).json({ message: 'Success', data: safeUsers });
  } catch (e) {
    next(e);
  }
};

exports.readByToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({ message: 'Success', data: safeUser(user) });
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  if (req.user.role === 'regular' && req.user._id.toString() !== req.body.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const roles = [ROLES.Regular, ROLES.Moderator, ROLES.Admin];

  if (req.body.role && !roles.includes(req.body.role)) {
    return res.status(400).json({ message: 'Invalid role. Valid [regular, moderator, admin]' });
  }

  if (req.body.role && roles.indexOf(req.body.role) > roles.indexOf(req.user.role) && req.user.role === ROLES.Regular) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID type is not ObjectId type' });
    }

    const update = pick(['userName', 'email', 'dailyCaloriesTarget', 'fullName', 'role', 'password'])(req.body);

    const { isValid, message } = userUpdateValidation(update);

    if (!isValid) {
      res.status(400).json({ message });
    } else {
      const users = await User.find({ userName: req.body.userName });
      const foundUser = users.length && users[0];

      if (foundUser && foundUser._id.toString() !== req.body.id) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      if (update.password) {
        update.hashedPassword = await bcrypt.hash(update.password, 10);
        delete update['password'];
      }

      const user = await User.findByIdAndUpdate(id, update, { omitUndefined: true, new: true });

      if (!user) {
        return res.status(400).json({ message: 'User not found by id' });
      }

      res.status(200).json({ message: 'Success', data: safeUser(user) });
    }
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
      return res.status(400).json({ message: 'ID type is not ObjectId type' });
    }

    const roles = [ROLES.Regular, ROLES.Moderator, ROLES.Admin];

    if (![ROLES.Admin, ROLES.Moderator].includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (req.body.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'User is forbidden to delete self' });
    }

    const user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === ROLES.Admin && req.user.role === ROLES.Moderator) {
      return res.status(403).json({ message: 'Moderator can not delete admin' });
    }

    await user.remove();

    res.status(200).json({ message: 'Success' });
  } catch (e) {
    next(e);
  }
};

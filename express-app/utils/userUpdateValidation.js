const { ROLES } = require('../constants');
const isValidEmail = require('./isValidEmail');
const isAlphanumeric = require('./isAlphanumeric');

module.exports = function userUpdateValidation({ userName, email, dailyCaloriesTarget, role }) {
  let isValid = true;

  return {
    isValid,
    message: {
      userName: userNameValidation(),
      email: emailValidation(),
      dailyCaloriesTarget: dailyCaloriesTargetValidation(),
      role: roleValidation()
    }
  };

  function userNameValidation() {
    if (!userName || !isAlphanumeric(userName)) {
      isValid = false;
    }

    return !userName ? 'Required' : !isAlphanumeric(userName) ? 'Username must be alphanumeric' : '';
  }

  function emailValidation() {
    if (email && !isValidEmail(email)) {
      isValid = false;
      return 'Email is invalid';
    }

    return '';
  }

  function dailyCaloriesTargetValidation() {
    if (dailyCaloriesTarget !== undefined && dailyCaloriesTarget < 1) {
      isValid = false;
      return 'Daily calories target must be greater than zero';
    }

    return '';
  }

  function roleValidation() {
    if (role && ![ROLES.Admin, ROLES.Moderator, ROLES.Regular].includes(role)) {
      isValid = false;
      return 'Role must be admin, moderator or regular';
    }

    return '';
  }
};

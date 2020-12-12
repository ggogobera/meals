const { ROLES } = require('../constants');
const isAlphanumeric = require('./isAlphanumeric');
const isValidEmail = require('./isValidEmail');

const userCredentialsValidation = validate => ({ userName, email, role, password, confirmPassword }) => {
  let isValid = true;

  const errors = {
    userName: validate.userName && userNameValidation(userName),
    email: validate.email && emailValidation(email),
    role: validate.role && roleValidation(role),
    password: validate.password && passwordValidation(password),
    confirmPassword: validate.confirmPassword && confirmPasswordValidation(password, confirmPassword)
  };

  return { isValid, errors };

  function userNameValidation(userName) {
    let errorMsg = '';

    if (!isAlphanumeric(userName)) errorMsg = 'Username must be alpha-numeric [a-z, A-Z, 0-9]';

    if (!userName) errorMsg = 'Required';

    isValid = isValid && !errorMsg;

    return errorMsg;
  }

  function emailValidation(email) {
    let errorMsg = '';

    if (!isValidEmail(email)) errorMsg = 'Email is not valid';

    if (!email) errorMsg = 'Required';

    isValid = isValid && !errorMsg;

    return errorMsg;
  }

  function roleValidation(role) {
    let errorMsg = '';

    if (![ROLES.Admin, ROLES.Moderator, ROLES.Regular].includes(role)) {
      errorMsg = 'Invalid role';
    }

    if (!role) errorMsg = 'Required';

    isValid = isValid && !errorMsg;

    return errorMsg;
  }

  function passwordValidation(password) {
    let errorMsg = '';

    if (!/^(?=.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      errorMsg = 'Password must contain [a-z, A-Z, 0-9]';
    }

    isValid = isValid && !errorMsg;

    return errorMsg;
  }

  function confirmPasswordValidation(password, confirmPassword) {
    let errorMsg = '';

    if (password !== confirmPassword) errorMsg = 'Confirm password does not match password';

    isValid = isValid && !errorMsg;

    return errorMsg;
  }
};

module.exports = userCredentialsValidation;

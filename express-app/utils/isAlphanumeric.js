module.exports = function isAlphanumeric(str) {
  const re = /^[a-zA-Z0-9]+$/;
  return re.test(String(str));
};

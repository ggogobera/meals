const isAlphanumeric = str => {
  const re = /^[a-zA-Z0-9]+$/;
  return re.test(String(str));
};

export default isAlphanumeric;

function isValidDate(date) {
  const d = new Date(date);
  return d instanceof Date && !Number.isNaN(d);
}

module.exports = isValidDate;

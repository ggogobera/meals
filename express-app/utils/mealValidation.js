const isValidDate = require('./isValidDate');

module.exports = function mealValidation(meal) {
  const { date, calories, caption } = meal;

  if (!caption || Number.isNaN(calories)) {
    return { isValid: false, message: 'Provide all required fields' };
  }

  if (calories < 1) {
    return { isValid: false, message: 'Calories must be greater than zero' };
  }

  if (!isValidDate(date)) {
    return { isValid: false, message: 'Date is invalid' };
  }

  return { isValid: true, message: 'Success' };
};

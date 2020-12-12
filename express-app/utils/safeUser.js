const { pick } = require('ramda');

const safeUser = user => pick(['_id', 'userName', 'email', 'fullName', 'dailyCaloriesTarget', 'role'])(user || {});

module.exports = safeUser;

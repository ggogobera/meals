const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  fullName: String,
  email: { type: String, required: true },
  dailyCaloriesTarget: Number,
  hashedPassword: { type: String, required: true },
  role: { type: String, default: 'regular' }
});

module.exports = mongoose.model('User', userSchema);

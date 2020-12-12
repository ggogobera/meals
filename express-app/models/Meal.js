const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  caption: { type: String, required: true },
  date: { type: Date, default: Date.now },
  time: { type: String, default: '00:00' },
  calories: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Meal', mealSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
  sid: { type: String, required: true },
  user: {
    _id: { type: Schema.Types.ObjectId, required: true }
  }
});

module.exports = mongoose.model('UserSession', userSessionSchema);

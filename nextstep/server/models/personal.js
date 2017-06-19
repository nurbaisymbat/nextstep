const mongoose = require('mongoose');

// define the User model schema
const PersonalSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
  birthDate: Date,
  city: String,
  phone: String
});


module.exports = mongoose.model('Personal', PersonalSchema);

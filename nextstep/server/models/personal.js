const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const PersonalSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
  firstName: String,
  lastName: String,
  birthDate: Date,
  city: String,
  phone: Number,
  education: String
});


module.exports = mongoose.model('Personal', PersonalSchema);

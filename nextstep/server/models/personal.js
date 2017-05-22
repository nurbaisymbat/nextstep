const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const PersonalSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
  birthDate: Date,
  city: String,
  phone: Number
});


module.exports = mongoose.model('Personal', PersonalSchema);

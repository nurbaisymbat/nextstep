const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const FileSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
  filename: String,
  lesson: Number
});


module.exports = mongoose.model('File', FileSchema);

const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  lessonId: {type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'},
  filename: String,
  date: { type: Date, default: Date.now },
  approved: { type: Number, default: 0},
  department: String
});


module.exports = mongoose.model('MyFile', FileSchema);

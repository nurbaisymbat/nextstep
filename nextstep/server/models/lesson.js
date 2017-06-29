const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: Array,
  tasks: Array,
  day: Number,
  department: String
});


module.exports = mongoose.model('Lesson', LessonSchema);

const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  tasks: Array,
  day: Number
});


module.exports = mongoose.model('Lesson', LessonSchema);

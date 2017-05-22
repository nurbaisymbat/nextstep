const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  day: Number
});


module.exports = mongoose.model('Movie', MovieSchema);

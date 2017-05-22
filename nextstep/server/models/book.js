const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  week: Number
});


module.exports = mongoose.model('Book', BookSchema);

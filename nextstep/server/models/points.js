const mongoose = require('mongoose');

const PointsSchema = new mongoose.Schema({
  video: Number,
  book: Number,
  task: Number,
  insight: Number,
  department: String
});


module.exports = mongoose.model('Points', PointsSchema);

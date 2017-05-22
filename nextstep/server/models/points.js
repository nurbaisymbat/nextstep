const mongoose = require('mongoose');

const PointsSchema = new mongoose.Schema({
  video: Number,
  book: Number,
  task: Number,
  insight: Number
});


module.exports = mongoose.model('Points', PointsSchema);

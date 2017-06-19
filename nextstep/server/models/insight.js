const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  url: String,
  date: { type: Date, default: Date.now },
  approved: { type: Number, default: 0},
  department: String
});


module.exports = mongoose.model('Insight', InsightSchema);

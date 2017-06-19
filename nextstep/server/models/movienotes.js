const mongoose = require('mongoose');

const MovieNotesSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  movieId: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
  text: String,
  date: { type: Date, default: Date.now },
  approved: { type: Number, default: 0},
  department: String
});


module.exports = mongoose.model('MovieNotes', MovieNotesSchema);

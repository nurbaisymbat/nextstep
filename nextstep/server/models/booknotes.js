const mongoose = require('mongoose');

const BookNotesSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
  text: String,
  date: { type: Date, default: Date.now },
  approved: { type: Number, default: 0}
});


module.exports = mongoose.model('BookNotes', BookNotesSchema);

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  trelloUser: String,
  password: String,
  name: String,
  signedDate: { type: Date, default: Date.now },
  status: Number,
  points: Number,
  myImg: { type: String, default: ''},
  department: String
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcryptjs.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcryptjs.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcryptjs.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('User', UserSchema);

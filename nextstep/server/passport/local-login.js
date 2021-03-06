const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  var userData = {
    email: email.trim(),
    password: password.trim()
  };

  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      var error = new Error('Неправильный email');
      error.name = 'IncorrectCredentialsError';


      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) {
        var error = new Error('Неправильный пароль');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      if(userData.password == '12345678'){
        var error = new Error('Это ваш первый вход. Поменяйте пароль');
        error.name = 'FirstLogin';
        return done(error);
      }

      var payload = {
        sub: user._id,
        userstatus: user.status,
        department: user.department
      };

      // create a token string
      var token = jwt.sign(payload, config.jwtSecret);
      var data = {
        user: user
      };

      return done(null, token, data);
    });
  });
});

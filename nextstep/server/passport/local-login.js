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
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Неправильный email или пароль');
      error.name = 'IncorrectCredentialsError';


      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Неправильный email или пароль');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }

      const payload = {
        sub: user._id
      };
      if(user.status == 1){
       payload = {
          sub: user._id,
          userstatus: user.status
        };
      } else {
        payload = {
          sub: user._id,
          userstatus: user.status,
          userName: user.name,
          userImg: user.myImg
        };
      }
      // create a token string
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        user: user
      };

      return done(null, token, data);
    });
  });
});

const express = require('express');
const validator = require('validator');
const passport = require('passport');
var User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Введите правильный email.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length <=1 ) {
    isFormValid = false;
    errors.password = 'Пароль должен быть больше 1 символа.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Введите свое имя.';
  }

  if (!isFormValid) {
    message = 'Заполните все поля правильно.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Введите свой email.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Введите свой пароль.';
  }

  if (!isFormValid) {
    message = 'Заполните все поля правильно.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Заполните все поля правильно.',
          errors: {
            email: 'Этот email уже используется.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }
    else {

    }
    return res.status(200).json({
      success: true,
      message: 'Вы успешно зарегистрировались.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }
    return res.json({
      success: true,
      message: 'Вы успешно авторизовались!',
      token,
      user: userData
    });
  })(req, res, next);
});

router.post('/forgot', (req, res, next) => {
  var userEmail = req.body.email.trim();
  var mailText = 'Для того, чтобы поменять пароль пройдите по ссылке:<br/> http://91.201.215.12/change?email='+userEmail; //http://localhost:8080/change?email='+userEmail;
  User.findOne({email: userEmail}).exec(function(err, user){
      if (err){
        console.log(err);
      }
      else if(user){
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            auth: {
                user: 'sigismundnoel@gmail.com',
                pass: 'VulferamNoel'
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"NextStep"<sigismundnoel@gmail.com>', // sender address
            to: userEmail, // list of receivers
            subject: 'Восстановление пароля', // Subject line
            text: mailText, // plain text body
            html: mailText // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            //console.log('Message %s sent: %s', info.messageId, info.response);
        });
          res.status(200).send({});
      } else {
          res.status(404).send({});
      }
    });
});

router.post('/change', (req, res, next) => {
  var userEmail = req.body.email.trim();
  var userNewPwd = req.body.password.trim();

  User.findOne({email: userEmail}).exec(function(err, user){
    if (err){
      console.log(err);
    }
    else {
       bcrypt.genSalt((saltError, salt) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(userNewPwd, salt, (hashError, hash) => {
          if (hashError) { return next(hashError); }

          userNewPwd = hash;
          User.findByIdAndUpdate(user._id, { $set: { password: userNewPwd }}, { new: true }, function (err, user) {
            if (err) return handleError(err);

            res.status(200).send({
              message: 'Пароль был изменен'
            });
          });
        });
      });

    }
  });
});

router.post('/downloadFile', (req, res, err) => {
  var filename = req.query.filename;
  var file = path.join(__dirname, '/../../public/files/'+filename);
  res.download(file);
})

module.exports = router;

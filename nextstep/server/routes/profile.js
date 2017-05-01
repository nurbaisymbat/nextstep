const express = require('express');
var jwtDecode = require('jwt-decode');
const router = new express.Router();
var Personal = require('../models/personal');
var User = require('../models/user');

router.get('/profile', (req, res) => {

  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userId = decoded.sub;
  Personal.findOne({userId: userId}).exec(function(err, personalInfo){
      if (err){
        console.log(err);
      }
      else {
        User.findOne({_id: userId}).exec(function(err, user){
          if(err){
            console.log(err);
          }
          else {
            res.json({
              user: user,
              personalInfo: personalInfo
            });
          }
        });
      }
    });
});

router.post('/profileChange', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userId = decoded.sub;
    const personalData = {
      userId: userId,
      email: req.body.email.trim(),
      birthDate: req.body.birthDate.trim(),
      city: req.body.city.trim(),
      phone: req.body.phone.trim()
    };
    Personal.findOne({userId: userId}).exec(function(err, personalInfo){
        if (personalInfo){
          Personal.findOneAndUpdate(personalInfo.userId, { $set: {birthDate: personalData.birthDate, city: personalData.city, phone: personalData.phone}}, { new: true }, function (err, personalInfo) {
            if (err){
              console.log(err);
            }

            User.findOneAndUpdate(personalInfo.userId, { $set: {email: personalData.email}}, { new: true }, function (err, user) {
              if (err){
                console.log(err);
              }

              res.json({
                user: user,
                personalInfo: personalInfo,
                message: 'Сохранено'
              });
            })
          });
        } else {
            const newPersonal = new Personal(personalData);
            newPersonal.save((err, personalInfo) => {
              if (err) { return done(err); }
            //  console.log('zxcvbnmbnm');
            //  console.log(lastBlog);
              //res.status(200).send(lastBlog);
              //console.log(personalInfo);
              User.findOneAndUpdate(personalInfo.userId, { $set: {email: personalData.email}}, { new: true }, function (err, user) {
                if (err){
                  console.log(err);
                }

                res.json({
                  success: true,
                  user: user,
                  personalInfo: personalInfo,
                  message: 'Сохранено'
                });
              })
            });
        }
      });
});

module.exports = router;

const express = require('express');
var jwtDecode = require('jwt-decode');
const router = new express.Router();
var Personal = require('../models/personal');

router.get('/profile', (req, res) => {

  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userId = decoded.sub;
  Personal.findOne({userId: userId}).exec(function(err, personalInfo){
      if (err){
        console.log(err);
      }
      else {
          res.json({
            personalInfo: personalInfo
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
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      birthDate: req.body.birthDate.trim(),
      city: req.body.city.trim(),
      phone: req.body.phone.trim(),
      education: req.body.education.trim()
    };
    Personal.findOne({userId: userId}).exec(function(err, personalInfo){
        if (personalInfo){
          Personal.findOneAndUpdate(personalInfo.userId, { $set: {firstName: personalData.firstName, lastName: personalData.lastName, birthDate: personalData.birthDate, city: personalData.city, phone: personalData.phone, education: personalData.education}}, { new: true }, function (err, personalInfo) {
            if (err) return handleError(err);

            res.json({
              personalInfo: personalInfo,
              message: 'Сохранено'
            });
          });
        } else {
            const newPersonal = new Personal(personalData);
            newPersonal.save((err, personalInfo) => {
              if (err) { return done(err); }
            //  console.log('zxcvbnmbnm');
            //  console.log(lastBlog);
              //res.status(200).send(lastBlog);
              console.log(personalInfo);
               res.json({
                success: true,
                personalInfo: personalInfo,
                message: 'Сохранено'
              });
            });
        }
      });
});

module.exports = router;

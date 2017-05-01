const express = require('express');
var jwtDecode = require('jwt-decode');
const router = new express.Router();
var Personal = require('../models/personal');
var User = require('../models/user');
var File = require('../models/file');
let multiparty = require('multiparty');
let fs = require('fs');

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
router.post('/upload', (req, res) => {
  console.log("submitted");
  let form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    console.log(files);
    let {path: tempPath, originalFilename} = files.imageFile[0];
    let copyToPath = "public/files/" + originalFilename;
    var fileName = originalFilename;
    fs.readFile(tempPath, (err, data) => {
      // make copy of image to new location
      fs.writeFile(copyToPath, data, (err) => {
        // delete temp image
        fs.unlink(tempPath, () => {
          console.log(copyToPath);
          var token = req.headers.authorization.split(' ')[1];
          var decoded = jwtDecode(token);
          var userId = decoded.sub;
          var lessonNumber = 1;
          const fileData = {
            userId: userId,
            filename: fileName,
            lesson: lessonNumber
          }
          const newFile = new File(fileData);
          newFile.save((err, fileData) => {
            res.send({
              message: "File uploaded"
            });
          });
        });
      });
    });
  })
});
module.exports = router;

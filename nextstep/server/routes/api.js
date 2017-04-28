const express = require('express');
var jwtDecode = require('jwt-decode');
const router = new express.Router();
var User = require('../models/user');


router.get('/dashboard', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
 }
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userId = decoded.sub;
  User.findOne({_id: userId}).exec(function(err, user){
      if (err){
        console.log(err);
      } else {

          res.status(200).send({
            userId: userId,
            username: user.name,
            useremail: user.email
          });

      }
    });
});

module.exports = router;

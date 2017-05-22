const express = require('express');
var jwtDecode = require('jwt-decode');
var request  = require('request')
const router = new express.Router();
var User = require('../models/user');
var Points = require('../models/points');
var moment = require('moment');
var Insight = require('../models/insight');
var MovieNotes = require('../models/movienotes');
var BookNotes = require('../models/booknotes');
moment.locale('ru');

var trellokey = "8cb68cae49674c1888f615a6ff332c26";
var trellotoken = "ad6f7144ae2d2c66f528bc5eca841f30e149b8167eba02d7c2a1b0ca5defc556";

router.get('/dashboard', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
 }
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userId = decoded.sub;
  var userStatus = decoded.userstatus;
  var maxPoints = 0;
  var maxPointsPercent = 0;
  User.findOne({_id: userId}).exec(function(err, user){
      if (err){
        console.log(err);
      } else {
        Points.find((err, points) => {
          if(err) { console.log(err) }
          else {
            maxPoints = points[0].video*480 + points[0].book*80 + (points[0].task * 3*480) + points[0].insight*8;
            User.find({status: 2}, (err, users) => {
              if(err) { console.log(err) }
              else {
                users.sort(function(a,b) {return (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0);} );
                if(userStatus == 1){
                  var startOfWeek = moment().startOf('isoweek').toDate();
                  var endOfWeek   = moment().endOf('isoweek').toDate();
                  var myStartOfWeek = moment(startOfWeek).utcOffset('+6').format();
                  var myEndOfWeek = moment(endOfWeek).utcOffset('+6').format()
                  BookNotes.find({'date': {
                    $gt: myStartOfWeek,
                    $lt: myEndOfWeek
                  }}, (err, booknotes) => {
                    if(err) { console.log(err) }
                    else {
                      MovieNotes.find({'date': {
                        $gt: myStartOfWeek,
                        $lt: myEndOfWeek
                      }}, (err, movienotes) => {
                        if(err) { console.log(err) }
                        else {
                          Insight.find({'date': {
                            $gt: myStartOfWeek,
                            $lt: myEndOfWeek
                          }}, (err, insights) => {
                            if(err) { console.log(err) }
                            else {
                              var temp = 0;
                              var tempObj = {
                                name: '',
                                movies: 0,
                                books: 0,
                                insight: 0
                              };
                              var tempArr = [];
                              users.forEach(function(arrayItem){
                                booknotes.forEach(function(bookItem){
                                  if(arrayItem._id.toString() == bookItem.userId.toString()){
                                    temp++;
                                  }
                                });
                                tempObj.books = temp;
                                temp=0;
                                movienotes.forEach(function(movieItem){
                                  if(arrayItem._id.toString() == movieItem.userId.toString()){
                                    temp++;
                                  }
                                });
                                tempObj.movies = temp;
                                temp=0;
                                insights.forEach(function(insightItem){
                                  if(arrayItem._id.toString() == insightItem.userId.toString()){
                                    temp++;
                                  }
                                });
                                tempObj.insight = temp;
                                temp=0;
                                tempObj.name = arrayItem.name;
                                if((tempObj.books > 0) || (tempObj.movies > 0) || (tempObj.insight > 0)){
                                  tempArr.push(tempObj);
                                }
                                tempObj = {
                                  name: '',
                                  movies: 0,
                                  books: 0,
                                  insight: 0
                                };
                              });
                              res.status(200).send({
                                maxPoints: maxPoints,
                                users: users,
                                progress: tempArr
                              });
                            }
                          })
                        }
                      })
                    }
                  })


                } else {
                  maxPointsPercent = (user.points * 100)/maxPoints;
                  var myTrello = {}; //card name, card desc, since, due, members.username
                  var myCards = [];
                  var myMembers = [];
                  var path = 'https://api.trello.com/1/lists/59219f6107818467d17f8bfa/cards?fields=name,desc,dateLastActivity,due&members=true&member_fields=username&key='+trellokey+'&token='+trellotoken;
                			request(
                				{
                					method: 'GET',
                					uri: path,
                					json: true
                				},
                				function (error, response, body) {
                					if(response.statusCode == 200){
                            myCards = body;
                            myCards.forEach(function(cardItem){
                              myMembers = cardItem.members;
                              myMembers.forEach(function(memberItem){
                                if(memberItem.username == user.trelloUser){
                                  myTrello = {
                                    cardname: cardItem.name,
                                    carddesc: cardItem.desc,
                                    cardsince: cardItem.dateLastActivity,
                                    carddue: cardItem.due,
                                  }
                                }
                              });
                            });
                            res.status(200).send({
                              user: user,
                              maxPoints: maxPoints,
                              maxPointsPercent: maxPointsPercent+'%',
                              users: users,
                              myTrello: myTrello
                            });
                					} else {
                						console.log('error: '+ response.statusCode);
                						console.log(body);
                					}
                				});
                }

              }
            })
          }
        })
      }
    });
});

module.exports = router;

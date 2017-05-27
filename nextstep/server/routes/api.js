const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const router = new express.Router();
var Personal = require('../models/personal');
var User = require('../models/user');
var MyFile = require('../models/myfile');
var Book = require('../models/book');
var Movie = require('../models/movie');
var Lesson = require('../models/lesson');
var Insight = require('../models/insight');
var MovieNotes = require('../models/movienotes');
var BookNotes = require('../models/booknotes');
var Points = require('../models/points');
var request  = require('request')
var moment = require('moment');
moment.locale('ru');

let multiparty = require('multiparty');
let fs = require('fs');

router.get('/getUser', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      const userId = decoded.sub;
      User.findOne({_id: userId}, (err, user) => {
        if(err) { console.log(err) }
        else {
          res.send({
            user: user
          })
        }
      })
    }
  })
});

router.get('/dashboard', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      const userId = decoded.sub;
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
                    if(user.status == 1){
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
                      res.status(200).send({
                          user: user,
                          maxPoints: maxPoints,
                          maxPointsPercent: maxPointsPercent+'%',
                          users: users
                      });
                    }
                  }
                })
              }
            })
          }
        })
    }
  });
});

router.get('/getbook', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      var userId = decoded.sub;
      User.findOne({ _id: userId }, (err, user) => {
        var today = new Date();
        var userSignedDate = user.signedDate;
        var findDifferenceWeek = Math.round((today - userSignedDate) /1000/60/60/24/7)+1;
        Book.findOne({week: findDifferenceWeek}, (err, book) => {
          if(err){
            console.log(err);
          } else if(book) {
            BookNotes.find({userId: userId, bookId: book._id}, (err, bookNoteList) => {
              if(err){
                console.log(err);
              }  else {
                if(bookNoteList.length == 10){
                  res.json({
                      book: book,
                      bookNoteList: bookNoteList,
                      messageQ: 'Вы больше не можете писать заметки',
                      checkLength: true
                  });
                }
                else {
                  res.json({
                      book: book,
                      bookNoteList: bookNoteList,
                      checkLength: false,
                      messageQ: ''
                  });
                }
              }
            })
          } else {
            res.json({
                book: book
            });
          }
        })
      })
    }
  })
});

router.get('/insight', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      var userId = decoded.sub;
      var today = new Date();
      User.findOne({ _id: userId }, (err, user) => {
        if(err){
          console.log(err);
        }
        else {
          Insight.find({userId: user._id}, (err, insight) => {
            if(err){
              console.log(err)
            } else if(insight){
              var checkToday = false;
              insight.forEach( function (arrayItem){
                  if(arrayItem.date.toDateString() == today.toDateString()){
                    checkToday = true;
                  }
              });
              if(checkToday){
                res.send({
                  message: "Вы сегодня уже загрузили инсайт",
                  checkDate: false
                });
              } else {
                var endOfWeek = moment().format('E');
                if((endOfWeek == 6)||(endOfWeek == 7)){
                  res.send({
                    message: "",
                    checkDate: true
                  });
                } else {
                  res.send({
                    message: "Инсайт будет доступен в конце недели",
                    checkDate: false
                  });
                }
              }

            } else {
              var endOfWeek = moment().format('E');
              if((endOfWeek == 6)||(endOfWeek == 7)){
                res.send({
                  message: "",
                  checkDate: true
                });
              } else {
                res.send({
                  message: "Инсайт будет доступен в конце недели",
                  checkDate: false
                });
              }
            }
          })
        }
      });
    }
  })
});

router.get('/getlesson', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      var userId = decoded.sub;
      User.findOne({ _id: userId }, (err, user) => {
        var userSignedDate = user.signedDate;
        var today = new Date();
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
        Lesson.findOne({day: findDifference}, (err, lesson) => {
          if(err){
            console.log(err);
          } else {
            res.json({
                lesson: lesson
            });
          }
        })
      })
    }
  })
});

router.get('/getmovie', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      var userId = decoded.sub;
      User.findOne({ _id: userId }, (err, user) => {
        var userSignedDate = user.signedDate;
        var today = new Date();
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
        Movie.findOne({day: findDifference}, (err, movie) => {
          if(err){
            console.log(err);
          } else if (movie){
            MovieNotes.find({userId: userId, movieId: movie._id}, (err, movieNoteList) => {
              if(err){
                console.log(err);
              }  else {
                if(movieNoteList.length == 10){
                  res.json({
                      movie: movie,
                      movieNoteList: movieNoteList,
                      messageQ: 'Вы больше не можете писать заметки',
                      checkLength: true
                  });
                }
                else {
                  res.json({
                      movie: movie,
                      movieNoteList: movieNoteList,
                      checkLength: false,
                      messageQ: ''
                  });
                }
              }
            })
          }else {
            res.json({
                movie: movie
            });
          }
        })
      })
    }
  })
});

router.get('/profile', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      var userId = decoded.sub;
      var today = new Date();
      var maxProgress = {
        video: 480,
        book: 80,
        task: 144,
        insight: 8
      };
      var myProgress = {
        video: '0%',
        book: '0%',
        task: '0%',
        insight: '0%'
      };
      var tempCount = 0;
      Personal.findOne({userId: userId}).exec(function(err, personalInfo){
          if (err){
            console.log(err);
          }
          else if(personalInfo){
            User.findOne({_id: userId}).exec(function(err, user){
              if(err){
                console.log(err);
              }
              else {
                var userSignedDate = user.signedDate;
                var findDifferenceWeek = Math.round((today - userSignedDate) /1000/60/60/24/7)+1;
                Book.findOne({week: findDifferenceWeek}, (err, book) => {
                  if(err){
                    console.log(err);
                  } else {
                    var millisecondsPerDay = 24 * 60 * 60 * 1000;
                    var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                    Movie.findOne({day: findDifference}, (err, movie) => {
                      if(err){
                        console.log(err);
                      } else {
                        MyFile.find({userId: user._id}, (err, myfiles) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.task = (Math.round(myfiles.length*100/maxProgress.task))+'%';
                            Insight.find({userId: user._id}, (err, insight) => {
                              if(err){
                                console.log(err);
                              } else {
                                myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                                BookNotes.find({userId: user._id}, (err, booknotes) => {
                                  var xAll = [];
                                  myProgress.book = (Math.round(booknotes.length*100/maxProgress.book))+'%';
                                  booknotes.forEach( function (arrayItem){
                                      if((arrayItem.date.toDateString() == today.toDateString())
                                              && (arrayItem.bookId.toString() == book._id.toString())){
                                        var bookDate = {
                                            num: booknotes.length,
                                            title: book.title,
                                            date: arrayItem.date,
                                            type: "book"
                                        };
                                        xAll.push(bookDate);
                                        tempCount ++;
                                      }
                                  });
                                  xAll.forEach( function (arrayItem){
                                    arrayItem.num = tempCount;
                                  });
                                  tempCount = 0;
                                  MovieNotes.find({userId: user._id}, (err, movienotes) => {
                                    myProgress.video = (Math.round(movienotes.length*100/maxProgress.video))+'%';
                                    movienotes.forEach( function (arrayItem){
                                        if((arrayItem.date.toDateString() == today.toDateString())
                                              && (arrayItem.movieId.toString() == movie._id.toString())){
                                          var movieDate = {
                                            num: movienotes.length,
                                            title: movie.title,
                                            date: arrayItem.date,
                                            type: "movie"
                                          };
                                          xAll.push(movieDate);
                                          tempCount ++;
                                        }
                                    });
                                    xAll.forEach( function (arrayItem){
                                      arrayItem.num = tempCount;
                                    });
                                    tempCount = 0;
                                    xAll.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} );
                                    for (var i in xAll) {
                                      var myHour =  today.getHours() - xAll[i].date.getHours();
                                      xAll[i].date = myHour;
                                     }
                                     if(xAll.length > 0){
                                       res.json({
                                         user: user,
                                         personalInfo: personalInfo,
                                         notes: xAll,
                                         myProgress: myProgress
                                       });
                                     } else {
                                       res.json({
                                         user: user,
                                         personalInfo: personalInfo,
                                         myProgress: myProgress
                                       });
                                     }
                                  })
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
              })
            }
            });
          }
          else {
            User.findOne({_id: userId}).exec(function(err, user){
              if(err){
                console.log(err);
              }
              else {
                var userSignedDate = user.signedDate;
                var findDifferenceWeek = Math.round((today - userSignedDate) /1000/60/60/24/7)+1;
                Book.findOne({week: findDifferenceWeek}, (err, book) => {
                  if(err){
                    console.log(err);
                  } else{
                    var millisecondsPerDay = 24 * 60 * 60 * 1000;
                    var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                    Movie.findOne({day: findDifference}, (err, movie) => {
                      if(err){
                        console.log(err);
                      } else {
                        MyFile.find({userId: user._id}, (err, myfiles) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.task = (Math.round(myfiles.length*100/maxProgress.task))+'%';
                            Insight.find({userId: user._id}, (err, insight) => {
                              if(err){
                                console.log(err);
                              } else {
                                myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                                BookNotes.find({userId: user._id}, (err, booknotes) => {
                                  var xAll = [];
                                  myProgress.book = (Math.round(booknotes.length*100/maxProgress.book))+'%';
                                  booknotes.forEach( function (arrayItem){
                                      if((arrayItem.date.toDateString() == today.toDateString())
                                              && (arrayItem.bookId.toString() == book._id.toString())){
                                        var bookDate = {
                                            num: booknotes.length,
                                            title: book.title,
                                            date: arrayItem.date,
                                            type: "book"
                                        };
                                        xAll.push(bookDate);
                                        tempCount++;
                                      }
                                  });

                                  xAll.forEach( function (arrayItem){
                                    arrayItem.num = tempCount;
                                  });
                                  tempCount = 0;

                                  MovieNotes.find({userId: user._id}, (err, movienotes) => {
                                    myProgress.video = (Math.round(movienotes.length*100/maxProgress.video))+'%';
                                    movienotes.forEach( function (arrayItem){
                                        if((arrayItem.date.toDateString() == today.toDateString())
                                              && (arrayItem.movieId.toString() == movie._id.toString())){
                                          var movieDate = {
                                            num: movienotes.length,
                                            title: movie.title,
                                            date: arrayItem.date,
                                            type: "movie"
                                          };
                                          xAll.push(movieDate);
                                          tempCount++;
                                        }
                                    });

                                    xAll.forEach( function (arrayItem){
                                      arrayItem.num = tempCount;
                                    });
                                    tempCount = 0;

                                    xAll.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} );
                                    for (var i in xAll) {
                                      var myHour =  today.getHours() - xAll[i].date.getHours();
                                      xAll[i].date = myHour;
                                     }
                                     if(xAll.length > 0){
                                       res.json({
                                         user: user,
                                         notes: xAll,
                                         myProgress: myProgress
                                       });
                                     } else {
                                       res.json({
                                         user: user,
                                         myProgress: myProgress
                                       });
                                     }
                                  })

                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        });
    }
  })
});

router.get('/gettrello', (req, res) => {
  var trellokey = "8982410617159f8bb7e64248ed2cf4c4";
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      var userId = decoded.sub;
      User.findOne({_id: userId}).exec(function(err, user){
        if(err){ console.log(err) }
        else {
          var path = 'https://api.trello.com/1/members/'+user.trelloUser+'?boards=all&board_fields=name&key='+trellokey;
          request({
              method: 'GET',
              uri: path,
              json: true },
              function (error, response, body) {
                if(response.statusCode == 200){
                  var myId = body.boards.filter(function(board) {
                                    return board.name.indexOf('Задачи') > -1; })[0].id;
                  var pathSec = 'https://api.trello.com/1/boards/'+myId+'/lists?fields=id,name&key='+trellokey;
                  request({
                      method: 'GET',
                      uri: pathSec,
                      json: true },
                      function (error, response, body) {
                        if(response.statusCode == 200){
                          var myListId = body.filter(function(list) {
                                            return list.name.indexOf('В процессе') > -1; })[0].id;
                          var pathThird = 'https://api.trello.com/1/lists/'+myListId+'/cards?fields=name,desc,dateLastActivity,due&key='+trellokey;
                          request({
                              method: 'GET',
                              uri: pathThird,
                              json: true },
                              function (error, response, body){
                                  if(response.statusCode == 200){
                                    res.status(200).send({
                                          myTrello: body
                                    });
                                  } else {
                                    console.log('error: '+ response.statusCode);
                                    console.log(body);
                                  }
                              });

                        } else {
                          console.log('error: '+ response.statusCode);
                          console.log(body);
                        }
                  });
                } else {
                  console.log('error: '+ response.statusCode);
                  console.log(body);
                }
          });
        }
      })
    }
  })
});

router.post('/profileChange', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
        var userId = decoded.sub;
        const personalData = {
          userId: userId,
          birthDate: req.body.birthDate.trim(),
          city: req.body.city.trim(),
          phone: req.body.phone.trim()
        };

        Personal.findOne({userId: userId}).exec(function(err, personalInfo){
            if (personalInfo){
              Personal.findOneAndUpdate({userId: personalInfo.userId}, { $set: {birthDate: personalData.birthDate, city: personalData.city, phone: personalData.phone}}, { new: true }, function (err, personalInfo) {
                if (err){
                  console.log(err);
                }
                res.json({
                  personalInfo: personalInfo
                });
              });
            } else {
                const newPersonal = new Personal(personalData);
                newPersonal.save((err, personalInfo) => {
                  if (err) { return done(err); }
                    if (err){
                      console.log(err);
                    }

                    res.json({
                      success: true,
                      personalInfo: personalInfo
                    });
                });
            }
          });
    }
  });
});

router.post('/addbooknote', (req, res, err) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      var userId = decoded.sub;
      var bookID = req.body.bookId.trim();
      const bookNote = {
        userId: userId,
        bookId: bookID,
        text: req.body.bookNoteText.trim()
      };
      BookNotes.find({userId: userId, bookId: bookID}, (err, bookNoteList) => {
        if (err){
          console.log(err);
        } else if(bookNoteList.length ==10){
          res.send({
            message: 'Вы написали достаточно заметок'
          })
        } else {
          const newNote = new BookNotes(bookNote);
          newNote.save((err, note) => {
            if (err) { console.log(err); }
            res.json({
                success: true,
                bookNote: note,
                message: 'Заметка добавлена'
            });
            })
        }
      })
    }
  });
});

router.post('/insightUpload', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      var userId = decoded.sub;
      const insight = {
        userId: userId,
        url: req.body.myInsight.trim()
      };
      const newInsight = new Insight(insight);
      newInsight.save((err, insight) => {
        if (err) { console.log(err); }
        res.json({
            message: 'Инсайт добавлен',
            checkDate: false
        });
        })
      }
  });
});

router.post('/upload', (req, res) => {
  let form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    let {path: tempPath, originalFilename} = files.imageFile[0];
    let copyToPath = "public/files/" + originalFilename;
    var fileName = originalFilename;
    fs.readFile(tempPath, (err, data) => {
      // make copy of image to new location
      fs.writeFile(copyToPath, data, (err) => {
        // delete temp image
        fs.unlink(tempPath, () => {
          var token = req.headers.authorization.split(' ')[1];
          jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if(err) {return res.status(401).end();}
            else {
                var userId = decoded.sub;
                const fileData = {
                  userId: userId,
                  filename: fileName,
                  lessonId: req.query.lessonId
                }
                const newFile = new MyFile(fileData);
                newFile.save((err, fileData) => {
                  if(err) {
                    console.log(err);
                  }
                  res.send({
                    message: "File uploaded"
                  });
                });
            }
          });
        });
      });
    });
  })
});

router.post('/uploadImg', (req, res) => {
  let form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    let {path: tempPath, originalFilename} = files.imageFile[0];
    let copyToPath = "public/userImgs/" + originalFilename;
    var fileName = originalFilename;
    fs.readFile(tempPath, (err, data) => {
      fs.writeFile(copyToPath, data, (err) => {
        fs.unlink(tempPath, () => {
          var token = req.headers.authorization.split(' ')[1];
          jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if(err) {return res.status(401).end();}
            else {
                var userId = decoded.sub;
                User.findOneAndUpdate({_id: userId}, { $set: {myImg: fileName}}, { new: true }, function (err, user) {
                  if(err) { console.log(err) }
                  else {
                    res.send({
                      user: user
                    });
                  }
                })
            }
          });
        });
      });
    });
  })
});

router.post('/addmovienote', (req, res, err) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
        var userId = decoded.sub;
        var movieID = req.body.movieId.trim();
        const movieNote = {
          userId: userId,
          movieId: movieID,
          text: req.body.movieNoteText.trim()
        };
        MovieNotes.find({userId: userId, movieId: movieID}, (err, movieNoteList) => {
          if (err){
            console.log(err);
          } else if(movieNoteList.length ==10){
            res.send({
              message: 'Вы написали достаточно заметок'
            })
          } else {
            console.log(movieNoteList.length)
            const newNote = new MovieNotes(movieNote);
            newNote.save((err, note) => {
              if (err) { console.log(err); }
              res.json({
                  success: true,
                  movieNote: note,
                  message: 'Заметка добавлена'
              });
              })
          }
        })
    }
  });
});

module.exports = router;

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
const path = require('path');
const bcryptjs = require('bcryptjs');

//GET REQUESTS

router.get('/added', (req, res) => {
  var today = new Date();
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else {
      if(decoded.department == 'all'){
        Book.find((err, book) => {
        if(err){
          console.log(err);
        }
        else {
            Movie.find((err, movie) => {
              if(err){
                console.log(err);
              }
              Lesson.find((err, lesson) => {
                if(err){
                  console.log(err);
                }
                else if(book && movie && lesson){
                  book.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  movie.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  lesson.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      book: book,
                      movie: movie,
                      lesson: lesson,
                      myDepartment: decoded.department
                  });
                } else if (book && movie && !lesson){
                  book.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  movie.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      book: book,
                      movie: movie,
                      message: "Уроков не найдено",
                      myDepartment: decoded.department
                  });
                } else if (book && !movie && lesson){
                  book.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  lesson.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      book: book,
                      lesson: lesson,
                      message: "Фильмов не найдено",
                      myDepartment: decoded.department
                  });
                } else if (!book && movie && lesson){
                  movie.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  lesson.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      movie: movie,
                      lesson: lesson,
                      message: "Книг не найдено",
                      myDepartment: decoded.department
                  });
                } else if (!book && !movie && lesson){
                  lesson.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      lesson: lesson,
                      message: "Книг и фильмов не найдено",
                      myDepartment: decoded.department
                  });
                } else if (!book && movie && !lesson){
                  movie.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      movie: movie,
                      message: "Книг и фильмов не найдено",
                      myDepartment: decoded.department
                  });
                } else if (book && !movie && !lesson){
                  book.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      book: book,
                      message: "Книг и фильмов не найдено",
                      myDepartment: decoded.department
                  });
                } else {
                  res.json({
                      message: "Ничего не найдено",
                      myDepartment: decoded.department
                  });
                }
              })
            })
          }
        })
      } else {
        Book.find({department: decoded.department}, (err, book) => {
        if(err){
          console.log(err);
        }
        else {
            Movie.find({department: decoded.department}, (err, movie) => {
              if(err){
                console.log(err);
              }
              Lesson.find({department: decoded.department}, (err, lesson) => {
                if(err){
                  console.log(err);
                }
                else if(book && movie && lesson){
                  book.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  movie.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  lesson.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      book: book,
                      movie: movie,
                      lesson: lesson,
                      myDepartment: decoded.department
                  });
                } else if (book && movie && !lesson){
                  book.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  movie.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      book: book,
                      movie: movie,
                      message: "Уроков не найдено",
                      myDepartment: decoded.department
                  });
                } else if (book && !movie && lesson){
                  book.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  lesson.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      book: book,
                      lesson: lesson,
                      message: "Фильмов не найдено",
                      myDepartment: decoded.department
                  });
                } else if (!book && movie && lesson){
                  movie.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  lesson.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      movie: movie,
                      lesson: lesson,
                      message: "Книг не найдено",
                      myDepartment: decoded.department
                  });
                } else if (!book && !movie && lesson){
                  lesson.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      lesson: lesson,
                      message: "Книг и фильмов не найдено",
                      myDepartment: decoded.department
                  });
                } else if (!book && movie && !lesson){
                  movie.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      movie: movie,
                      message: "Книг и фильмов не найдено",
                      myDepartment: decoded.department
                  });
                } else if (book && !movie && !lesson){
                  book.sort(function(a,b) {return (a.day < b.day) ? -1 : ((b.day < a.day) ? 1 : 0);} );
                  res.json({
                      book: book,
                      message: "Книг и фильмов не найдено",
                      myDepartment: decoded.department
                  });
                } else {
                  res.json({
                      message: "Ничего не найдено",
                      myDepartment: decoded.department
                  });
                }
              })
            })
          }
        })
      }
    }
  })
});

router.get('/getpoints', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else if (decoded.department == 'all'){
      Points.find((err, points) => {
        if(err){
          console.log(err)
        } else {
          res.send({
            myPoints: points
          });
        }
      })
    } else {
      Points.findOne({department: decoded.department}, (err, points) => {
        if(err){
          console.log(err)
        } else {
          res.send({
            myPoints: points
          });
        }
      })
    }
  })
});

router.get('/getadmins', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else if (decoded.department == 'all') {
      User.find({status: 1, department: { $ne: 'all' }}, (err, users) => {
        if(err){
          console.log(err)
        } else {
          users.sort(function(a,b) {return (a.name < b.name) ? -1 : ((b.name < a.name) ? 1 : 0);} );
          res.send({
            admins: users
          })
        }
      })
    } else {
      return res.status(401).end();
    }
  })
});

router.post('/addadmin', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else if (decoded.department == 'all') {
      var newadmin = JSON.parse(req.body.newadmin);

      User.findOne({email: newadmin.email}, (err, user) => {
        if(err){
          console.log(err)
        } else if (user){
          res.status(409).send({
            message: 'Этот пользователь уже зарегистрирован'
          })
        } else {
          const newadminData = {
            name: newadmin.name,
            email: newadmin.email,
            status: 1,
            department: newadmin.department,
            password: '12345678'
          };
          const newAdmin = new User(newadminData);
          newAdmin.save((err) => {
            if (err) { console.log(err); }
              res.send({
                  message: 'Добавлен новый админ'
              });
            })
        }
      })
    } else {
      return res.status(401).end();
    }
  })
})

router.post('/deleteadmin', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else if (decoded.department == 'all') {
      var admin_id = req.body.admin_id;

      User.findOneAndRemove({_id: admin_id}, (err) => {
        if(err){
          console.log(err)
        } else {
          res.send({
            messageDelete: "Администратор удален"
          })
        }
      })
    } else {
      return res.status(401).end();
    }
  })
})

router.post('/editadmin', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else if (decoded.department == 'all') {
      var editadmin = JSON.parse(req.body.editadmin);
      User.findOneAndUpdate({_id: editadmin._id}, { $set: {name: editadmin.name, email: editadmin.email, department: editadmin.department}}, { new: true }, (err) => {
        if(err){
          console.log(err)
        } else {
          res.send({
            messageDelete: "Данные администратора успешно отредактированы"
          })
        }
      })
    } else {
      return res.status(401).end();
    }
  })
})

router.post('/editmainadmin', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else if (decoded.department == 'all') {
      var user = JSON.parse(req.body.user);
        if(req.body.password.length > 0) {
          User.findOneAndUpdate({_id: user._id}, { $set: {name: user.name, email: user.email, password: bcryptjs.hashSync(req.body.password, 10)}}, { new: true }, (err, user) => {
            if(err){
              console.log(err)
            } else {
              res.send({
                user: user
              })
            }
          })
        } else {
          User.findOneAndUpdate({_id: user._id}, { $set: {name: user.name, email: user.email}}, { new: true }, (err, user) => {
            if(err){
              console.log(err)
            } else {
              res.send({
                user: user
              })
            }
          })
        }

    } else {
      return res.status(401).end();
    }
  })
})

router.get('/getadmin', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else if (decoded.department == 'all') {
      User.findOne({department: 'all'}, (err, user) => {
        if(err) { console.log(err) }
        else {
          res.send({
            user: user
          })
        }
      })
    } else {
      return res.status(401).end();
    }
  })
});

router.get('/getusers', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else if (decoded.department == 'all') {
      User.find({status: 2}, (err, users) => {
        if(err){
          console.log(err)
        } else {
          Personal.find((err, personals) => {
            if(err){
              console.log(err)
            } else if(personals){
              var xAll = [];
              const today = new Date();
              function getAge(dateString) {
                  var birthDate = new Date(dateString);
                  var age = today.getFullYear() - birthDate.getFullYear();
                  var m = today.getMonth() - birthDate.getMonth();
                  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                      age--;
                  }
                  return age;
              }
              users.forEach((arrayItem) => {
                var myData = {};
                var check = false;
                personals.forEach((arrItem) => {
                  if(arrItem.userId.toString() == arrayItem._id.toString()){
                    var temp = getAge(arrItem.birthDate);
                    myData = {
                      user: arrayItem,
                      personal: arrItem,
                      age: temp
                    };
                    xAll.push(myData);
                    check = true;
                  }
                });

                if(!check){
                  myData = {
                    user: arrayItem,
                    personal: null
                  };
                  xAll.push(myData);
                }
              });

              xAll.sort(function(a,b) {return (a.user.signedDate > b.user.signedDate) ? -1 : ((b.user.signedDate > a.user.signedDate) ? 1 : 0);} );
              res.send({
                users: xAll
              });
            } else {
              var xAll = [];
              users.forEach((arrayItem) => {
                var myData = {
                  user: arrayItem,
                  personal: null
                };
                xAll.push(myData);
              })
              xAll.sort(function(a,b) {return (a.user.signedDate > b.user.signedDate) ? -1 : ((b.user.signedDate > a.user.signedDate) ? 1 : 0);} );
              res.send({
                users: xAll
              });
            }
          })
        }
      })
    } else {
      User.find({status: 2, department: decoded.department}, (err, users) => {
        if(err){
          console.log(err)
        } else {
          Personal.find((err, personals) => {
            if(err){
              console.log(err)
            } else if(personals){
              var xAll = [];
              const today = new Date();
              function getAge(dateString) {
                  var birthDate = new Date(dateString);
                  var age = today.getFullYear() - birthDate.getFullYear();
                  var m = today.getMonth() - birthDate.getMonth();
                  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                      age--;
                  }
                  return age;
              }
              users.forEach((arrayItem) => {
                var myData = {};
                var check = false;
                personals.forEach((arrItem) => {
                  if(arrItem.userId.toString() == arrayItem._id.toString()){
                    var temp = getAge(arrItem.birthDate);
                    myData = {
                      user: arrayItem,
                      personal: arrItem,
                      age: temp
                    };
                    xAll.push(myData);
                    check = true;
                  }
                });

                if(!check){
                  myData = {
                    user: arrayItem,
                    personal: null
                  };
                  xAll.push(myData);
                }
              });

              xAll.sort(function(a,b) {return (a.user.signedDate > b.user.signedDate) ? -1 : ((b.user.signedDate > a.user.signedDate) ? 1 : 0);} );
              res.send({
                users: xAll
              });
            } else {
              var xAll = [];
              users.forEach((arrayItem) => {
                var myData = {
                  user: arrayItem,
                  personal: null
                };
                xAll.push(myData);
              })
              xAll.sort(function(a,b) {return (a.user.signedDate > b.user.signedDate) ? -1 : ((b.user.signedDate > a.user.signedDate) ? 1 : 0);} );
              res.send({
                users: xAll
              });
            }
          })
        }
      })
    }
  })

});

router.get('/getprofile', (req, res) => {
  var userId = req.query.userId;
  var today = new Date();
  var maxProgress = {
    video: 480,
    book: 80,
    task: 144,
    insight: 8
  };
  var myProgress = {
    video: '',
    book: '',
    task: '',
    insight: ''
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
            Book.findOne({week: findDifferenceWeek, department: user.department}, (err, book) => {
              if(err){
                console.log(err);
              } else {

                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference, department: user.department}, (err, movie) => {
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
                                  if(arrayItem.type = "movie"){
                                    arrayItem.num = tempCount;
                                  }
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
            Book.findOne({week: findDifferenceWeek, department: user.department}, (err, book) => {
              if(err){
                console.log(err);
              } else {
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference, department: user.department}, (err, movie) => {
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
                                  if(arrayItem.type == "movie"){
                                    arrayItem.num = tempCount;
                                  }
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
        });
      }
  });
});

router.get('/getnotes', (req, res) => {
  var xAll = [];
  var myData = {};
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) {return res.status(401).end();}
    else if (decoded.department == 'all'){
      User.find({status: 2}, (err, users) => {
        if(err){ console.log(err) }
        else {
          BookNotes.find((err, booknotes) =>{
            if(err){ console.log(err) }
            else{
              MovieNotes.find((err, movienotes) => {
                if(err){ console.log(err) }
                else{
                  MyFile.find((err, myfiles) => {
                    if(err){ console.log(err) }
                    else { //если все есть
                      Insight.find((err, insights) => {
                        if(err){ console.log(err) }
                        else {
                          booknotes.forEach((bookItem) => {
                            users.forEach((userItem) => {
                              if(bookItem.userId.toString() == userItem._id.toString()){
                                myData = {
                                  _id: bookItem._id,
                                  date: bookItem.date,
                                  username: userItem.name,
                                  type: 'book',
                                  department: bookItem.department
                                }
                                xAll.push(myData);
                              }
                            })
                          });
                          movienotes.forEach((movieItem) => {
                            users.forEach((userItem) => {
                              if(movieItem.userId.toString() == userItem._id.toString()){
                                myData = {
                                  _id: movieItem._id,
                                  date: movieItem.date,
                                  username: userItem.name,
                                  type: 'movie',
                                  department: movieItem.department
                                }
                                xAll.push(myData);
                              }
                            })
                          });
                          myfiles.forEach((fileItem) => {
                            users.forEach((userItem) => {
                              if(fileItem.userId.toString() == userItem._id.toString()){
                                myData = {
                                  _id: fileItem._id,
                                  date: fileItem.date,
                                  username: userItem.name,
                                  type: 'lesson',
                                  department: fileItem.department
                                }
                                xAll.push(myData);
                              }
                            })
                          });
                          insights.forEach((insightItem) => {
                            users.forEach((userItem) => {
                              if(insightItem.userId.toString() == userItem._id.toString()){
                                myData = {
                                  _id: insightItem._id,
                                  date: insightItem.date,
                                  username: userItem.name,
                                  type: 'insight',
                                  department: insightItem.department
                                }
                                xAll.push(myData);
                              }
                            })
                          });
                          xAll.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} );
                          res.json({
                            notes: xAll
                          });
                        }
                      })
                    } //else if(myfiles)
                  })
                }
              })
            }
          })
        }
      })
    } else {
      User.find({status: 2, department: decoded.department}, (err, users) => {
        if(err){ console.log(err) }
        else {
          BookNotes.find({department: decoded.department}, (err, booknotes) =>{
            if(err){ console.log(err) }
            else{
              MovieNotes.find({department: decoded.department}, (err, movienotes) => {
                if(err){ console.log(err) }
                else{
                  MyFile.find({department: decoded.department}, (err, myfiles) => {
                    if(err){ console.log(err) }
                    else { //если все есть
                      Insight.find({department: decoded.department}, (err, insights) => {
                        if(err){ console.log(err) }
                        else {
                          booknotes.forEach((bookItem) => {
                            users.forEach((userItem) => {
                              if(bookItem.userId.toString() == userItem._id.toString()){
                                myData = {
                                  _id: bookItem._id,
                                  date: bookItem.date,
                                  username: userItem.name,
                                  type: 'book',
                                  department: bookItem.department
                                }
                                xAll.push(myData);
                              }
                            })
                          });
                          movienotes.forEach((movieItem) => {
                            users.forEach((userItem) => {
                              if(movieItem.userId.toString() == userItem._id.toString()){
                                myData = {
                                  _id: movieItem._id,
                                  date: movieItem.date,
                                  username: userItem.name,
                                  type: 'movie',
                                  department: movieItem.department
                                }
                                xAll.push(myData);
                              }
                            })
                          });
                          myfiles.forEach((fileItem) => {
                            users.forEach((userItem) => {
                              if(fileItem.userId.toString() == userItem._id.toString()){
                                myData = {
                                  _id: fileItem._id,
                                  date: fileItem.date,
                                  username: userItem.name,
                                  type: 'lesson',
                                  department: fileItem.department
                                }
                                xAll.push(myData);
                              }
                            })
                          });
                          insights.forEach((insightItem) => {
                            users.forEach((userItem) => {
                              if(insightItem.userId.toString() == userItem._id.toString()){
                                myData = {
                                  _id: insightItem._id,
                                  date: insightItem.date,
                                  username: userItem.name,
                                  type: 'insight',
                                  department: insightItem.department
                                }
                                xAll.push(myData);
                              }
                            })
                          });
                          xAll.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} );
                          res.json({
                            notes: xAll
                          });
                        }
                      })
                    } //else if(myfiles)
                  })
                }
              })
            }
          })
        }
      })
    }
  })
});

router.get('/getmovienote', (req, res) => {
  var movieNoteId = req.query.movieNoteId;
  MovieNotes.findOne({_id: movieNoteId}, (err, movienote) => {
    if(err) { console.log(err) }
    else {
      User.findOne({_id: movienote.userId}, (err, user) => {
        if(err) { console.log(err) }
        else {
          Movie.findOne({_id: movienote.movieId}, (err, movie) => {
            if(err) { console.log(err) }
            else {
              res.send({
                movienote: movienote,
                user: user,
                movie: movie
              })
            }
          })
        }
      })
    }
  })
});

router.get('/getinsightnote', (req, res) => {
  var insightNoteId = req.query.insightNoteId;
  Insight.findOne({_id: insightNoteId}, (err, insight) => {
    if(err) { console.log(err) }
    else {
      User.findOne({_id: insight.userId}, (err, user) => {
        if(err) { console.log(err) }
        else {
          res.send({
            user: user,
            insight: insight
          })
        }
      })
    }
  })
});

router.get('/getbooknote', (req, res) => {
  var bookNoteId = req.query.bookNoteId;
  BookNotes.findOne({_id: bookNoteId}, (err, booknote) => {
    if(err) { console.log(err) }
    else {
      User.findOne({_id: booknote.userId}, (err, user) => {
        if(err) { console.log(err) }
        else {
          Book.findOne({_id: booknote.bookId}, (err, book) => {
            if(err) { console.log(err) }
            else {
              res.send({
                booknote: booknote,
                user: user,
                book: book
              })
            }
          })
        }
      })
    }
  })
});

router.get('/getlessonnote', (req, res) => {
  var lessonNoteId = req.query.lessonNoteId;
  MyFile.findOne({_id: lessonNoteId}, (err, lessonnote) => {
    if(err) { console.log(err) }
    else {
      User.findOne({_id: lessonnote.userId}, (err, user) => {
        if(err) { console.log(err) }
        else {
          Lesson.findOne({_id: lessonnote.lessonId}, (err, lesson) => {
            if(err) { console.log(err) }
            else {
              res.send({
                lessonnote: lessonnote,
                user: user,
                lesson: lesson
              })
            }
          })
        }
      })
    }
  })
});

//POST REQUESTS

router.post('/addbook', (req, res, err) => {
    var bookID = req.body.bookId.trim();
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if(err) {return res.status(401).end();}
      else if (decoded.department == 'all'){
        const bookData = {
          title: req.body.bookTitle.trim(),
          description: req.body.bookDescription.trim(),
          url: req.body.bookUrl.trim(),
          week: 1,
          department: req.body.chosenDepartment.trim()
        };
        Book.find({department: bookData.department}, (err, book) => {
          if(err){
            console.log(err);
          }
          else if(book){
            if(bookID.length > 0){
              Book.findOneAndUpdate({_id: bookID}, { $set: {title: bookData.title, description: bookData.description, url: bookData.url}}, { new: true }, function (err, book) {
                if (err){
                  console.log(err);
                }
                res.json({
                  success: true,
                  book: book,
                  message: 'Изменено'
                });
              })
            }
            else {
              var thisWeek = book.length + 1;
              const bookDataS = {
                title: req.body.bookTitle.trim(),
                description: req.body.bookDescription.trim(),
                url: req.body.bookUrl.trim(),
                week: thisWeek,
                department: req.body.chosenDepartment.trim()
              };
              const newBook = new Book(bookDataS);
              newBook.save((err, book) => {
                if (err) { console.log(err); }
                  res.json({
                      success: true,
                      book: book,
                      message: 'Добавлено'
                  });
                })
              }
          }
          else {
            const newBook = new Book(bookData);
            newBook.save((err, book) => {
              if (err) { console.log(err); }

              res.json({
                  success: true,
                  book: book,
                  message: 'Добавлено'
              });
              })
          }
        })
      } else {
        const bookData = {
          title: req.body.bookTitle.trim(),
          description: req.body.bookDescription.trim(),
          url: req.body.bookUrl.trim(),
          week: 1,
          department: decoded.department
        };
        Book.find({department: decoded.department}, (err, book) => {
          if(err){
            console.log(err);
          }
          else if(book){
            if(bookID.length > 0){
              Book.findOneAndUpdate({_id: bookID}, { $set: {title: bookData.title, description: bookData.description, url: bookData.url}}, { new: true }, function (err, book) {
                if (err){
                  console.log(err);
                }
                res.json({
                  success: true,
                  book: book,
                  message: 'Изменено'
                });
              })
            }
            else {
              var thisWeek = book.length + 1;
              const bookDataS = {
                title: req.body.bookTitle.trim(),
                description: req.body.bookDescription.trim(),
                url: req.body.bookUrl.trim(),
                week: thisWeek,
                department: decoded.department
              };
              const newBook = new Book(bookDataS);
              newBook.save((err, book) => {
                if (err) { console.log(err); }
                  res.json({
                      success: true,
                      book: book,
                      message: 'Добавлено'
                  });
                })
              }
          }
          else {
            const newBook = new Book(bookData);
            newBook.save((err, book) => {
              if (err) { console.log(err); }

              res.json({
                  success: true,
                  book: book,
                  message: 'Добавлено'
              });
              })
          }
        })
      }
    })
});

router.post('/addmovie', (req, res, err) => {
    var movieID = req.body.movieId.trim();
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if(err) {return res.status(401).end();}
      else if (decoded.department == 'all'){
        const movieData = {
          title: req.body.movieTitle.trim(),
          description: req.body.movieDescription.trim(),
          url: req.body.movieUrl.trim(),
          day: 1,
          department: req.body.chosenDepartment.trim()
        };
        Movie.find({department: movieData.department}, (err, movie) => {
          if(err){
            console.log(err);
          }
          else if(movie){
            if(movieID.length > 0){
              Movie.findOneAndUpdate({_id: movieID}, { $set: {title: movieData.title, description: movieData.description, url: movieData.url}}, { new: true }, function (err, movie) {
                if (err){
                  console.log(err);
                }
                res.json({
                  success: true,
                  movie: movie,
                  message: 'Изменено'
                });
              })
            }
            else {
              var thisDay = movie.length + 1;
              if((thisDay == 7) || (thisDay == 14) || (thisDay == 21)
                                || (thisDay == 28) || (thisDay == 35)
                                || (thisDay == 42) ||(thisDay == 49)){
                thisDay++;
              }
              const movieDataS = {
                title: req.body.movieTitle.trim(),
                description: req.body.movieDescription.trim(),
                url: req.body.movieUrl.trim(),
                day: thisDay,
                department: req.body.chosenDepartment.trim()
              };
              const newMovie = new Movie(movieDataS);
              newMovie.save((err, movie) => {
                if (err) { console.log(err); }
                res.json({
                    success: true,
                    movie: movie,
                    message: 'Добавлено'
                });
                })
            }

          }
          else {
            const newMovie = new Movie(movieData);
            newMovie.save((err, movie) => {
              if (err) { console.log(err); }

              res.json({
                  success: true,
                  movie: movie,
                  message: 'Добавлено'
              });
              })
          }
        })
      } else {
        const movieData = {
          title: req.body.movieTitle.trim(),
          description: req.body.movieDescription.trim(),
          url: req.body.movieUrl.trim(),
          day: 1,
          department: decoded.department
        };
        Movie.find({department: decoded.department}, (err, movie) => {
          if(err){
            console.log(err);
          }
          else if(movie){
            if(movieID.length > 0){
              Movie.findOneAndUpdate({_id: movieID}, { $set: {title: movieData.title, description: movieData.description, url: movieData.url}}, { new: true }, function (err, movie) {
                if (err){
                  console.log(err);
                }
                res.json({
                  success: true,
                  movie: movie,
                  message: 'Изменено'
                });
              })
            }
            else {
              var thisDay = movie.length + 1;
              if((thisDay == 7) || (thisDay == 14) || (thisDay == 21)
                                || (thisDay == 28) || (thisDay == 35)
                                || (thisDay == 42) ||(thisDay == 49)){
                thisDay++;
              }
              const movieDataS = {
                title: req.body.movieTitle.trim(),
                description: req.body.movieDescription.trim(),
                url: req.body.movieUrl.trim(),
                day: thisDay,
                department: decoded.department
              };
              const newMovie = new Movie(movieDataS);
              newMovie.save((err, movie) => {
                if (err) { console.log(err); }
                res.json({
                    success: true,
                    movie: movie,
                    message: 'Добавлено'
                });
                })
            }

          }
          else {
            const newMovie = new Movie(movieData);
            newMovie.save((err, movie) => {
              if (err) { console.log(err); }

              res.json({
                  success: true,
                  movie: movie,
                  message: 'Добавлено'
              });
              })
          }
        })
      }
    })
});

router.post('/addlesson', (req, res, err) => {
    var lessonID = req.body.lessonId.trim();
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if(err) {return res.status(401).end();}
      else if (decoded.department == 'all'){
        var lessonTasks = [req.body.lessonTask1.trim(), req.body.lessonTask2.trim(), req.body.lessonTask3.trim()];
        const lessonData = {
          title: req.body.lessonTitle.trim(),
          description: req.body.lessonDescription.trim(),
          url: req.body.lessonUrl.trim(),
          tasks: lessonTasks,
          day: 1,
          department: req.body.chosenDepartment.trim()
        };
          Lesson.find({department: lessonData.department}, (err, lesson) => {
            if(err){
              console.log(err);
            }
            else if(lesson){
              if(lessonID.length > 0){
                Lesson.findOneAndUpdate({_id: lessonID}, { $set: {title: lessonData.title, description: lessonData.description, url: lessonData.url, tasks: lessonData.tasks}}, { new: true }, function (err, lesson) {
                  if (err){
                    console.log(err);
                  }
                  res.json({
                    success: true,
                    lesson: lesson,
                    message: 'Изменено'
                  });
                })
              }
              else {
                var thisDay = lesson.length + 1;
                if((thisDay == 7) || (thisDay == 14) || (thisDay == 21)
                                  || (thisDay == 28) || (thisDay == 35)
                                  || (thisDay == 42) ||(thisDay == 49)){
                  thisDay++;
                }
                const lessonDataS = {
                  title: req.body.lessonTitle.trim(),
                  description: req.body.lessonDescription.trim(),
                  url: req.body.lessonUrl.trim(),
                  tasks: [req.body.lessonTask1.trim(), req.body.lessonTask2.trim(), req.body.lessonTask3.trim()],
                  day: thisDay,
                  department: req.body.chosenDepartment.trim()
                };
                const newLesson = new Lesson(lessonDataS);
                newLesson.save((err, lesson) => {
                  if (err) { console.log(err); }
                  res.json({
                      success: true,
                      lesson: lesson,
                      message: 'Добавлено'
                  });
                  })
              }
            }
            else {
              const newLesson = new Lesson(lessonData);
              newLesson.save((err, lesson) => {
                if (err) { console.log(err); }

                res.json({
                    success: true,
                    lesson: lesson,
                    message: 'Добавлено'
                });
                })
            }
          })
      } else {
        var lessonTasks = [req.body.lessonTask1.trim(), req.body.lessonTask2.trim(), req.body.lessonTask3.trim()];
        const lessonData = {
          title: req.body.lessonTitle.trim(),
          description: req.body.lessonDescription.trim(),
          url: req.body.lessonUrl.trim(),
          tasks: lessonTasks,
          day: 1,
          department: decoded.department
        };
          Lesson.find({department: decoded.department}, (err, lesson) => {
            if(err){
              console.log(err);
            }
            else if(lesson){
              if(lessonID.length > 0){
                Lesson.findOneAndUpdate({_id: lessonID}, { $set: {title: lessonData.title, description: lessonData.description, url: lessonData.url, tasks: lessonData.tasks}}, { new: true }, function (err, lesson) {
                  if (err){
                    console.log(err);
                  }
                  res.json({
                    success: true,
                    lesson: lesson,
                    message: 'Изменено'
                  });
                })
              }
              else {
                var thisDay = lesson.length + 1;
                if((thisDay == 7) || (thisDay == 14) || (thisDay == 21)
                                  || (thisDay == 28) || (thisDay == 35)
                                  || (thisDay == 42) ||(thisDay == 49)){
                  thisDay++;
                }
                const lessonDataS = {
                  title: req.body.lessonTitle.trim(),
                  description: req.body.lessonDescription.trim(),
                  url: req.body.lessonUrl.trim(),
                  tasks: [req.body.lessonTask1.trim(), req.body.lessonTask2.trim(), req.body.lessonTask3.trim()],
                  day: thisDay,
                  department: decoded.department
                };
                const newLesson = new Lesson(lessonDataS);
                newLesson.save((err, lesson) => {
                  if (err) { console.log(err); }
                  res.json({
                      success: true,
                      lesson: lesson,
                      message: 'Добавлено'
                  });
                  })
              }
            }
            else {
              const newLesson = new Lesson(lessonData);
              newLesson.save((err, lesson) => {
                if (err) { console.log(err); }

                res.json({
                    success: true,
                    lesson: lesson,
                    message: 'Добавлено'
                });
                })
            }
          })
      }
    })
});

router.post('/settings', (req, res, err) => {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if(err) {return res.status(401).end();}
      else if (decoded.department == 'all'){
        var myPoints = JSON.parse(req.body.myPoints);
        var department = req.body.department;
        if(department == "Дизайн"){
          Points.findOneAndUpdate({_id: myPoints[0]._id}, { $set: {video: myPoints[0].video, book: myPoints[0].book, task: myPoints[0].task, insight: myPoints[0].insight}}, { new: true }, function (err, points) {
            if (err){
              console.log(err);
            }
            else {
              res.json({
                points: points,
                checkChangeDesign: false,
                department: department
              });
            }
          })
        } else {
          Points.findOneAndUpdate({_id: myPoints[1]._id}, { $set: {video: myPoints[1].video, book: myPoints[1].book, task: myPoints[1].task, insight: myPoints[1].insight}}, { new: true }, function (err, points) {
            if (err){
              console.log(err);
            }
            else {
              res.json({
                points: points,
                checkChangeProgramming: false,
                department: department
              });
            }
          })
        }
      } else {
        var _id = req.body._id.trim();
        var videoPoints = req.body.videoPoints.trim();
        var bookPoints = req.body.bookPoints.trim();
        var taskPoints = req.body.taskPoints.trim();
        var insightPoints = req.body.insightPoints.trim();
        Points.findOneAndUpdate({_id: _id}, { $set: {video: videoPoints, book: bookPoints, task: taskPoints, insight: insightPoints}}, { new: true }, function (err, points) {
          if (err){
            console.log(err);
          }
          else {
            res.json({
              myPoints: points
            });
          }
        })
      }
    })
});

router.post('/approvenote', (req, res, err) => {
  const type = req.body.type.trim();
  const noteId = req.body.noteId.trim();
  const userId = req.body.userId.trim();
  const incType = req.body.incType.trim();
  Points.find((err, points) => {
    if (err){ console.log(err); }
    else {
      if(type == 'movie'){
        if(incType == 'approve'){
          MovieNotes.findOneAndUpdate({_id: noteId}, {$set: {approved: 1}}, {new: true}, (err, movienote) => {
            if (err){
              console.log(err);
            } else {
              User.findOneAndUpdate({_id: userId}, {$inc: { points: points[0].video } }, (err, user) => {
                if (err){
                  console.log(err);
                } else {
                  res.json({
                    movienote: movienote
                  });
                }
              })
            }
          })
        } else if(incType == 'disapprove'){
          MovieNotes.findOneAndUpdate({_id: noteId}, {$set: {approved: 2}}, {new: true}, (err, movienote) => {
            if (err){
              console.log(err);
            } else {
                res.json({
                  movienote: movienote
                });
            }
          })
        }
      } else if(type == 'book'){
        if(incType == 'approve'){
          BookNotes.findOneAndUpdate({_id: noteId}, {$set: {approved: 1}}, {new: true}, (err, booknote) => {
            if (err){
              console.log(err);
            } else {
              User.findOneAndUpdate({_id: userId}, {$inc: { points: points[0].book } }, (err, user) => {
                if (err){
                  console.log(err);
                } else {
                  res.json({
                    booknote: booknote
                  });
                }
              })
            }
          })
        } else if(incType == 'disapprove'){
          BookNotes.findOneAndUpdate({_id: noteId}, {$set: {approved: 2}}, {new: true}, (err, booknote) => {
            if (err){
              console.log(err);
            } else {
                res.json({
                  booknote: booknote
                });
            }
          })
        }
      } else if(type == "lesson"){
        if(incType == 'approve'){
          MyFile.findOneAndUpdate({_id: noteId}, {$set: {approved: 1}}, {new: true}, (err, lessonnote) => {
            if (err){
              console.log(err);
            } else {
              User.findOneAndUpdate({_id: userId}, {$inc: { points: points[0].task } }, (err, user) => {
                if (err){
                  console.log(err);
                } else {
                  res.json({
                    lessonnote: lessonnote
                  });
                }
              })
            }
          })
        } else if(incType == 'disapprove'){
          MyFile.findOneAndUpdate({_id: noteId}, {$set: {approved: 2}}, {new: true}, (err, lessonnote) => {
            if (err){
              console.log(err);
            } else {
                res.json({
                  lessonnote: lessonnote
                });
            }
          })
        }
      }else if(type == "insight"){
        if(incType == 'approve'){
          Insight.findOneAndUpdate({_id: noteId}, {$set: {approved: 1}}, {new: true}, (err, insight) => {
            if (err){
              console.log(err);
            } else {
              User.findOneAndUpdate({_id: userId}, {$inc: { points: points[0].insight } }, (err, user) => {
                if (err){
                  console.log(err);
                } else {
                  res.json({
                    insight: insight
                  });
                }
              })
            }
          })
        } else if(incType == 'disapprove'){
          Insight.findOneAndUpdate({_id: noteId}, {$set: {approved: 2}}, {new: true}, (err, insight) => {
            if (err){
              console.log(err);
            } else {
                res.json({
                  insight: insight
                });
            }
          })
        }
      }
    }
  })
});

module.exports = router;

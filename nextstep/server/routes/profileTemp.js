const express = require('express');
var jwtDecode = require('jwt-decode');
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
var moment = require('moment');
moment.locale('ru');

let multiparty = require('multiparty');
let fs = require('fs');

//GET REQUESTS

router.get('/profile', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userId = decoded.sub;
  var today = new Date();
  var maxProgress = {
    video: 48,
    book: 8,
    task: 144,
    insight: 8
  };
  var myProgress = {
    video: '',
    book: '',
    task: '',
    insight: ''
  };
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
              } else if(book){
                myProgress.book = (Math.round((findDifferenceWeek-1)*100/maxProgress.book))+'%';
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference}, (err, movie) => {
                  if(err){
                    console.log(err);
                  } else if(movie){
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            BookNotes.find({userId: user._id, bookId: book._id}, (err, booknotes) => {
                              var xAll = [];

                              booknotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var bookDate = {
                                        num: booknotes.length,
                                        title: book.title,
                                        date: arrayItem.date,
                                        type: "book"
                                    };
                                    xAll.push(bookDate);
                                  }
                              });

                              MovieNotes.find({userId: user._id, movieId: movie._id}, (err, movienotes) => {
                                movienotes.forEach( function (arrayItem){
                                    if(arrayItem.date.toDateString() == today.toDateString()){
                                      var movieDate = {
                                        num: movienotes.length,
                                        title: movie.title,
                                        date: arrayItem.date,
                                        type: "movie"
                                      };
                                      xAll.push(movieDate);
                                    }
                                });
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
                  else {
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            BookNotes.find({userId: user._id, bookId: book._id}, (err, booknotes) => {
                              var xAll = [];
                              booknotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var bookDate = {
                                        num: booknotes.length,
                                        title: book.title,
                                        date: arrayItem.date,
                                        type: "book"
                                    };
                                    xAll.push(bookDate);
                                  }
                              });
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
                          }
                        })
                      }
                    })
                  }
                })
              }
              else {
                myProgress.book = (Math.round((findDifferenceWeek-1)*100/maxProgress.book))+'%';
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference}, (err, movie) => {
                  if(err){
                    console.log(err);
                  } else if(movie){
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            var xAll = [];
                            MovieNotes.find({userId: user._id, movieId: movie._id}, (err, movienotes) => {
                              movienotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var movieDate = {
                                      num: movienotes.length,
                                      title: movie.title,
                                      date: arrayItem.date,
                                      type: "movie"
                                    };
                                    xAll.push(movieDate);
                                  }
                              });
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
                          }
                        })
                      }
                    })
                  }
                  else {
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            res.json({
                              user: user,
                              personalInfo: personalInfo,
                              myProgress: myProgress
                            });
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
              } else if(book){
                myProgress.book = (Math.round((findDifferenceWeek-1)*100/maxProgress.book))+'%';
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference}, (err, movie) => {
                  if(err){
                    console.log(err);
                  } else if(movie){
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            BookNotes.find({userId: user._id, bookId: book._id}, (err, booknotes) => {
                              var xAll = [];
                              booknotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var bookDate = {
                                        num: booknotes.length,
                                        title: book.title,
                                        date: arrayItem.date,
                                        type: "book"
                                    };
                                    xAll.push(bookDate);
                                  }
                              });

                              MovieNotes.find({userId: user._id, movieId: movie._id}, (err, movienotes) => {
                                movienotes.forEach( function (arrayItem){
                                    if(arrayItem.date.toDateString() == today.toDateString()){
                                      var movieDate = {
                                        num: movienotes.length,
                                        title: movie.title,
                                        date: arrayItem.date,
                                        type: "movie"
                                      };
                                      xAll.push(movieDate);
                                    }
                                });
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
                  else {
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            BookNotes.find({userId: user._id, bookId: book._id}, (err, booknotes) => {
                              var xAll = [];
                              booknotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var bookDate = {
                                        num: booknotes.length,
                                        title: book.title,
                                        date: arrayItem.date,
                                        type: "book"
                                    };
                                    xAll.push(bookDate);
                                  }
                              });
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
                          }
                        })
                      }
                    })
                  }
                })
              }
              else {
                myProgress.book = (Math.round((findDifferenceWeek-1)*100/maxProgress.book))+'%';
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference}, (err, movie) => {
                  if(err){
                    console.log(err);
                  } else if(movie){
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            var xAll = [];
                            MovieNotes.find({userId: user._id, movieId: movie._id}, (err, movienotes) => {
                              movienotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var movieDate = {
                                      num: movienotes.length,
                                      title: movie.title,
                                      date: arrayItem.date,
                                      type: "movie"
                                    };
                                    xAll.push(movieDate);
                                  }
                              });
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
                          }
                        })
                      }
                    })
                  }
                  else {
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            res.json({
                              user: user,
                              myProgress: myProgress
                            });
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

});

router.get('/added', (req, res) => {
  var today = new Date();

  Book.find().exec(function(err, book){
  if(err){
    console.log(err);
  }
  else {
      Movie.find().exec(function(err, movie){
        if(err){
          console.log(err);
        }
        Lesson.find().exec(function(err, lesson){
          if(err){
            console.log(err);
          }
          else if(book && movie && lesson){
            res.json({
                book: book,
                movie: movie,
                lesson: lesson
            });
          } else if (book && movie && !lesson){
            res.json({
                book: book,
                movie: movie,
                message: "Уроков не найдено"
            });
          } else if (book && !movie && lesson){
            res.json({
                book: book,
                lesson: lesson,
                message: "Фильмов не найдено"
            });
          } else if (!book && movie && lesson){
            res.json({
                movie: movie,
                lesson: lesson,
                message: "Книг не найдено"
            });
          } else if (!book && !movie && lesson){
            res.json({
                lesson: lesson,
                message: "Книг и фильмов не найдено"
            });
          } else if (!book && movie && !lesson){
            res.json({
                movie: movie,
                message: "Книг и фильмов не найдено"
            });
          } else if (book && !movie && !lesson){
            res.json({
                book: book,
                message: "Книг и фильмов не найдено"
            });
          } else {
            res.json({
                message: "Ничего не найдено"
            });
          }
        })
      })
    }
  })
});

router.get('/getmovie', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
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
});

router.get('/getbook', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
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
});

router.get('/getlesson', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
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
});

router.get('/insight', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
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
});

router.get('/getpoints', (req, res) => {
  Points.findOne((err, points) => {
    if(err){
      console.log(err)
    } else {
      res.send({
        myPoints: points
      });
    }
  })
});

router.get('/getusers', (req, res) => {
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
});

router.get('/getprofile', (req, res) => {
  var userId = req.query.userId;
  var today = new Date();
  var maxProgress = {
    video: 48,
    book: 8,
    task: 144,
    insight: 8
  };
  var myProgress = {
    video: '',
    book: '',
    task: '',
    insight: ''
  };
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
              } else if(book){
                myProgress.book = (Math.round((findDifferenceWeek-1)*100/maxProgress.book))+'%';
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference}, (err, movie) => {
                  if(err){
                    console.log(err);
                  } else if(movie){
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            BookNotes.find({userId: user._id, bookId: book._id}, (err, booknotes) => {
                              var xAll = [];

                              booknotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var bookDate = {
                                        num: booknotes.length,
                                        title: book.title,
                                        date: arrayItem.date,
                                        type: "book"
                                    };
                                    xAll.push(bookDate);
                                  }
                              });

                              MovieNotes.find({userId: user._id, movieId: movie._id}, (err, movienotes) => {
                                movienotes.forEach( function (arrayItem){
                                    if(arrayItem.date.toDateString() == today.toDateString()){
                                      var movieDate = {
                                        num: movienotes.length,
                                        title: movie.title,
                                        date: arrayItem.date,
                                        type: "movie"
                                      };
                                      xAll.push(movieDate);
                                    }
                                });
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
                  else {
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            BookNotes.find({userId: user._id, bookId: book._id}, (err, booknotes) => {
                              var xAll = [];
                              booknotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var bookDate = {
                                        num: booknotes.length,
                                        title: book.title,
                                        date: arrayItem.date,
                                        type: "book"
                                    };
                                    xAll.push(bookDate);
                                  }
                              });
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
                          }
                        })
                      }
                    })
                  }
                })
              }
              else {
                myProgress.book = (Math.round((findDifferenceWeek-1)*100/maxProgress.book))+'%';
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference}, (err, movie) => {
                  if(err){
                    console.log(err);
                  } else if(movie){
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                          }
                        })
                      }
                    })
                    var xAll = [];
                    MovieNotes.find({userId: user._id, movieId: movie._id}, (err, movienotes) => {
                      movienotes.forEach( function (arrayItem){
                          if(arrayItem.date.toDateString() == today.toDateString()){
                            var movieDate = {
                              num: movienotes.length,
                              title: movie.title,
                              date: arrayItem.date,
                              type: "movie"
                            };
                            xAll.push(movieDate);
                          }
                      });
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
                  }
                  else {
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            res.json({
                              user: user,
                              personalInfo: personalInfo,
                              myProgress: myProgress
                            });
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
              } else if(book){
                myProgress.book = (Math.round((findDifferenceWeek-1)*100/maxProgress.book))+'%';
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference}, (err, movie) => {
                  if(err){
                    console.log(err);
                  } else if(movie){
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            BookNotes.find({userId: user._id, bookId: book._id}, (err, booknotes) => {
                              var xAll = [];
                              booknotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var bookDate = {
                                        num: booknotes.length,
                                        title: book.title,
                                        date: arrayItem.date,
                                        type: "book"
                                    };
                                    xAll.push(bookDate);
                                  }
                              });

                              MovieNotes.find({userId: user._id, movieId: movie._id}, (err, movienotes) => {
                                movienotes.forEach( function (arrayItem){
                                    if(arrayItem.date.toDateString() == today.toDateString()){
                                      var movieDate = {
                                        num: movienotes.length,
                                        title: movie.title,
                                        date: arrayItem.date,
                                        type: "movie"
                                      };
                                      xAll.push(movieDate);
                                    }
                                });
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
                  else {
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            BookNotes.find({userId: user._id, bookId: book._id}, (err, booknotes) => {
                              var xAll = [];
                              booknotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var bookDate = {
                                        num: booknotes.length,
                                        title: book.title,
                                        date: arrayItem.date,
                                        type: "book"
                                    };
                                    xAll.push(bookDate);
                                  }
                              });
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
                          }
                        })
                      }
                    })
                  }
                })
              }
              else {
                myProgress.book = (Math.round((findDifferenceWeek-1)*100/maxProgress.book))+'%';
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                var findDifference = Math.round((today - userSignedDate) / millisecondsPerDay)+1;
                Movie.findOne({day: findDifference}, (err, movie) => {
                  if(err){
                    console.log(err);
                  } else if(movie){
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            var xAll = [];
                            MovieNotes.find({userId: user._id, movieId: movie._id}, (err, movienotes) => {
                              movienotes.forEach( function (arrayItem){
                                  if(arrayItem.date.toDateString() == today.toDateString()){
                                    var movieDate = {
                                      num: movienotes.length,
                                      title: movie.title,
                                      date: arrayItem.date,
                                      type: "movie"
                                    };
                                    xAll.push(movieDate);
                                  }
                              });
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
                          }
                        })
                      }
                      })
                  }
                  else {
                    myProgress.video = (Math.round((findDifference-1)*100/maxProgress.video))+'%';
                    Lesson.findOne({day: findDifference}, (err, lesson) => {
                      if(err){
                        console.log(err);
                      } else {
                        myProgress.task = (Math.round((findDifference-1)*100/maxProgress.task))+'%';
                        Insight.find({userId: user._id}, (err, insight) => {
                          if(err){
                            console.log(err);
                          } else {
                            myProgress.insight = (Math.round(insight.length*100/maxProgress.insight))+'%';
                            res.json({
                              user: user,
                              myProgress: myProgress
                            });
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
  User.find({status: 2}, (err, users) => {
    if(err){ console.log(err) }
    else {
      BookNotes.find((err, booknotes) =>{
        if(err){ console.log(err) }
        else if (booknotes.length > 0){
          MovieNotes.find((err, movienotes) => {
            if(err){ console.log(err) }
            else if (movienotes.length > 0){
              MyFile.find((err, myfiles) => {
                if(err){ console.log(err) }
                else if(myfiles.length > 0){ //если все есть
                  booknotes.forEach((bookItem) => {
                    users.forEach((userItem) => {
                      if(bookItem.userId.toString() == userItem._id.toString()){
                        myData = {
                          _id: bookItem._id,
                          date: bookItem.date,
                          username: userItem.name,
                          type: 'book'
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
                          type: 'movie'
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
                          type: 'lesson'
                        }
                        xAll.push(myData);
                      }
                    })
                  });
                  xAll.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} );
                  res.json({
                    notes: xAll
                  });
                } //else if(myfiles)
                else { //если есть заметки для книг и фильмов, но нет файлов
                  booknotes.forEach((bookItem) => {
                    users.forEach((userItem) => {
                      if(bookItem.userId.toString() == userItem._id.toString()){
                        myData = {
                          _id: bookItem._id,
                          date: bookItem.date,
                          username: userItem.name,
                          type: 'book'
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
                          type: 'movie'
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
            } //else if (movienotes)
            else { // если нет фильмов
              MyFile.find((err, myfiles) => {
                if(err){ console.log(err) }
                else if(myfiles.length > 0){ // если есть для книг и файлов, но нет для фильмов
                  booknotes.forEach((bookItem) => {
                    users.forEach((userItem) => {
                      if(bookItem.userId.toString() == userItem._id.toString()){
                        myData = {
                          _id: bookItem._id,
                          date: bookItem.date,
                          username: userItem.name,
                          type: 'book'
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
                          type: 'lesson'
                        }
                        xAll.push(myData);
                      }
                    })
                  });
                  xAll.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} );
                  res.json({
                    notes: xAll
                  });
                } //else if(myfiles)
                else { // если есть для книг, но нет для фильмов и файлов
                  booknotes.forEach((bookItem) => {
                    users.forEach((userItem) => {
                      if(bookItem.userId.toString() == userItem._id.toString()){
                        myData = {
                          _id: bookItem._id,
                          date: bookItem.date,
                          username: userItem.name,
                          type: 'book'
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
            }
          })
        } //else if (booknotes)
        else{ //если нет книг
          MovieNotes.find((err, movienotes) => {
            if(err){ console.log(err) }
            else if (movienotes.length > 0){
              MyFile.find((err, myfiles) => {
                if(err){ console.log(err) }
                else if(myfiles.length > 0){ //если есть для фильмов и файлов, но нет для книг
                  movienotes.forEach((movieItem) => {
                    users.forEach((userItem) => {
                      if(movieItem.userId.toString() == userItem._id.toString()){
                        myData = {
                          _id: movieItem._id,
                          date: movieItem.date,
                          username: userItem.name,
                          type: 'movie'
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
                          type: 'lesson'
                        }
                        xAll.push(myData);
                      }
                    })
                  });
                  xAll.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} );
                  res.json({
                    notes: xAll
                  });
                } //else if(myfiles)
                else { //если есть заметки для фильмов, но нет для файлов и книг
                  movienotes.forEach((movieItem) => {
                    users.forEach((userItem) => {
                      if(movieItem.userId.toString() == userItem._id.toString()){
                        myData = {
                          _id: movieItem._id,
                          date: movieItem.date,
                          username: userItem.name,
                          type: 'movie'
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
            } //else if (movienotes)
            else { // если нет фильмов и книг
              MyFile.find((err, myfiles) => {
                if(err){ console.log(err) }
                else if(myfiles.length > 0){ // если есть для файлов, но нет для фильмов и книг
                  myfiles.forEach((fileItem) => {
                    users.forEach((userItem) => {
                      if(fileItem.userId.toString() == userItem._id.toString()){
                        myData = {
                          _id: fileItem._id,
                          date: fileItem.date,
                          username: userItem.name,
                          type: 'lesson'
                        }
                        xAll.push(myData);
                      }
                    })
                  });
                  xAll.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} );
                  res.json({
                    notes: xAll
                  });
                } //else if(myfiles)
                else { // если нет ничего
                  res.json({
                    message: 'Еще никто не написал заметки'
                  });
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

router.post('/profileChange', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
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
          var decoded = jwtDecode(token);
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
        });
      });
    });
  })
});

router.post('/addbook', (req, res, err) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userstatus = decoded.userstatus;
  if(userstatus != 1){
    res.status(400).json({
      message: "Отказано в доступе"
    });
  }
  else {
    var bookID = req.body.bookId.trim();
    const bookData = {
      title: req.body.bookTitle.trim(),
      description: req.body.bookDescription.trim(),
      url: req.body.bookUrl.trim(),
      week: 1
    };

      Book.find().exec(function(err, book){
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
              week: thisWeek
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

});

router.post('/addmovie', (req, res, err) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userstatus = decoded.userstatus;
  if(userstatus != 1){
    res.status(400).json({
      message: "Отказано в доступе"
    });
  }
  else {
    var movieID = req.body.movieId.trim();
    const movieData = {
      title: req.body.movieTitle.trim(),
      description: req.body.movieDescription.trim(),
      url: req.body.movieUrl.trim(),
      day: 1
    };

      Movie.find().exec(function(err, movie){
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
              day: thisDay
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
});

router.post('/addlesson', (req, res, err) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userstatus = decoded.userstatus;
  if(userstatus != 1){
    res.status(400).json({
      message: "Отказано в доступе"
    });
  }
  else {
    var lessonID = req.body.lessonId.trim();
    var lessonTasks = [req.body.lessonTask1.trim(), req.body.lessonTask2.trim(), req.body.lessonTask3.trim()];
    const lessonData = {
      title: req.body.lessonTitle.trim(),
      description: req.body.lessonDescription.trim(),
      url: req.body.lessonUrl.trim(),
      tasks: lessonTasks,
      day: 1
    };

      Lesson.find().exec(function(err, lesson){
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
              day: thisDay
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
});

router.post('/insightUpload', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
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
});

router.post('/addmovienote', (req, res, err) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
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
});

router.post('/addbooknote', (req, res, err) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
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
});

router.post('/settings', (req, res, err) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwtDecode(token);
  var userstatus = decoded.userstatus;
  console.log("dsfbn")
  if(userstatus != 1){
    res.status(400).send({
      message: "Отказано в доступе"
    });
  }
  else {
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
      }
    }
  })

})

module.exports = router;

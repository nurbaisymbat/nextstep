import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Program from '../components/Program.jsx';
import axios from 'axios';

class ProgramPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //общие
      setActiveOne: 'navbar-brand myActive',
      setActiveTwo: 'navbar-brand',
      setActiveThree: 'navbar-brand',
      checkNavBar: 1,
      scheduleArrDays: [1,2,3,4,5,6],
      scheduleArrWeeks: [1,2,3,4,5,6,7,8],
      checkWeek: 1,

      //for book
      myBook: {
        _id: '',
        title: '',
        description: '',
        url: ''
      },
      myBookList: [{
        _id: '',
        title: '',
        description: '',
        url: ''
      }],

      //for movie
      myMovie: {
        _id: '',
        title: '',
        description: '',
        url: ''
      },
      myMovieList: [{
        _id: '',
        title: '',
        description: '',
        url: ''
      }],

      //for lesson
      myLesson: {
        _id: '',
        title: '',
        description: '',
        url: '',
        tasks: ['','','']
      },
      myLessonList: [{
        _id: '',
        title: '',
        description: '',
        url: '',
        tasks:['','','']
      }],

      //my nav
      activeOne: 'navbar-brand myActive',
      activeTwo: 'navbar-brand',
      activeThree: 'navbar-brand',
      activeFour: 'navbar-brand',
      activeFive: 'navbar-brand',
      activeSix: 'navbar-brand',
      activeSeven: 'navbar-brand',
      activeEight: 'navbar-brand'
    };
    //общие
    this.changeNavBar = this.changeNavBar.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.changeNavWeek = this.changeNavWeek.bind(this);

    //for book
    this.changeBookTitle = this.changeBookTitle.bind(this);
    this.onSubmitBook = this.onSubmitBook.bind(this);
    this.getThisBook = this.getThisBook.bind(this);
    this.setNewBook = this.setNewBook.bind(this);

    //for movie
    this.onSubmitMovie = this.onSubmitMovie.bind(this);
    this.changeMovie = this.changeMovie.bind(this);
    this.getThisMovie = this.getThisMovie.bind(this);
    this.setNewMovie = this.setNewMovie.bind(this);

    //for lesson
    this.onSubmitLesson = this.onSubmitLesson.bind(this);
    this.changeLesson = this.changeLesson.bind(this);
    this.getThisLesson = this.getThisLesson.bind(this);
    this.setNewLesson = this.setNewLesson.bind(this);
    this.changeLessonTask = this.changeLessonTask.bind(this);
  }

  //общие
  changeNavBar(event){
    var pageId = event.target.value;
    if(pageId == 2){
      this.setState({
        setActiveOne: 'navbar-brand',
        setActiveTwo: 'navbar-brand myActive',
        setActiveThree: 'navbar-brand',
        checkNavBar: 2
      });
    }else if(pageId == 3){
      this.setState({
        setActiveOne: 'navbar-brand',
        setActiveTwo: 'navbar-brand',
        setActiveThree: 'navbar-brand myActive',
        checkNavBar: 3
      });
    }else {
      this.setState({
        setActiveOne: 'navbar-brand myActive',
        setActiveTwo: 'navbar-brand',
        setActiveThree: 'navbar-brand',
        checkNavBar: 1
      });
    }
    this.onClickReset();
  }

  changeNavWeek(event){
    var weekId = event.target.value;
    switch (weekId) {
        case 1:
            this.setState({
              activeOne: 'navbar-brand myActive',
              activeTwo: 'navbar-brand',
              activeThree: 'navbar-brand',
              activeFour: 'navbar-brand',
              activeFive: 'navbar-brand',
              activeSix: 'navbar-brand',
              activeSeven: 'navbar-brand',
              activeEight: 'navbar-brand',
              checkWeek: 1
            });
            break;
        case 2:
            this.setState({
              activeOne: 'navbar-brand',
              activeTwo: 'navbar-brand myActive',
              activeThree: 'navbar-brand',
              activeFour: 'navbar-brand',
              activeFive: 'navbar-brand',
              activeSix: 'navbar-brand',
              activeSeven: 'navbar-brand',
              activeEight: 'navbar-brand',
              checkWeek: 2
            });
            break;
        case 3:
            this.setState({
              activeOne: 'navbar-brand',
              activeTwo: 'navbar-brand',
              activeThree: 'navbar-brand myActive',
              activeFour: 'navbar-brand',
              activeFive: 'navbar-brand',
              activeSix: 'navbar-brand',
              activeSeven: 'navbar-brand',
              activeEight: 'navbar-brand',
              checkWeek: 3
            });
            break;
        case 4:
            this.setState({
              activeOne: 'navbar-brand',
              activeTwo: 'navbar-brand',
              activeThree: 'navbar-brand',
              activeFour: 'navbar-brand myActive',
              activeFive: 'navbar-brand',
              activeSix: 'navbar-brand',
              activeSeven: 'navbar-brand',
              activeEight: 'navbar-brand',
              checkWeek: 4
            });
            break;
        case 5:
            this.setState({
              activeOne: 'navbar-brand',
              activeTwo: 'navbar-brand',
              activeThree: 'navbar-brand',
              activeFour: 'navbar-brand',
              activeFive: 'navbar-brand myActive',
              activeSix: 'navbar-brand',
              activeSeven: 'navbar-brand',
              activeEight: 'navbar-brand',
              checkWeek: 5
            });
            break;
        case 6:
            this.setState({
              activeOne: 'navbar-brand',
              activeTwo: 'navbar-brand',
              activeThree: 'navbar-brand',
              activeFour: 'navbar-brand',
              activeFive: 'navbar-brand',
              activeSix: 'navbar-brand myActive',
              activeSeven: 'navbar-brand',
              activeEight: 'navbar-brand',
              checkWeek: 6
            });
            break;
        case 7:
            this.setState({
              activeOne: 'navbar-brand',
              activeTwo: 'navbar-brand',
              activeThree: 'navbar-brand',
              activeFour: 'navbar-brand',
              activeFive: 'navbar-brand',
              activeSix: 'navbar-brand',
              activeSeven: 'navbar-brand myActive',
              activeEight: 'navbar-brand',
              checkWeek: 7
            });
            break;
        case 8:
            this.setState({
              activeOne: 'navbar-brand',
              activeTwo: 'navbar-brand',
              activeThree: 'navbar-brand',
              activeFour: 'navbar-brand',
              activeFive: 'navbar-brand',
              activeSix: 'navbar-brand',
              activeSeven: 'navbar-brand',
              activeEight: 'navbar-brand myActive',
              checkWeek: 8
            });
            break;
    }
  }

  componentDidMount() {
    axios.get('/profile/added',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            myBookList: res.data.book,
            myMovieList: res.data.movie,
            myLessonList: res.data.lesson
          });
      });
  }
  onClickReset(){
    this.setState({
      myBook: {
        _id: '',
        title: '',
        description: '',
        url: ''
      },
      myMovie: {
        _id: '',
        title: '',
        description: '',
        url: ''
      },
      myLesson: {
        _id: '',
        title: '',
        description: '',
        url: '',
        tasks: ['','','']
      }
    });
  }

  //for book
  onSubmitBook(event) {
    event.preventDefault();
    const bookId = encodeURIComponent(this.state.myBook._id);
    const bookTitle = encodeURIComponent(this.state.myBook.title);
    const bookDescription = encodeURIComponent(this.state.myBook.description);
    const bookUrl = encodeURIComponent(this.state.myBook.url);
    const formData = `bookId=${bookId}&bookTitle=${bookTitle}&bookDescription=${bookDescription}&bookUrl=${bookUrl}`;
    axios.post('/profile/addbook', formData, {
      responseType: 'json',
      headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        var tempBookArray = this.state.myBookList.slice();
        tempBookArray.concat(res.data.book)
        this.setState({
          myBookList: tempBookArray
        });
        this.onClickReset();
        this.componentDidMount();
      })
        .catch(error => {
        if (error.response) {
          //console.log(error.response);
          const errors = error.response ? error.response : {};
          errors.summary = error.data.message;
          this.setState({
            errors
          });
          //console.log(error.response.data.errors.name);
          console.log(errors.data.message);
        }
        });
  }
  changeBookTitle(event) {
    const field = event.target.name;
    const myBook = this.state.myBook;
    myBook[field] = event.target.value;
    this.setState({
      myBook
    });
  }
  getThisBook(event){
    var getId = event.target.id;
    var result = this.state.myBookList.filter(function( obj ) {
      return obj._id == getId;
    });
    this.setState({
      setActiveOne: 'navbar-brand',
      setActiveTwo: 'navbar-brand',
      setActiveThree: 'navbar-brand myActive',
      checkNavBar: 3,
      myBook: result[0]
    });
      //console.log(this.state.myBook)
  }
  setNewBook(){
    this.setState({
      setActiveOne: 'navbar-brand',
      setActiveTwo: 'navbar-brand',
      setActiveThree: 'navbar-brand myActive',
      checkNavBar: 3
    });
    this.onClickReset()
  }

  //for movie
  changeMovie(event) {
    const field = event.target.name;
    const myMovie = this.state.myMovie;
    myMovie[field] = event.target.value;
    this.setState({
      myMovie
    });
  }
  getThisMovie(event){
    var getId = event.target.id;
    var result = this.state.myMovieList.filter(function( obj ) {
      return obj._id == getId;
    });
    this.setState({
      setActiveOne: 'navbar-brand',
      setActiveTwo: 'navbar-brand myActive',
      setActiveThree: 'navbar-brand',
      checkNavBar: 2,
      myMovie: result[0]
    });
  }
  setNewMovie(){
    this.setState({
      setActiveOne: 'navbar-brand',
      setActiveTwo: 'navbar-brand myActive',
      setActiveThree: 'navbar-brand',
      checkNavBar: 2
    });
    this.onClickReset()
  }
  onSubmitMovie(event) {
    event.preventDefault();
    const movieId = encodeURIComponent(this.state.myMovie._id);
    const movieTitle = encodeURIComponent(this.state.myMovie.title);
    const movieDescription = encodeURIComponent(this.state.myMovie.description);
    const movieUrl = encodeURIComponent(this.state.myMovie.url);
    const formData = `movieId=${movieId}&movieTitle=${movieTitle}&movieDescription=${movieDescription}&movieUrl=${movieUrl}`;
    axios.post('/profile/addmovie', formData, {
      responseType: 'json',
      headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        var tempMovieArray = this.state.myMovieList.slice();
        tempMovieArray.concat(res.data.movie)
        this.setState({
          myMovieList: tempMovieArray
        });
        this.onClickReset();
        this.componentDidMount();
      })
        .catch(error => {
        if (error.response) {
          //console.log(error.response);
          const errors = error.response ? error.response : {};
          errors.summary = error.data.message;
          this.setState({
            errors
          });
          //console.log(error.response.data.errors.name);
          console.log(errors.data.message);
        }
        });
  }

  //for lesson
  changeLesson(event) {
    const field = event.target.name;
    const myLesson = this.state.myLesson;
    myLesson[field] = event.target.value;
    this.setState({
      myLesson
    });
    console.log(this.state.myLesson);
  }
  changeLessonTask(event) {
    const field = event.target.name;
    if(field == "task1"){
      const tasks = this.state.myLesson.tasks;
      tasks[0] = event.target.value;
      this.setState({
        tasks: tasks
      });
      console.log(this.state.myLesson);
    } else if(field == "task2"){
      const tasks = this.state.myLesson.tasks;
      tasks[1] = event.target.value;
      this.setState({
        tasks: tasks
      });
      console.log(this.state.myLesson);
    } else if(field == "task3"){
      const tasks = this.state.myLesson.tasks;
      tasks[2] = event.target.value;
      this.setState({
        tasks: tasks
      });
      console.log(this.state.myLesson);
    }
  }
  getThisLesson(event){
    var getId = event.target.id;
    var result = this.state.myLessonList.filter(function( obj ) {
      return obj._id == getId;
    });
    this.setState({
      setActiveOne: 'navbar-brand myActive',
      setActiveTwo: 'navbar-brand',
      setActiveThree: 'navbar-brand',
      checkNavBar: 1,
      myLesson: result[0]
    });
  }
  setNewLesson(){
    this.setState({
      setActiveOne: 'navbar-brand myActive',
      setActiveTwo: 'navbar-brand',
      setActiveThree: 'navbar-brand',
      checkNavBar: 1
    });
    this.onClickReset()
  }
  onSubmitLesson(event) {
    event.preventDefault();
    const lessonId = encodeURIComponent(this.state.myLesson._id);
    const lessonTitle = encodeURIComponent(this.state.myLesson.title);
    const lessonDescription = encodeURIComponent(this.state.myLesson.description);
    const lessonUrl = encodeURIComponent(this.state.myLesson.url);
    const lessonTask1 = encodeURIComponent(this.state.myLesson.tasks[0]);
    const lessonTask2 = encodeURIComponent(this.state.myLesson.tasks[1]);
    const lessonTask3 = encodeURIComponent(this.state.myLesson.tasks[2]);
    const formData = `lessonId=${lessonId}&lessonTitle=${lessonTitle}&lessonDescription=${lessonDescription}&lessonUrl=${lessonUrl}&lessonTask1=${lessonTask1}&lessonTask2=${lessonTask2}&lessonTask3=${lessonTask3}`;
    axios.post('/profile/addlesson', formData, {
      responseType: 'json',
      headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        var tempLessonArray = this.state.myLessonList.slice();
        tempLessonArray.concat(res.data.lesson)
        console.log(tempLessonArray);
        this.setState({
          myLessonList: tempLessonArray
        });
        this.onClickReset();
        this.componentDidMount();
      })
        .catch(error => {
        if (error.response) {
          //console.log(error.response);
          const errors = error.response ? error.response : {};
          errors.summary = error.data.message;
          this.setState({
            errors
          });
          //console.log(error.response.data.errors.name);
          console.log(errors.data.message);
        }
        });
  }

  render() {
    return (
      <Program
        changeNavBar={this.changeNavBar}
        checkNavBar={this.state.checkNavBar}
        setActiveOne={this.state.setActiveOne}
        setActiveTwo={this.state.setActiveTwo}
        setActiveThree={this.state.setActiveThree}
        scheduleArrDays={this.state.scheduleArrDays}
        scheduleArrWeeks={this.state.scheduleArrWeeks}
        onClickReset={this.onClickReset}
        checkWeek={this.state.checkWeek}

        myBook={this.state.myBook}
        myBookList={this.state.myBookList}
        changeBookTitle={this.changeBookTitle}
        onSubmitBook={this.onSubmitBook}
        getThisBook={this.getThisBook}
        setNewBook={this.setNewBook}

        myMovie={this.state.myMovie}
        myMovieList={this.state.myMovieList}
        changeMovie={this.changeMovie}
        onSubmitMovie={this.onSubmitMovie}
        getThisMovie={this.getThisMovie}
        setNewMovie={this.setNewMovie}

        myLesson={this.state.myLesson}
        myLessonList={this.state.myLessonList}
        changeLesson={this.changeLesson}
        onSubmitLesson={this.onSubmitLesson}
        getThisLesson={this.getThisLesson}
        setNewLesson={this.setNewLesson}
        changeLessonTask={this.changeLessonTask}

        activeOne={this.state.activeOne}
        activeTwo={this.state.activeTwo}
        activeThree={this.state.activeThree}
        activeFour={this.state.activeFour}
        activeFive={this.state.activeFive}
        activeSix={this.state.activeSix}
        activeSeven={this.state.activeSeven}
        activeEight={this.state.activeEight}
        changeNavWeek={this.changeNavWeek}
      />
    );
  }

}

export default ProgramPage;

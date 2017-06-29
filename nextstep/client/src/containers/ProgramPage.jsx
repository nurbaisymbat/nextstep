import React from 'react';
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
        url: [''],
        tasks: ['']
      },
      myLessonList: [{
        _id: '',
        title: '',
        description: '',
        url: [''],
        tasks:['']
      }],

      myDepartment: '',
      chosenDepartment: 'Дизайн',
      myBookListAll: [{
        _id: '',
        title: '',
        description: '',
        url: ''
      }],
      myMovieListAll: [{
        _id: '',
        title: '',
        description: '',
        url: ''
      }],
      myLessonListAll: [{
        _id: '',
        title: '',
        description: '',
        url: [''],
        tasks:['']
      }]
    };
    //общие
    this.changeNavBar = this.changeNavBar.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.changeNavWeek = this.changeNavWeek.bind(this);
    this.changeDepartment = this.changeDepartment.bind(this);

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
    this.changeLessonURL = this.changeLessonURL.bind(this);
    this.addURLLesson = this.addURLLesson.bind(this);
    this.addLessonTask = this.addLessonTask.bind(this);
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
    var weekId = event.target.id;
    if(weekId=="left"){
      if(this.state.checkWeek == 1){
        this.setState({
          checkWeek: 8
        });
      } else {
        this.setState({
          checkWeek: this.state.checkWeek-1
        });
      }
    } else if(weekId=="right"){
      if(this.state.checkWeek == 8){
        this.setState({
          checkWeek: 1
        });
      } else {
        this.setState({
          checkWeek: this.state.checkWeek+1
        });
      }
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
        if(res.data.myDepartment == 'all'){
          var chosenDepartment = this.state.chosenDepartment;
          this.setState({
            myDepartment: res.data.myDepartment,
            myBookList: res.data.book.filter(function(b) {
                              return b.department.indexOf(chosenDepartment) > -1;
                          }),
            myMovieList: res.data.movie.filter(function(m) {
                              return m.department.indexOf(chosenDepartment) > -1;
                          }),
            myLessonList: res.data.lesson.filter(function(l) {
                              return l.department.indexOf(chosenDepartment) > -1;
                          }),
            myBookListAll: res.data.book,
            myMovieListAll: res.data.movie,
            myLessonListAll: res.data.lesson,
            chosenDepartment: chosenDepartment
          });
        } else {
          this.setState({
            myDepartment: res.data.myDepartment,
            myBookList: res.data.book,
            myMovieList: res.data.movie,
            myLessonList: res.data.lesson
          });
        }
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
        url: [''],
        tasks: ['']
      }
    });
  }

  //for book
  onSubmitBook(event) {
    event.preventDefault();
    const chosenDepartment = encodeURIComponent(this.state.chosenDepartment);
    console.log(this.state.myBook)
    const formData = `chosenDepartment=${chosenDepartment}&myBook=${JSON.stringify(this.state.myBook)}`;
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
          const errors = error.response ? error.response : {};
          errors.summary = error.data.message;
          this.setState({
            errors
          });
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
    const chosenDepartment = encodeURIComponent(this.state.chosenDepartment);
    console.log(this.state.myMovie)
    const formData = `chosenDepartment=${chosenDepartment}&myMovie=${JSON.stringify(this.state.myMovie)}`;
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
          const errors = error.response ? error.response : {};
          errors.summary = error.data.message;
          this.setState({
            errors
          });
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
  }
  changeLessonTask(event) {
    var taskLesson = this.state.myLesson.tasks;
    taskLesson[event.target.id] = event.target.value;
    this.setState({tasks: taskLesson});
  }
  addLessonTask(){
    var taskLesson = this.state.myLesson.tasks;
    taskLesson.push('');
    this.setState({tasks: taskLesson});
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
    console.log(this.state.myLesson)
    const chosenDepartment = encodeURIComponent(this.state.chosenDepartment);
    const formData = `chosenDepartment=${chosenDepartment}&myLesson=${JSON.stringify(this.state.myLesson)}`;
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
        this.setState({
          myLessonList: tempLessonArray
        });
        this.onClickReset();
        this.componentDidMount();
      })
        .catch(error => {
        if (error.response) {
          const errors = error.response ? error.response : {};
          errors.summary = error.data.message;
          this.setState({
            errors
          });
          console.log(errors.data.message);
        }
        });
  }
  changeDepartment(event){
    this.setState({
      chosenDepartment: event.target.value,
      myBookList: this.state.myBookListAll.filter(function(b) {
                        return b.department.indexOf(event.target.value) > -1;
                    }),
      myMovieList: this.state.myMovieListAll.filter(function(m) {
                        return m.department.indexOf(event.target.value) > -1;
                    }),
      myLessonList: this.state.myLessonListAll.filter(function(l) {
                        return l.department.indexOf(event.target.value) > -1;
                    })
    });
  }
  changeLessonURL(event){
    var urlLesson = this.state.myLesson.url;
    urlLesson[event.target.id] = event.target.value;
    this.setState({url: urlLesson});
  }
  addURLLesson(){
    var urlLesson = this.state.myLesson.url;
    urlLesson.push('');
    this.setState({url: urlLesson});
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
        changeNavWeek={this.changeNavWeek}

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
        changeLessonURL={this.changeLessonURL}
        addURLLesson={this.addURLLesson}
        addLessonTask={this.addLessonTask}

        myDepartment={this.state.myDepartment}
        changeDepartment={this.changeDepartment}
      />
    );
  }

}

export default ProgramPage;

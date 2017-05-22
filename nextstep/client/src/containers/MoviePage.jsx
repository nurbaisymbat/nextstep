import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Movie from '../components/Movie.jsx';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';

const opts = {
      height: '390',
      width: '640',
      //playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      //}
    };
class MoviePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      myMovie: {
        _id: '',
        title: '',
        description: '',
        url: ''
      },
      message: '',
      videoId: '',
      checkNote: 1,
      movieNoteList: [],
      myMovieNote: '',
      getRemainder: 0,
      checkLength: false,
      messageQ: '',
      showOthers: '',
      hideOthers: 'hidden'
    };

    this._onReady = this._onReady.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.changeCheckNote = this.changeCheckNote.bind(this);
    this.checkShowOthers = this.checkShowOthers.bind(this);
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  componentDidMount() {
    axios.get('/profile/getmovie',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            myMovie: res.data.movie,
            videoId: getYouTubeID(res.data.movie.url),
            movieNoteList: res.data.movieNoteList,
            getRemainder: (10 - res.data.movieNoteList.length),
            messageQ: res.data.messageQ,
            checkLength: res.data.checkLength
          });
      });
  }
  changeCheckNote(event){
    var getName = event.target.id;
    var note = this.state.checkNote;
    if(getName == "left"){
      if(this.state.getRemainder == 0){
        this.setState({
          checkNote: 0,
          myMovieNote: ''
        });
      }
      else {
        if(note == 1){
          this.setState({
            checkNote: this.state.getRemainder,
            myMovieNote: '',
            message: ''
          });
        } else {
          this.setState({
            checkNote: this.state.checkNote-1,
            myMovieNote: '',
            message: ''
          });
        }
      }
    } else if(getName == "right"){
      if(this.state.getRemainder == 0){
        this.setState({
          checkNote: 0,
          myMovieNote: ''
        });
      }
      else {
        if(note == this.state.getRemainder){
          this.setState({
            checkNote: 1,
            myMovieNote: '',
            message: ''
          });
        } else {
          this.setState({
            checkNote: this.state.checkNote+1,
            myMovieNote: '',
            message: ''
          });
        }
      }
    }
  }
  _handleChange(e){
    this.setState({
      myMovieNote: e.target.value,
      message: ''
    });
  }
  _handleSubmit(e) {
    e.preventDefault();
    const movieNoteText = encodeURIComponent(this.state.myMovieNote);
    const movieId = encodeURIComponent(this.state.myMovie._id);
    const formData = `movieNoteText=${movieNoteText}&movieId=${movieId}`;
    axios.post('/profile/addmovienote', formData, {
      responseType: 'json',
      headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          myMovieNote: '',
          message: 'Заметка добавлена'
        });
        this.componentDidMount();
      })
  }
checkShowOthers(e){

  if(e.target.id=='hideNotes'){
    this.setState({
      showOthers: '',
      hideOthers: 'hidden'
    });
  }else if(e.target.id=='showNotes'){
    this.setState({
      showOthers: 'hidden',
      hideOthers: ''
    });
  }

}
  render() {
    return (
      <Movie
      opts={opts}
      _onReady={this._onReady}
      _handleSubmit={this._handleSubmit}
      message={this.state.message}
      videoId={this.state.videoId}
      myMovie={this.state.myMovie}
      changeCheckNote={this.changeCheckNote}
      checkNote={this.state.checkNote}
      movieNoteList={this.state.movieNoteList}
      myMovieNote={this.state.myMovieNote}
      _handleChange={this._handleChange}
      getRemainder={this.state.getRemainder}
      checkLength={this.state.checkLength}
      messageQ={this.state.messageQ}
      showOthers={this.state.showOthers}
      hideOthers={this.state.hideOthers}
      checkShowOthers={this.checkShowOthers}
      />
    );
  }

}

export default MoviePage;

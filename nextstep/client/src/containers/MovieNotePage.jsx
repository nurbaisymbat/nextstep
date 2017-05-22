import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import MovieNote from '../components/MovieNote.jsx';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';

const opts = {
      height: '390',
      width: '640',
      //playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      //}
    };

class MovieNotePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      movieNoteId: props.location.query.note,
      movienote: {},
      user: {},
      movie: {},
      videoId: ''
    };
    this._onReady = this._onReady.bind(this);
    this.onApprove = this.onApprove.bind(this);
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  componentDidMount() {
    axios.get('/profile/getmovienote?movieNoteId='+this.state.movieNoteId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
          this.setState({
            movienote: res.data.movienote,
            user: res.data.user,
            movie: res.data.movie,
            videoId: getYouTubeID(res.data.movie.url)
          })
      });
  }
  onApprove(event){
    event.preventDefault();
    const incType = encodeURIComponent(event.target.id);
    const userId = encodeURIComponent(this.state.user._id);
    const noteId = encodeURIComponent(this.state.movienote._id);
    const type = encodeURIComponent('movie');
    const formData = `noteId=${noteId}&type=${type}&userId=${userId}&incType=${incType}`;
    axios.post('/profile/approvenote', formData,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          movienote: res.data.movienote
        })
      });
  }
  render() {
    return (
      <MovieNote
          movienote={this.state.movienote}
          user={this.state.user}
          movie={this.state.movie}
          videoId={this.state.videoId}
          opts={this.state.opts}
          _onReady={this._onReady}
          onApprove={this.onApprove}
      />
    );
  }

}

export default MovieNotePage;

import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Lesson from '../components/Lesson.jsx';
import axios from 'axios';

const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

class LessonPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: ''
    };

    this._onReady = this._onReady.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  _handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.file);
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData();
      imageFormData.append('imageFile', this.state.file);
      axios.post('/profile/upload', imageFormData, {
        responseType: 'json',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
        }
      })
        .then(res => {
            console.log(res.data.message);
            this.setState({
              message: res.data.message
            });
        });
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      console.log(reader);
      this.setState({
        file: file
      });
    }

    reader.readAsDataURL(file)
  }
  render() {
    return (
      <Lesson
      opts={opts}
      _onReady={this._onReady}
      _handleImageChange={this._handleImageChange}
      _handleSubmit={this._handleSubmit}
      />
    );
  }

}

export default LessonPage;

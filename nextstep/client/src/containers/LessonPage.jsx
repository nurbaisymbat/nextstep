import React from 'react';
import Auth from '../modules/Auth';
import Lesson from '../components/Lesson.jsx';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';

const opts = {
      height: '300',
      width: '500',
      autoplay: 0
    };
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
class LessonPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      myLesson: {
        _id: '',
        title: '',
        description: '',
        url: [],
        tasks: ['']
      },
      videoId: '',
      file: '',
      filename: '',
      message: '',
      deadline: tomorrow,
      currentVideo: 0
    };

    this._onReady = this._onReady.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
  componentDidMount() {
    axios.get('/api/getlesson',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        var x = res.data.lesson.url[0];
          this.setState({
            myLesson: res.data.lesson,
            videoId: getYouTubeID(x)
          });
      });
  }
  _handleSubmit(e) {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData();
      imageFormData.append('imageFile', this.state.file);
      axios.post('/api/upload?lessonId='+this.state.myLesson._id, imageFormData, {
        responseType: 'json',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
        }
      })
        .then(res => {
            this.setState({
              message: res.data.message,
              filename: ''
            });
        });
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        filename: file.name
      });
    }

    reader.readAsDataURL(file)
  }
  changeVideo(event){
    if(event.target.id == 'video-left'){
      if(this.state.currentVideo == 0){
        this.setState({
          currentVideo: this.state.myLesson.url.length-1,
          videoId: getYouTubeID(this.state.myLesson.url[this.state.myLesson.url.length-1])
        });
      } else {
        this.setState({
          currentVideo: this.state.currentVideo-1,
          videoId: getYouTubeID(this.state.myLesson.url[this.state.currentVideo-1])
        });
      }
    } else {
      if(this.state.currentVideo == this.state.myLesson.url.length){
        this.setState({
          currentVideo: 0,
          videoId: getYouTubeID(this.state.myLesson.url[0])
        });
      } else {
        this.setState({
          currentVideo: this.state.currentVideo+1,
          videoId: getYouTubeID(this.state.myLesson.url[this.state.currentVideo+1])
        });
      }
    }
  }
  render() {
    return (
      <Lesson
      opts={opts}
      _onReady={this._onReady}
      _handleImageChange={this._handleImageChange}
      _handleSubmit={this._handleSubmit}
      filename={this.state.filename}
      message={this.state.message}
      myLesson={this.state.myLesson}
      videoId={this.state.videoId}
      deadline={this.state.deadline}
      changeVideo={this.changeVideo}
      />
    );
  }

}

export default LessonPage;

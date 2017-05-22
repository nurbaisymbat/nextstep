import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Settings from '../components/Settings.jsx';
import axios from 'axios';

class SettingsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      myPoints: {
        video: 0,
        book: 0,
        insight: 0,
        task: 0
      },
      message: '',
      checkChange: false
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/profile/getpoints',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
          this.setState({
            myPoints: res.data.myPoints
          });
      })
  }

  _handleChange(event){
    var getName = event.target.id;
    var tmpPoints = this.state.myPoints;
    if(getName == "leftVideo"){
      tmpPoints.video = tmpPoints.video-1;
      this.setState({
        myPoints: tmpPoints,
        message: '',
        checkChange: true
      });
    } else if(getName == "rightVideo"){
      tmpPoints.video = tmpPoints.video+1;
      this.setState({
        myPoints: tmpPoints,
        message: '',
        checkChange: true
      });
    } else if(getName == "leftBook"){
      tmpPoints.book = tmpPoints.book-1;
      this.setState({
        myPoints: tmpPoints,
        message: '',
        checkChange: true
      });
    } else if(getName == "rightBook"){
      tmpPoints.book = tmpPoints.book+1;
      this.setState({
        myPoints: tmpPoints,
        message: '',
        checkChange: true
      });
    } else if(getName == "leftTask"){
      tmpPoints.task = tmpPoints.task-1;
      this.setState({
        myPoints: tmpPoints,
        message: '',
        checkChange: true
      });
    } else if(getName == "rightTask"){
      tmpPoints.task = tmpPoints.task+1;
      this.setState({
        myPoints: tmpPoints,
        message: '',
        checkChange: true
      });
    } else if(getName == "leftInsight"){
      tmpPoints.insight = tmpPoints.insight-1;
      this.setState({
        myPoints: tmpPoints,
        message: '',
        checkChange: true
      });
    } else if(getName == "rightInsight"){
      tmpPoints.insight = tmpPoints.insight+1;
      this.setState({
        myPoints: tmpPoints,
        message: '',
        checkChange: true
      });
    }
  }
  _handleSubmit(event){
    event.preventDefault();
    const _id = encodeURIComponent(this.state.myPoints._id);
    const videoPoints = encodeURIComponent(this.state.myPoints.video);
    const bookPoints = encodeURIComponent(this.state.myPoints.book);
    const taskPoints = encodeURIComponent(this.state.myPoints.task);
    const insightPoints = encodeURIComponent(this.state.myPoints.insight);
    const formData = `_id=${_id}&videoPoints=${videoPoints}&bookPoints=${bookPoints}&taskPoints=${taskPoints}&insightPoints=${insightPoints}`;
    axios.post('/profile/settings', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          myPoints: res.data.myPoints,
          message: 'Сохранено',
          checkChange: false
        });
      })
        .catch(error => {
        if (error.response) {
          const errors = error.response ? error.response : {};
          errors.summary = error.response.data.message;
          this.setState({
            errors
          });
          console.log(errors.summary);
        }
        });
  }
  render() {
    return (
      <Settings
          myPoints={this.state.myPoints}
          _handleChange={this._handleChange}
          _handleSubmit={this._handleSubmit}
          message={this.state.message}
          checkChange={this.state.checkChange}
      />
    );
  }

}

export default SettingsPage;

import React from 'react';
import Auth from '../modules/Auth';
import Insight from '../components/Insight.jsx';
import axios from 'axios';

const opts = {
      height: '390',
      width: '640',
      autoplay: 0
    };

class InsightPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      checkDate: false,
      myInsight: '',
      messageErr: '',
      videoId: 'JPT3bFIwJYA'
    };

    this._onReady = this._onReady.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/insight',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
              messageErr: res.data.message,
              checkDate: res.data.checkDate
          });
      });
  }
  _onReady(event) {
    event.target.pauseVideo();
  }

  _handleSubmit(e) {
    e.preventDefault();
    if(this.state.myInsight.length == 0){
      this.setState({
        messageErr: "Запоните все поля"
      });
    } else if(!this.state.myInsight.includes('youtube')){
      this.setState({
        messageErr: "Видео должен быть загружен на YouTube"
      });
    }
    else {
      const myInsight = encodeURIComponent(this.state.myInsight);
      const formData = `myInsight=${myInsight}`;
      axios.post('/api/insightUpload', formData, {
        responseType: 'json',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
        }
      })
        .then(res => {
            this.setState({
              message: res.data.message,
              checkDate: res.data.checkDate,
              myInsight: ''
            });
        })
          .catch(error => {
          if (error.response) {
            const errors = error.response ? error.response : {};
            errors.summary = "Нeизвестная ошибка";
            this.setState({
              errors
            });
            console.log(errors)
          }
          });
    }
  }

  _handleChange(e) {
    this.setState({
      myInsight: e.target.value
    });
  }
  render() {
    return (
      <Insight
      _handleChange={this._handleChange}
      _handleSubmit={this._handleSubmit}
      message={this.state.message}
      checkDate={this.state.checkDate}
      myInsight={this.state.myInsight}
      messageErr={this.state.messageErr}
      opts={opts}
      _onReady={this._onReady}
      videoId={this.state.videoId}
      />
    );
  }

}

export default InsightPage;

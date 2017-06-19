import React from 'react';
import Auth from '../modules/Auth';
import SettingsMainAdmin from '../components/SettingsMainAdmin.jsx';
import axios from 'axios';

class SettingsMainAdminPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      myPoints: [{
        video: 0,
        book: 0,
        insight: 0,
        task: 0
      },
      {
        video: 0,
        book: 0,
        insight: 0,
        task: 0
      }],
      messageDesign: '',
      messageProgramming: '',
      checkChangeDesign: false,
      checkChangeProgramming: false
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/profile/getpoints',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
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
    switch (getName) {
      case "leftVideoDesign": tmpPoints[0].video = tmpPoints[0].video-1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageDesign: '',
                                checkChangeDesign: true
                              });
                              break;
      case "rightVideoDesign": tmpPoints[0].video = tmpPoints[0].video+1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageDesign: '',
                                checkChangeDesign: true
                              });
                              break;
      case "leftBookDesign": tmpPoints[0].book = tmpPoints[0].book-1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageDesign: '',
                                checkChangeDesign: true
                              });
                              break;
      case "rightBookDesign": tmpPoints[0].book = tmpPoints[0].book+1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageDesign: '',
                                checkChangeDesign: true
                              });
                              break;
      case "leftTaskDesign": tmpPoints[0].task = tmpPoints[0].task-1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageDesign: '',
                                checkChangeDesign: true
                              });
                              break;
      case "rightTaskDesign": tmpPoints[0].task = tmpPoints[0].task+1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageDesign: '',
                                checkChangeDesign: true
                              });
                              break;
      case "leftInsightDesign": tmpPoints[0].insight = tmpPoints[0].insight-1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageDesign: '',
                                checkChangeDesign: true
                              });
                              break;
      case "rightInsightDesign": tmpPoints[0].insight = tmpPoints[0].insight+1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageDesign: '',
                                checkChangeDesign: true
                              });
                              break;
      case "leftVideoProgramming": tmpPoints[1].video = tmpPoints[1].video-1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageProgramming: '',
                                checkChangeProgramming: true
                              });
                              break;
      case "rightVideoProgramming": tmpPoints[1].video = tmpPoints[1].video+1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageProgramming: '',
                                checkChangeProgramming: true
                              });
                              break;
      case "leftBookProgramming": tmpPoints[1].book = tmpPoints[1].book-1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageProgramming: '',
                                checkChangeProgramming: true
                              });
                              break;
      case "rightBookProgramming": tmpPoints[1].book = tmpPoints[1].book+1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageProgramming: '',
                                checkChangeProgramming: true
                              });
                              break;
      case "leftTaskProgramming": tmpPoints[1].task = tmpPoints[1].task-1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageProgramming: '',
                                checkChangeProgramming: true
                              });
                              break;
      case "rightTaskProgramming": tmpPoints[1].task = tmpPoints[1].task+1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageProgramming: '',
                                checkChangeProgramming: true
                              });
                              break;
      case "leftInsightProgramming": tmpPoints[1].insight = tmpPoints[1].insight-1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageProgramming: '',
                                checkChangeProgramming: true
                              });
                              break;
      case "rightInsightProgramming": tmpPoints[1].insight = tmpPoints[1].insight+1;
                              this.setState({
                                myPoints: tmpPoints,
                                messageProgramming: '',
                                checkChangeProgramming: true
                              });
                              break;
    }
  }
  _handleSubmit(event){
    event.preventDefault();
    const department = encodeURIComponent(event.target.name);
    const formData = `myPoints=${JSON.stringify(this.state.myPoints)}&department=${department}`;
    axios.post('/profile/settings', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        if(res.data.department == 'Дизайн'){
          const points = this.state.myPoints;
          points[0] = res.data.points;
          this.setState({
            myPoints: points,
            messageDesign: 'Сохранено',
            checkChangeDesign: res.data.checkChangeDesign
          });
        } else {
          const points = this.state.myPoints;
          points[1] = res.data.points;
          this.setState({
            myPoints: points,
            messageProgramming: 'Сохранено',
            checkChangeProgramming: res.data.checkChangeProgramming
          });
        }

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
      <SettingsMainAdmin
          myPoints={this.state.myPoints}
          _handleChange={this._handleChange}
          _handleSubmit={this._handleSubmit}
          messageDesign={this.state.messageDesign}
          messageProgramming={this.state.messageProgramming}
          checkChangeDesign={this.state.checkChangeDesign}
          checkChangeProgramming={this.state.checkChangeProgramming}
      />
    );
  }

}

export default SettingsMainAdminPage;

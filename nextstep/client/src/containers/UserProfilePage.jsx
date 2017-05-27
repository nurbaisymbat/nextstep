import React from 'react';
import Auth from '../modules/Auth';
import UserProfile from '../components/UserProfile.jsx';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class UserProfilePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: props.location.query.user,
      personalInfo: {},
      user: {
        myImg: ''
      },
      notes: [],
      messageNotes: '',
      myProgress: {}
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    axios.get('/profile/getprofile?userId='+this.state.userId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          if (res.data.personalInfo != null){
            if(res.data.notes != null){
              this.setState({
                personalInfo: res.data.personalInfo,
                user: res.data.user,
                notes: res.data.notes,
                myProgress: res.data.myProgress
              });
            } else {

              this.setState({
                personalInfo: res.data.personalInfo,
                user: res.data.user,
                messageNotes: 'У пользователя нет заметок на сегодня',
                myProgress: res.data.myProgress
              });
            }

          } else {
            if(res.data.notes != null){
              this.setState({
                user: res.data.user,
                notes: res.data.notes,
                myProgress: res.data.myProgress
              });
            } else {
              this.setState({
                user: res.data.user,
                messageNotes: 'У пользователя нет заметок на сегодня',
                myProgress: res.data.myProgress
              });

            }
          }
      });
  }

  render() {
    return (
      <UserProfile
          userId={this.state.userId}
          personalInfo={this.state.personalInfo}
          user={this.state.user}
          notes={this.state.notes}
          messageNotes={this.state.messageNotes}
          myProgress={this.state.myProgress}
      />
    );
  }

}

export default UserProfilePage;

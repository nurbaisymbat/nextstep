import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Profile from '../components/Profile.jsx';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class ProfilePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      message: '',
      birthday: '',
      personalInfo: {
        birthDate: '',
        city: '',
        phone: ''
      },
      user: {
        email: '',
        name: ''
      },
      checked: false,
      hide: false,
      notes: [],
      messageNotes: '',
      myProgress: {}
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changeHide = this.changeHide.bind(this);
    this.onClick = this.onClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }
  onClick(event){
    this.componentDidMount();
    this.changeHide();
    this.setState({
      checked: false
    });
  }
  componentDidMount() {
    axios.get('/profile/profile',  {
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
                birthday: res.data.personalInfo.birthDate,
                user: res.data.user,
                notes: res.data.notes,
                myProgress: res.data.myProgress
              });
            } else {

              this.setState({
                personalInfo: res.data.personalInfo,
                birthday: res.data.personalInfo.birthDate,
                user: res.data.user,
                messageNotes: 'У вас нет заметок на сегодня',
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
                messageNotes: 'У вас нет заметок на сегодня',
                myProgress: res.data.myProgress
              });

            }
          }
      });
  }

  processForm(event) {
    event.preventDefault();
    const birthDate = encodeURIComponent(this.state.birthday);
    const city = encodeURIComponent(this.state.personalInfo.city);
    const phone = encodeURIComponent(this.state.personalInfo.phone);
    if((birthDate.length ==0) || (city.length == 0) || (phone.length == 0)){
      this.setState({
        message: "Запоните все поля"
      });
    }
    else {

      const formData = `birthDate=${birthDate}&city=${city}&phone=${phone}`;
      axios.post('/profile/profileChange', formData, {
        responseType: 'json',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
        }
      })
        .then(res => {

            this.setState({
              errors: {},
              checked: false,
              hide: !this.state.hide,
            });
            this.componentDidMount();
        })
          .catch(error => {
          if (error.response) {
            //console.log(error.response);
            const errors = error.response ? error.response : {};
            errors.summary = "Нeизвестная ошибка";
            this.setState({
              errors
            });
            //console.log(error.response.data.errors.name);
            //console.log(errors.summary);
          }
          });
    }
  }

  changeUser(event) {
    const field = event.target.name;
    const personalInfo = this.state.personalInfo;
    personalInfo[field] = event.target.value;
    this.setState({
      personalInfo,
      checked: true
    });
  }

  changeHide (){
    this.setState({
      hide: !this.state.hide
    });
  }
  dateChange(value){
    this.setState({
      birthday: value,
      checked: true
    });
  }
  render() {
    return (
      <Profile
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        personalInfo={this.state.personalInfo}
        checked={this.state.checked}
        message={this.state.message}
        birthday={this.state.birthday}
        hide={this.state.hide}
        user={this.state.user}
        onClick={this.onClick}
        dateChange={this.dateChange}
        notes={this.state.notes}
        messageNotes={this.state.messageNotes}
        myProgress={this.state.myProgress}
      />
    );
  }

}

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ProfilePage;

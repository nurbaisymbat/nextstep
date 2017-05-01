import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Profile from '../components/Profile.jsx';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Иля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

class ProfilePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    var anotherBDay = new Date().toISOString();
    this.state = {
      errors: {},
      message: '',
      birthday: '',
      personalInfo: {
        birthDate: '',
        city: '',
        phone: ''
      },
      anotherBDay: anotherBDay,
      user: {
        email: '',
        name: ''
      },
      checked: false,
      hide: false
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
            var bithdayDate = new Date(res.data.personalInfo.birthDate);

            var currentMonth = months[bithdayDate.getMonth()];
            var bday = bithdayDate.getDate() + ' ' + currentMonth + ' ' + bithdayDate.getFullYear();
              this.setState({
                personalInfo: res.data.personalInfo,
                birthday: bday,
                user: res.data.user,
                anotherBDay: res.data.personalInfo.birthDate
              });
          }
      });
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const email = encodeURIComponent(this.state.user.email);
    const birthDate = encodeURIComponent(this.state.anotherBDay);
    const city = encodeURIComponent(this.state.personalInfo.city);
    const phone = encodeURIComponent(this.state.personalInfo.phone);
    const formData = `email=${email}&birthDate=${birthDate}&city=${city}&phone=${phone}`;
    axios.post('/profile/profileChange', formData, {
      responseType: 'json',
      headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        var bithdayDate = new Date(res.data.personalInfo.birthDate);
        var currentMonth = months[bithdayDate.getMonth()];
        var bday = bithdayDate.getDate() + ' ' + currentMonth + ' ' + bithdayDate.getFullYear();
          this.setState({
            errors: {},
            personalInfo: res.data.personalInfo,
            user: res.data.user,
            message: res.data.message,
            checked: false,
            hide: !this.state.hide,
            birthday: bday
          });


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

  changeUser(event) {
    const field = event.target.name;
    const personalInfo = this.state.personalInfo;
    const user = this.state.user;
    user[field] = event.target.value;
    personalInfo[field] = event.target.value;
    this.setState({
      personalInfo,
      user,
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
      checked: true,
      anotherBDay: value
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
        anotherBDay={this.state.anotherBDay}
      />
    );
  }

}

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ProfilePage;

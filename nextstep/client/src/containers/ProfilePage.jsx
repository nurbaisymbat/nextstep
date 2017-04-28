import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Profile from '../components/Profile.jsx';
import axios from 'axios';

class ProfilePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      message: '',
      birthday: '',
      personalInfo: {
        firstName: '',
        lastName: '',
        birthDate: '',
        city: '',
        phone: '',
        education: ''
      },
      checked: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
            var bithdayDate = new Date(res.data.personalInfo.birthDate)
            var bday = bithdayDate.getFullYear() + '-' + (bithdayDate.getMonth()+1) + '-' + bithdayDate.getDate();
              this.setState({
                personalInfo: res.data.personalInfo,
                birthday: bday
              });
          }
      });
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const firstName = encodeURIComponent(this.state.personalInfo.firstName);
    const lastName = encodeURIComponent(this.state.personalInfo.lastName);
    const birthDate = encodeURIComponent(this.state.birthday);
    const city = encodeURIComponent(this.state.personalInfo.city);
    const phone = encodeURIComponent(this.state.personalInfo.phone);
    const education = encodeURIComponent(this.state.personalInfo.education);
    const formData = `firstName=${firstName}&lastName=${lastName}&birthDate=${birthDate}&city=${city}&phone=${phone}&education=${education}`;
    axios.post('/profile/profileChange', formData, {
      responseType: 'json',
      headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        var bithdayDate = new Date(res.data.personalInfo.birthDate);
        var bday = bithdayDate.getFullYear() + '-' + (bithdayDate.getMonth()+1) + '-' + bithdayDate.getDate();
          this.setState({
            errors: {},
            personalInfo: res.data.personalInfo,
            message: res.data.message,
            checked: false,
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
    personalInfo[field] = event.target.value;
    var bday = event.target.value;
    this.setState({
      personalInfo,
      birthday: bday,
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
      />
    );
  }

}

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ProfilePage;

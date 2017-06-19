import React from 'react';
import PropTypes from 'prop-types';
import HomePage from '../components/HomePage.jsx';
import axios from 'axios';

class SignUpPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
        trelloUser: '',
        department: ''
      },
      checked: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    const name = encodeURIComponent(this.state.user.name);
    const trelloUser = encodeURIComponent(this.state.user.trelloUser);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const department = encodeURIComponent(this.state.user.department);
    const formData = `name=${name}&email=${email}&password=${password}&trelloUser=${trelloUser}&department=${department}`;
    axios.post('/auth/signup', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
        if (res.status === 200) {

          this.setState({
            errors: {}
          });

          localStorage.setItem('successMessage', res.data.message);

          this.context.router.replace('/login');
        }
      })
        .catch(error => {
        if (error.response) {
          const errors = error.response ? error.response : {};
          errors.summary = error.response.data.message;
          this.setState({
            errors
          });
        }
        });
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });

    this.checkPasswordMatch();
  }
  checkPasswordMatch(){
    if((this.state.user.email.length > 0) && (this.state.user.name.length > 0) && (this.state.user.password.length > 0)
        && (this.state.user.trelloUser.length > 0) && (this.state.user.department.length > 0) && (this.state.user.passwordConfirm.length > 0)){
          if(this.state.user.password == this.state.user.passwordConfirm){
            const errors = this.state.errors;
            errors.summary = '';
            this.setState({
              errors,
              checked: true
            });
          } else {
            const errors = this.state.errors;
            errors.summary = "Пароли не совпадают!";
            this.setState({
              errors,
              checked: false
            });
          }
        } else {
          if(this.state.user.password == this.state.user.passwordConfirm){
            const errors = this.state.errors;
            errors.summary = '';
            this.setState({
              errors,
              checked: false
            });
          } else {
            const errors = this.state.errors;
            errors.summary = "Пароли не совпадают!";
            this.setState({
              errors,
              checked: false
            });
          }
        }
  }
  render() {
    return (
      <HomePage
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        checked={this.state.checked}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;

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
        trelloUser: ''
      },
      passwordConfirm: '',
      checked: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
    this.checkAccept = this.checkAccept.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    const name = encodeURIComponent(this.state.user.name);
    const trelloUser = encodeURIComponent(this.state.user.trelloUser);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}&trelloUser=${trelloUser}`;
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
  }
  checkPasswordMatch(event){
    var pwd = this.state.user.password;
    var pwdConfirm = event.target.value;
    this.setState({
      passwordConfirm: pwdConfirm
    });
    if(pwd != pwdConfirm){
      const errors = this.state.errors;
      errors.summary = "Пароли не совпадают!";
      this.setState({
        errors
      });
    }
    else {
      const errors = this.state.errors;
      errors.summary = '';
      this.setState({
        errors
      });
    }
  }
  checkAccept (event){
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    return (
      <HomePage
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        checkPasswordMatch={this.checkPasswordMatch}
        passwordConfirm={this.state.passwordConfirm}
        checkAccept={this.checkAccept}
        checked={this.state.checked}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;

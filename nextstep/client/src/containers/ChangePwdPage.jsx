import React from 'react';
import PropTypes from 'prop-types';
import ChangePwdForm from '../components/ChangePwdForm.jsx';
import axios from 'axios';

class ChangePwdPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        password: ''
      },
      passwordConfirm: ''
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }

  processForm(event) {
    event.preventDefault();
    let params = new URLSearchParams(document.location.search.substring(1));
    let getEmail = params.get("email");
    const email = encodeURIComponent(getEmail);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;
    axios.post('/auth/change', formData, {
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
      });
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
    event.preventDefault();
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
    event.preventDefault();
  }

  render() {
    return (
      <ChangePwdForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        checkPasswordMatch={this.checkPasswordMatch}
        passwordConfirm={this.state.passwordConfirm}
      />
    );
  }

}

ChangePwdPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ChangePwdPage;

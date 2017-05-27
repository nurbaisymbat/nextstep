import React from 'react';
import ForgotForm from '../components/ForgotForm.jsx';
import axios from 'axios';

class ForgotPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: ''
      },
      successMessage: ''
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const formData = `email=${email}`;
    axios.post('/auth/forgot', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
        if (res.status === 200) {

          this.setState({
            errors: {},
            user: {
              email: ''
            },
            successMessage: 'Ссылка для восстанавления пароля отправлен Вам на почту'
          });
        }
      })
        .catch(error => {
        if (error.response) {
          const errors = this.state.errors;
          errors.summary = 'Аккаунт с этой электронной почтой не зарегистрирован';
          this.setState({
            errors,
            user: {
              email: ''
            }
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

  render() {
    return (
      <ForgotForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        successMessage={this.state.successMessage}
      />
    );
  }

}

export default ForgotPage;

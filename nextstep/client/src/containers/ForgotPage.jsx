import React, { PropTypes } from 'react';
import ForgotForm from '../components/ForgotForm.jsx';
import axios from 'axios';

class ForgotPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
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

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const formData = `email=${email}`;
    axios.post('/auth/forgot', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
        //console.log(res);
        if (res.status === 200) {
          // success

          // change the component-container state
          this.setState({
            errors: {},
            user: {
              email: ''
            },
            successMessage: 'Ссылка для восстанавления пароля отправлен Вам на почту'
          });

          // make a redirect
        }
      })
        .catch(error => {
        if (error.response) {
          //console.log(error.response);
          const errors = this.state.errors;
          errors.summary = 'Аккаунт с этой электронной почтой не зарегистрирован';
          this.setState({
            errors,
            user: {
              email: ''
            }
          });
          //console.log(error.response.data.errors.name);
          //console.log(errors.summary);
        }
        });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }
  /**
   * Render the component.
   */
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

ForgotPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ForgotPage;

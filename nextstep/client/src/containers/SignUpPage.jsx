import React, { PropTypes } from 'react';
import HomePage from '../components/HomePage.jsx';
import axios from 'axios';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
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

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
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
        //console.log(res);
        if (res.status === 200) {
          // success

          // change the component-container state
          this.setState({
            errors: {}
          });

          localStorage.setItem('successMessage', res.data.message);

          // make a redirect
          this.context.router.replace('/login');
        }
      })
        .catch(error => {
        if (error.response) {
          //console.log(error.response);
          const errors = error.response ? error.response : {};
          errors.summary = error.response.data.message;
          this.setState({
            errors
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
  /**
   * Render the component.
   */
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

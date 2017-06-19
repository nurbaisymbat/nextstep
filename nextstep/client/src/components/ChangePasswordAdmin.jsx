import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';
import axios from 'axios';

class ChangePasswordAdmin extends React.Component {

  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('firstlogin');
    let firstlogin = '';

    if (storedMessage) {
      firstlogin = storedMessage;
      localStorage.removeItem('firstlogin');
    }
    const storedEmail = localStorage.getItem('useremail');
    let useremail = '';

    if (storedEmail) {
      useremail = storedEmail;
      localStorage.removeItem('useremail');
    }

    this.state = {
      firstlogin,
      useremail,
      user: {
        password: '',
        passwordConfirm: ''
      },
      checkPasswordMatch: false
    };
    this.changePwd = this.changePwd.bind(this);
    this.submitPwd = this.submitPwd.bind(this);
  }
  changePwd(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    if(this.state.user.password == this.state.user.passwordConfirm){
      this.setState({
        user,
        checkPasswordMatch: true
      });
    } else {
      this.setState({
        user,
        checkPasswordMatch: false
      });
    }
  }
  submitPwd(event){
    event.preventDefault();
    const email = encodeURIComponent(this.state.useremail);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;
    axios.post('/auth/newpassword', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            firstlogin: '',
            useremail: '',
            user: {
              password: '',
              passwordConfirm: ''
            },
            checkPasswordMatch: false
          });

          Auth.authenticateUser(res.data.token);
          this.context.router.replace('/');
        }
      })
  }

  render() {
    return (<div className="container">
            <div className="row text-center">
            <div className="col-md-5 center-block" style={{marginTop: '3%'}}>
            <h2 className="logo"><span className="next">Next</span><span className="step">Step</span></h2>
              <div className="notAuthForm">
                <form action="/" onSubmit={this.submitPwd}>
                  <h3 className="headerText">Авторизация</h3>
                  {this.state.firstlogin && <p style={{ fontSize: '14px', color: 'green' }}>{this.state.firstlogin}</p>}
                  <div className="form-group">
                    <input type="password" className="form-control" placeholder="Новый пароль"
                    name="password"
                    onChange={this.changePwd}
                    value={this.state.user.password} />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" placeholder="Повторите новый пароль"
                    name="passwordConfirm"
                    onChange={this.changePwd}
                    value={this.state.user.passwordConfirm} />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={!this.state.checkPasswordMatch}>Отпарвить</button>
                  </div>
                </form>
              </div>
              </div>
            </div>
            </div>);
  }
}

ChangePasswordAdmin.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ChangePasswordAdmin;

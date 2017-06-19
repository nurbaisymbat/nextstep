import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';

class MainAdmin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
         _id: '',
         name: '',
         email: '',
         password: ''
      },
      password: '',
      passwordConfirm: '',
      message: '',
      errors: {},
      checkEditAdmin: false
    };
    this.cleanEdit = this.cleanEdit.bind(this);
    this.changePwd = this.changePwd.bind(this);
    this.changeAdmin = this.changeAdmin.bind(this);
    this.changePwdConfirm = this.changePwdConfirm.bind(this);
    this.editAdmin = this.editAdmin.bind(this);
  }
  componentDidMount(){
    axios.get('/profile/getadmin',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            user: res.data.user
          });
      });
  }
  editAdmin(event){
    event.preventDefault();
    const password = encodeURIComponent(this.state.password);
    const formData = `user=${JSON.stringify(this.state.user)}&password=${password}`;
    axios.post('/profile/editmainadmin', formData,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            user: res.data.user,
            checkEditAdmin: false,
            message: 'Данные успешно сохранены',
            errors: {},
            password: '',
            passwordConfirm: ''
          });
      });
  }
  cleanEdit(){
    this.setState({
      checkEditAdmin: false,
      errors: {}
    })
    this.componentDidMount();
  }
  changePwdConfirm(event){
    const errors = this.state.errors;
    if(this.state.password == event.target.value){
      errors.summary = '';
      this.setState({
        passwordConfirm: event.target.value,
        errors,
        checkEditAdmin: true,
        message: ''
      })
    } else {
      errors.summary = 'Пароли не совпадают';
      this.setState({
        passwordConfirm: event.target.value,
        errors,
        checkEditAdmin: false,
        message: ''
      })
    }
  }
  changeAdmin(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    if(this.state.password == this.state.passwordConfirm){
      this.setState({
        user,
        checkEditAdmin: true,
        message: ''
      })
    } else {
      this.setState({
        user,
        checkEditAdmin: false,
        message: ''
      })
    }

  }
  changePwd(event){
    if(this.state.passwordConfirm == event.target.value){
      this.setState({
        password: event.target.value,
        checkEditAdmin: true,
        message: ''
      })
    } else {
      this.setState({
        password: event.target.value,
        checkEditAdmin: false,
        message: ''
      })
    }

  }
  render() {
    return (<div className="container">
              <h3><em>Мои данные</em></h3>
              <div className="row ">
                <div className="col-md-11 well"  style={{background: 'white', width: '89.5%'}}>
                <h4>Изменение данных</h4>
                {this.state.message && <p style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</p>}
                {this.state.errors.summary && <p style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</p>}
                <form onSubmit={this.editAdmin}>
                  <div className="form-group">
                      <input type="text" className="form-control" name="name"
                             value={this.state.user.name} onChange={this.changeAdmin}
                             placeholder="Введите имя пользователя"/>
                  </div>
                  <div className="form-group">
                      <input type="email" className="form-control" name="email"
                             value={this.state.user.email} onChange={this.changeAdmin}
                             placeholder="Введите адрес электронной почты"/>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <input type="password" className="form-control" name="password"
                             value={this.state.password} onChange={this.changePwd}
                             placeholder="Введите пароль"/>
                    </div>
                    <div className="col-md-6">
                      <input type="password" className="form-control" name="passwordConfirm"
                             value={this.state.passwordConfirm} onChange={this.changePwdConfirm}
                             placeholder="Подтвердите пароль"/>
                    </div>

                  </div>
                  <div className="form-group text-right">
                    <button type="submit" className="btn btn-success"
                            style={{paddingRight: '5%', paddingLeft: '5%', marginRight: '3%'}}
                            disabled={!this.state.checkEditAdmin} >Изменить</button>
                    <button type="button" className="btn btn-default"
                            style={{paddingRight: '5%', paddingLeft: '5%'}}
                            onClick={this.cleanEdit} >Отменить</button>
                  </div>
                </form>
                </div>
              </div>
          </div>);
  }
}

export default MainAdmin;

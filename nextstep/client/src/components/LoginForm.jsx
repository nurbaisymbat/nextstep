import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
<div className="container">
  <div className="row text-center">
  <div className="col-sm-5 col-sm-offset-4" style={{marginTop: '3%'}}>
  <h2 className="logo"><span className="next">Next</span><span className="step">Step</span></h2>
    <div className="notAuthForm">
      <form action="/" onSubmit={onSubmit}>
        <h3 className="headerText">Авторизация</h3>
        {successMessage && <p style={{ fontSize: '14px', color: 'green' }}>{successMessage}</p>}
        {errors.summary && <p style={{ fontSize: '14px', color: 'red' }}>{errors.summary}</p>}
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email"
          name="email"
          onChange={onChange}
          value={user.email} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Пароль"
          name="password"
          onChange={onChange}
          value={user.password} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block">Войти</button>
        </div>
        <h5 className="alreadyHave"><Link to="/forgot" >Забыли пароль?</Link></h5>
      </form>
    </div>
    <h4 className="alreadyHave">Еще нет аккаунта? <Link to="/" >Зарегистрироваться</Link></h4>
    </div>
  </div>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;

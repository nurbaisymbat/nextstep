import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const ForgotForm = ({
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
        <h3 className="headerText">Восстановление пароля</h3>
        <h5 className="headerText">Введите свой адрес электронной почты, и мы отправим Вам электронное письмо с инструкциями по сбору пароля.</h5>
        {successMessage && <p style={{ fontSize: '14px', color: 'green' }}>{successMessage}</p>}
        {errors.summary && <p style={{ fontSize: '14px', color: 'red' }}>{errors.summary}</p>}
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email"
          name="email"
          onChange={onChange}
          value={user.email} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block">Отправить</button>
        </div>
      </form>
    </div>
    <h4 className="alreadyHave"><Link to="/login" >Перейти на страницу авторизации</Link></h4>
    </div>
  </div>
  </div>
);

ForgotForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default ForgotForm;

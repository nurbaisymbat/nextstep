import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ChangePwdForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  checkPasswordMatch,
  passwordConfirm
}) => (
<div className="container">
  <div className="row text-center">
  <div className="col-sm-5 col-sm-offset-3">
  <h2 className="logo"><span className="next">Next</span><span className="step">Step</span></h2>
    <div className="notAuthForm">
      <form action="/" onSubmit={onSubmit}>
        <h3 className="headerText">Введите новый пароль</h3>
        {errors.summary && <p style={{ fontSize: '14px', color: 'red' }}>{errors.summary}</p>}
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Пароль"
          name="password"
          onChange={onChange}
          value={user.password} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Подтвердите пароль"
          name="passwordConfirm"
          onChange={checkPasswordMatch}
          value={passwordConfirm} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block">Поменять пароль</button>
        </div>
      </form>
    </div>
    </div>
  </div>
  </div>
);

ChangePwdForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  checkPasswordMatch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  passwordConfirm: PropTypes.string.isRequired
};

export default ChangePwdForm;

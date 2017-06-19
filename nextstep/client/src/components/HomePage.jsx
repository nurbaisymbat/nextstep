import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const HomePage = ({
  onSubmit,
  onChange,
  errors,
  user,
  checked
}) => (
<div className="container">
  <div className="row text-center">
  <div className="col-md-5 center-block" style={{marginTop: '3%'}}>
  <h2 className="logo"><span className="next">Next</span><span className="step">Step</span></h2>
    <div className="notAuthForm">
      <form action="/" onSubmit={onSubmit}>
        <h3 className="headerText">Регистрация</h3>
        {errors.summary && <p style={{ fontSize: '14px', color: 'red' }}>{errors.summary}</p>}
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email"
          name="email"
          onChange={onChange}
          value={user.email} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Имя"
          name="name"
          onChange={onChange}
          value={user.name} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Логин с Trello"
          name="trelloUser"
          onChange={onChange}
          value={user.trelloUser} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Пароль"
          name="password"
          onChange={onChange}
          value={user.password} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Подтвердите пароль"
          name="passwordConfirm"
          onChange={onChange}
          value={user.passwordConfirm} />
        </div>
        <div className="form-group">
          <select name="department" className="form-control" onChange={onChange} value={user.department}>
            <option value="">Выберите отдел</option>
            <option value="Дизайн">Дизайн</option>
            <option value="Программирования">Программирования</option>
          </select>
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block" disabled={!checked}>Зарегистрироваться</button>
        </div>
      </form>
    </div>
    <h4 className="alreadyHave">Уже есть аккаунт? <Link to="/login" >Войти</Link></h4>
    </div>
  </div>
  </div>
);

HomePage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default HomePage;

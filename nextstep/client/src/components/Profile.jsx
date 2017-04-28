import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Profile = ({
  onSubmit,
  onChange,
  errors,
  personalInfo,
  checked,
  message,
  birthday
}) => (
<div className="container">
  <div className="row text-center">
  <div className="col-sm-5 col-sm-offset-3">
  <h2 className="logo"><span className="next">Next</span><span className="step">Step</span></h2>
    <div className="notAuthForm">
      <form action="/" onSubmit={onSubmit}>
        <h3 className="headerText">Личная информация</h3>
        {message && <p style={{ fontSize: '14px', color: 'green' }}>{message}</p>}
        {errors.summary && <p style={{ fontSize: '14px', color: 'red' }}>{errors.summary}</p>}
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Имя"
          name="firstName"
          onChange={onChange}
          value={personalInfo.firstName} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Фамилия"
          name="lastName"
          onChange={onChange}
          value={personalInfo.lastName} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Дата рождения (гггг-мм-дд)"
          name="birthday"
          onChange={onChange}
          value={birthday} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Город"
          name="city"
          onChange={onChange}
          value={personalInfo.city} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Номер телефона"
          name="phone"
          onChange={onChange}
          value={personalInfo.phone} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Образование"
          name="education"
          onChange={onChange}
          value={personalInfo.education} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block" disabled={!checked}>Отправить</button>
        </div>
      </form>
    </div>
    </div>
  </div>
  </div>
);

Profile.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  personalInfo: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired
};

export default Profile;

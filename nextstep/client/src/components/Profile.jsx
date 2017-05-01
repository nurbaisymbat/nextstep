import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DatePicker from 'react-bootstrap-date-picker';

const Profile = ({
  onSubmit,
  onChange,
  errors,
  personalInfo,
  checked,
  message,
  birthday,
  hide,
  user,
  onClick,
  dateChange,
  anotherBDay
}) => (
<div className="container">
  <div className="row text-center">
  <div className="col-md-7">
    <div className="row personal well">
      <div className="col-md-4">
        <img src={require('../../../public/img/no-user-image.jpg')} className="img-thumbnail" />
      </div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-8">
            <h4 className="text-left">{user.name}</h4>
          </div>
          <div className="col-md-4" hidden={hide}>
            <span className="glyphicon glyphicon-pencil myPencil" onClick={onClick}></span>
          </div>
          <div className="col-md-4" hidden={!hide}>
            <span className="glyphicon glyphicon-pencil myPencilHidden" onClick={onClick}></span>
          </div>
        </div>
        <div hidden={hide} className=" infoDiv">
          <div className="row">
            <p>
              <span className="col-sm-4 personalLabel">E-mail:</span>
              <span className="col-sm-8 personalInfo">{user.email}</span>
            </p>
          </div>
          <div className="row">
            <p>
              <span className="col-sm-4 personalLabel">Дата рождения:</span>
              <span className="col-sm-8 personalInfo">{birthday}</span>
            </p>
          </div>
          <div className="row">
            <p>
              <span className="col-sm-4 personalLabel">Город:</span>
              <span className="col-sm-8 personalInfo">{personalInfo.city}</span>
            </p>
          </div>
          <div className="row">
            <p>
              <span className="col-sm-4 personalLabel">Номер:</span>
              <span className="col-sm-8 personalInfo">{personalInfo.phone}</span>
            </p>
          </div>
        </div>
        <div hidden={!hide}>
          <form action="/" onSubmit={onSubmit} className="form-horizontal">
            <div className="row">
                <span className="col-sm-4 personalLabel">E-mail:</span>
                <div className="col-sm-8">
                  <input type="e-mail" className="form-control" placeholder="E-mail"
                  name="email"
                  onChange={onChange}
                  value={user.email}/>
                </div>
            </div>
            <div className="row">
                <span className="col-sm-4 personalLabel">Дата рождения:</span>
                <div className="col-sm-8">
                  <DatePicker value={anotherBDay} onChange={dateChange} />
                </div>
            </div>
            <div className="row">
                <span className="col-sm-4 personalLabel">Город:</span>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="Город"
                  name="city"
                  onChange={onChange}
                  value={personalInfo.city}/>
                </div>
            </div>
            <div className="row">
                <span className="col-sm-4 personalLabel">Номер:</span>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="Номер"
                  name="phone"
                  onChange={onChange}
                  value={personalInfo.phone}/>
                </div>
            </div>
            <div className="row profileSend">
              <div className="col-md-4 col-md-offset-4">
                <button type="button" className="btn btn-default btn-block" onClick={onClick}>Отменить</button>
              </div>
              <div className="col-md-4">
                <button type="submit" className="btn btn-primary btn-block" disabled={!checked}>Сохранить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className="row today well">
      <h4 className="text-center">Сегодня</h4>
      <div className="row eachToday">
        <div className="col-md-5 text-right">
          <p className="todayTime">1 час назад</p>
          <p className="todayDone">Посмотрел фильм Гении дизайна и заполнил пункты (10/10)</p>
        </div>
        <div className="col-md-2">
          <hr className="todayVerticalLineUp"/>
          <hr className="todayHorizontalLineLeft"/>
          <img src={require('../../../public/img/red-circle.png')} className="todayImg"/>
          <hr className="todayVerticalLineDown"/>
        </div>
        <div className="col-md-5">
        </div>
      </div>
      <div className="row eachToday">
        <div className="col-md-5">
        </div>
        <div className="col-md-2">
          <hr className="todayVerticalLineUp"/>
          <hr className="todayHorizontalLineRight"/>
          <img src={require('../../../public/img/red-circle.png')} className="todayImg"/>
          <hr className="todayVerticalLineDown"/>
        </div>
        <div className="col-md-5 text-left">
          <p className="todayTime">1 час назад</p>
          <p className="todayDone">Посмотрел фильм Гении дизайна и заполнил пункты (10/10)</p>
        </div>
      </div>
      <div className="row eachToday">
        <div className="col-md-5 text-right">
          <p className="todayTime">1 час назад</p>
          <p className="todayDone">Посмотрел фильм Гении дизайна и заполнил пункты (10/10)</p>
        </div>
        <div className="col-md-2">
          <hr className="todayVerticalLineUp"/>
          <hr className="todayHorizontalLineLeft"/>
          <img src={require('../../../public/img/red-circle.png')} className="todayImg"/>
          <hr className="todayVerticalLineDown"/>
        </div>
        <div className="col-md-5">
        </div>
      </div>
      <div className="row eachToday">
        <div className="col-md-5">
        </div>
        <div className="col-md-2">
          <hr className="todayVerticalLineUp"/>
          <hr className="todayHorizontalLineRight"/>
          <img src={require('../../../public/img/red-circle.png')} className="todayImg"/>
          <hr className="todayVerticalLineDown"/>
        </div>
        <div className="col-md-5 text-left">
          <p className="todayTime">1 час назад</p>
          <p className="todayDone">Посмотрел фильм Гении дизайна и заполнил пункты (10/10)</p>
        </div>
      </div>
      <div className="row eachToday">
        <div className="col-md-5 text-right">
          <p className="todayTime">1 час назад</p>
          <p className="todayDone">Посмотрел фильм Гении дизайна и заполнил пункты (10/10)</p>
        </div>
        <div className="col-md-2">
          <hr className="todayVerticalLineUp"/>
          <hr className="todayHorizontalLineLeft"/>
          <img src={require('../../../public/img/red-circle.png')} className="todayImg"/>
          <hr className="todayVerticalLineDown"/>
        </div>
        <div className="col-md-5">
        </div>
      </div>

    </div>
    </div>
    <div className="col-md-4 ">
      <div className="row stream well">
        <h4 className="text-left">Поток</h4>
        <div className="row firstStream">
          <div className="col-md-3">
            <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle streamImg" />
          </div>
          <div className="col-md-9 text-left streamName">
            <h5>Тимур</h5>
          </div>
        </div>
        <hr className="btwnUsers"/>
        <div className="row">
          <div className="col-md-3">
            <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle streamImg" />
          </div>
          <div className="col-md-9 text-left streamName">
            <h5>Света</h5>
          </div>
        </div>
        <hr className="btwnUsers"/>
        <div className="row">
          <div className="col-md-3">
            <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle streamImg" />
          </div>
          <div className="col-md-9 text-left streamName">
            <h5>Айгерим</h5>
          </div>
        </div>
        <hr className="btwnUsers"/>
        <div className="row">
          <div className="col-md-3">
            <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle streamImg" />
          </div>
          <div className="col-md-9 text-left streamName">
            <h5>Евгений</h5>
          </div>
        </div>
        <hr className="btwnUsers"/>
        <div className="row">
          <div className="col-md-3">
            <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle streamImg" />
          </div>
          <div className="col-md-9 text-left streamName">
            <h5>Арман</h5>
          </div>
        </div>
      </div>
      <div className="row myProgress well">
        <h4 className="text-left">Прогресс</h4>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <h5 className="col-md-8 text-left">Урок</h5>
              <h5 className="col-md-4 text-right myProgressPercent">80</h5>
            </div>
            <div className="progress myProgressBar">
              <div className="progress-bar" role="progressbar" aria-valuenow="70"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": "80%"}}>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <h5 className="col-md-8 text-left">Задача</h5>
              <h5 className="col-md-4 text-right myProgressPercent">50</h5>
            </div>
            <div className="progress myProgressBar">
              <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": "50%"}}>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <h5 className="col-md-8 text-left">Фильм</h5>
              <h5 className="col-md-4 text-right myProgressPercent">70</h5>
            </div>
            <div className="progress myProgressBar">
              <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="70"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": "70%"}}>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <h5 className="col-md-8 text-left">Книга</h5>
              <h5 className="col-md-4 text-right myProgressPercent">65</h5>
            </div>
            <div className="progress myProgressBar">
              <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="70"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": "65%"}}>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <h5 className="col-md-8 text-left">Инсайт</h5>
              <h5 className="col-md-4 text-right myProgressPercent">65</h5>
            </div>
            <div className="progress myProgressBar">
              <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="70"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": "65%"}}>
              </div>
            </div>
          </div>
        </div>
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
  birthday: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  dateChange: PropTypes.func.isRequired
};

export default Profile;

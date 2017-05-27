import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

const UserProfile = ({
  userId,
  personalInfo,
  user,
  notes,
  messageNotes,
  myProgress
}) => (
<div className="container">
<h3><em><Link to="/users" style={{borderBottom: '1px dotted #000', color: '#000'}}>Пользователи</Link> / Профиль </em></h3>
<div className="row text-center">
<div className="col-md-7">
  <div className="row personal well">
    <div className="col-md-4">
    {user.myImg.length > 0 ?(
      <img src={require('../../../public/userImgs/'+user.myImg)} className="img-thumbnail" />
    ):(
      <img src={require('../../../public/img/no-user-image.jpg')} className="img-thumbnail" />
    )}
    </div>
    <div className="col-md-8">
      <div className="row">
        <div className="col-md-8">
          <h4 className="text-left">{user.name}</h4>
        </div>
      </div>
      <div className=" infoDiv">
        <div className="row">
          <p>
            <span className="col-sm-4 personalLabel">E-mail:</span>
            <span className="col-sm-8 personalInfo">{user.email}</span>
          </p>
        </div>
        {Object.getOwnPropertyNames(personalInfo).length === 0 ?(
          <div>
          <div className="row">
            <p>
              <span className="col-sm-4 personalLabel">Дата рождения:</span>
              <span className="col-sm-8 personalInfo">Неизвестно</span>
            </p>
          </div>
          <div className="row">
            <p>
              <span className="col-sm-4 personalLabel">Город:</span>
              <span className="col-sm-8 personalInfo">Неизвестно</span>
            </p>
          </div>
          <div className="row">
            <p>
              <span className="col-sm-4 personalLabel">Номер:</span>
              <span className="col-sm-8 personalInfo">Неизвестно</span>
            </p>
          </div>
          </div>
        ):(
          <div>
          <div className="row">
            <p>
              <span className="col-sm-4 personalLabel">Дата рождения:</span>
              <span className="col-sm-8 personalInfo">{moment(personalInfo.birthDate).format('LL')}</span>
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
        )}
      </div>
    </div>
  </div>
  <div className="row today well">
    <h4 className="text-center">Сегодня</h4>
    {notes.length < 1 ?(
      <h5 className="text-center">{messageNotes}</h5>
    ):(
      <div></div>
    )}
    {notes.map((note, n) =>
        <div key={n}>
          {(note.type == 'movie') && (n%2==0) ?(
            <div className="row eachToday ">
              <div className="col-md-6 text-right eachToday-left">
                <p className="todayTime">{note.date} часа назад</p>
                <p className="todayDone">Посмотрел фильм {note.title} и заполнил пункты ({note.num}/10)</p>
              </div>
              <div className="col-md-2 myCircle-left">
                <hr className="todayHorizontalLineLeft"/>
                <img src={require('../../../public/img/red-circle.png')} className="todayImg"/>
              </div>
            </div>
          ):((note.type == 'movie') && (n%2==1)) ?(
            <div className="row eachToday">
              <div className="col-md-6 text-left eachToday-right">
                <p className="todayTime">{note.date} часа назад</p>
                <p className="todayDone">Посмотрел фильм {note.title} и заполнил пункты ({note.num}/10)</p>
              </div>
              <div className="col-md-2 myCircle-right">
                <hr className="todayHorizontalLineRight"/>
                <img src={require('../../../public/img/red-circle.png')} className="todayImg"/>
              </div>
            </div>
          ):((note.type == 'book') && (n%2==0)) ?(
            <div className="row eachToday ">
              <div className="col-md-6 text-right eachToday-left">
                <p className="todayTime">{note.date} часа назад</p>
                <p className="todayDone">Прочитал книгу {note.title} и заполнил пункты ({note.num}/10)</p>
              </div>
              <div className="col-md-2 myCircle-left">
                <hr className="todayHorizontalLineLeft"/>
                <img src={require('../../../public/img/red-circle.png')} className="todayImg"/>
              </div>
            </div>
          ):(
            <div className="row eachToday">
              <div className="col-md-6 text-left eachToday-right">
                <p className="todayTime">{note.date} часа назад</p>
                <p className="todayDone">Прочитал книгу {note.title} и заполнил пункты ({note.num}/10)</p>
              </div>
              <div className="col-md-2 myCircle-right">
                <hr className="todayHorizontalLineRight"/>
                <img src={require('../../../public/img/red-circle.png')} className="todayImg"/>
              </div>
            </div>
          )}
        </div>
    )}
  </div>
  </div>
  <div className="col-md-4 ">
  <div className="row myProgress well">
    <h4 className="text-left">Прогресс</h4>
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <h5 className="col-md-8 text-left">Урок</h5>
          <h5 className="col-md-4 text-right myProgressPercent">{myProgress.task}</h5>
        </div>
        <div className="progress myProgressBar">
          <div className="progress-bar" role="progressbar" aria-valuenow="70"
                aria-valuemin="0" aria-valuemax="100" style={{"width": myProgress.task}}>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <h5 className="col-md-8 text-left">Фильм</h5>
          <h5 className="col-md-4 text-right myProgressPercent">{myProgress.video}</h5>
        </div>
        <div className="progress myProgressBar">
          <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="70"
                aria-valuemin="0" aria-valuemax="100" style={{"width": myProgress.video}}>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <h5 className="col-md-8 text-left">Книга</h5>
          <h5 className="col-md-4 text-right myProgressPercent">{myProgress.book}</h5>
        </div>
        <div className="progress myProgressBar">
          <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="70"
                aria-valuemin="0" aria-valuemax="100" style={{"width": myProgress.book}}>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <h5 className="col-md-8 text-left">Инсайт</h5>
          <h5 className="col-md-4 text-right myProgressPercent">{myProgress.insight}</h5>
        </div>
        <div className="progress myProgressBar">
          <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="70"
                aria-valuemin="0" aria-valuemax="100" style={{"width": myProgress.insight}}>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</div>
);

export default UserProfile;

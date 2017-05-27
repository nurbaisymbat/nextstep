import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Trello from './Trello.jsx';
moment.locale('ru');

const Dashboard = ({
  user,
  remainedDays,
  remainedDaysPercent,
  maxPoints,
  maxPointsPercent,
  users
  }) => (
  <div className="container">
  <h3><em>Главная</em></h3>
  <div className="row">
      <div className="col-md-6">
        <div className="row totalPoints well">
          <h4>Общий балл</h4>
          <div className="row" style={{paddingLeft: '15px', paddingRight: '15px'}}>
            <div style={{float: 'right', marginTop: '15px'}}>
              <h2 style={{marginBottom: '20px', marginLeft: '65px'}}>{user.points} / {maxPoints}</h2>
            </div>
          </div>
          <div className="row" style={{paddingLeft: '15px', paddingRight: '15px'}}>
            <div className="progress myProgressBar">
              <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": maxPointsPercent}}>
              </div>
            </div>
          </div>
        </div>
        <div className="row totalPoints well">
          <h4>Топ стажеров</h4>
          {users.slice(0, 5).map((userr, u) =>
              <div key={u}>
                <div>
                  <div className="row">
                    <div className="col-md-1"><h4 style={{marginTop: '16px'}}>{u+1}</h4></div>
                    <div className="col-md-2">
                    {userr.myImg.length > 0 ?(
                      <img src={require('../../../public/userImgs/'+userr.myImg)} className="img-circle" style={{width: '50px'}}/>
                    ):(
                      <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle" style={{width: '50px'}}/>
                    )}
                    </div>
                    <div className="col-md-6">
                      <h5>{userr.name}</h5>
                      <h4><small>{userr.email}</small></h4>
                    </div>
                    <div className="col-md-3 text-right">
                      <h3 style={{marginTop: '5px', marginBottom: '5px'}}>{userr.points}</h3>
                        <h4 style={{marginTop: '0px'}}><small>баллов</small></h4>
                    </div>
                  </div>
                  <div className="row" style={{paddingLeft: '15px', paddingRight: '15px'}}>
                  <div className="progress myProgressBar">
                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70"
                          aria-valuemin="0" aria-valuemax="100" style={{"width": (userr.points*100/maxPoints)+'%'}}>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="row remainedDays well">
          <h4>Дни</h4>
          <div className="row">
            <div className="col-md-6">
            <div className={remainedDaysPercent}>
              <span>{remainedDays}</span>
              <div className="left-half-clipper">
                <div className="first50-bar"></div>
                <div className="value-bar"></div>
              </div>
            </div>
            </div>
            <div className="col-md-6" >
            <div style={{float: 'right', marginTop: '15px'}}>
              <h1 style={{marginBottom: '0px', marginLeft: '65px'}}>{remainedDays}</h1>
              <h3 style={{marginTop: '0px'}}><small>Осталось дней</small></h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row remainedDays well" style={{paddingBottom: '50px'}}>
          <Trello />
        </div>
      </div>
    </div>
  </div>
);

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default Dashboard;

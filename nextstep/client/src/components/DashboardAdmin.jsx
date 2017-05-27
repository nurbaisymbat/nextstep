import React from 'react';
import PropTypes from 'prop-types';

const DashboardAdmin = ({
  users,
  maxPoints,
  progress
  }) => (
  <div className="container">
  <h3><em>Главная</em></h3>
    <div className="row">
      <div className="col-md-6">
        <div className="row totalPoints well">
        <h4>Заполняемость контента</h4>
        <div className="text-right"><span className="btn btn-success"></span><span style={{padding: '10px'}}>Фильм</span>
        <span className="btn btn-warning"></span><span style={{padding: '10px'}}>Книга</span>
        <span className="btn btn-danger"></span><span style={{padding: '10px'}}>Инсайт</span></div>
          {progress.map((pr, p) =>
            <div key={p}>
            <h5>{pr.name}</h5>
              <div className="progress">
                <div className="progress-bar progress-bar-success" role="progressbar" style={{width: pr.movies + '%'}}>
                </div>
                <div className="progress-bar progress-bar-warning" role="progressbar" style={{width: (pr.books*3) + '%'}}>
                </div>
                <div className="progress-bar progress-bar-danger" role="progressbar" style={{width: (pr.insight*10) + '%'}}>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="row remainedDays well">
          <h4>Топ стажеров</h4>
          {users.slice(0, 5).map((user, u) =>
              <div key={u}>
                <div>
                  <div className="row">
                    <div className="col-md-1"><h4 style={{marginTop: '16px'}}>{u+1}</h4></div>
                    <div className="col-md-2">
                    {user.myImg.length > 0 ?(
                      <img src={require('../../../public/userImgs/'+user.myImg)} className="img-circle" style={{width: '50px'}}/>
                    ):(
                      <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle" style={{width: '50px'}}/>
                    )}
                    </div>
                    <div className="col-md-6">
                      <h5>{user.name}</h5>
                      <h4><small>{user.email}</small></h4>
                    </div>
                    <div className="col-md-3 text-right">
                      <h3 style={{marginTop: '5px', marginBottom: '5px'}}>{user.points}</h3>
                        <h4 style={{marginTop: '0px'}}><small>баллов</small></h4>
                    </div>
                  </div>
                  <div className="row" style={{paddingLeft: '15px', paddingRight: '15px'}}>
                  <div className="progress myProgressBar">
                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70"
                          aria-valuemin="0" aria-valuemax="100" style={{"width": (user.points*100/maxPoints)+'%'}}>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  </div>
);


export default DashboardAdmin;

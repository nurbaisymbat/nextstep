import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import YouTube from 'react-youtube';
import moment from 'moment';

const InsightNote = ({
  user,
  insight,
  videoId,
  opts,
  _onReady,
  onApprove
}) => (
<div className="container">
<h3><em><Link to="/notes" style={{borderBottom: '1px dotted #000', color: '#000'}}>Заметки</Link> / Инсайт </em></h3>
  <div className="row">
    <div className="col-md-7 material well">
      <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
    </div>
    <div className="col-md-4">
    <div className="description well">
    <h4>Инсайт пользователя: </h4>
    <div className="row" style={{paddingTop: '20px', paddingBottom: '20px'}}>
      <div className="col-md-3">
        <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle" style={{width: '70px'}}/>
      </div>
      <div className="col-md-9">
      <h4>{user.name}</h4>
      <h4><small>{user.email}</small></h4>
      </div>
    </div>
    <h5>Добавлен в {moment(insight.date).format('llll')}</h5>
    <hr/>
      {(insight.approved == 0)?(
        <div>
          <button type="button" onClick={onApprove} id="approve" className="btn btn-success btn-block">Утвердить</button>
          <button type="button" onClick={onApprove} id="disapprove" className="btn btn-danger btn-block">Отклонить</button>
        </div>
      ):(insight.approved == 1)?(
        <h5 className="text-center" style={{color: 'green'}}>Вы утвердили эту заметку!</h5>
      ):(
        <h5 className="text-center" style={{color: 'red'}}>Вы отклонили эту заметку!</h5>
      )}
    </div>
    </div>
  </div>
</div>
);

export default InsightNote;

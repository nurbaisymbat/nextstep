import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import YouTube from 'react-youtube';
import moment from 'moment';

const MovieNote = ({
  movienote,
  user,
  movie,
  videoId,
  opts,
  _onReady,
  onApprove
}) => (
<div className="container">
<h3><em><Link to="/notes" style={{borderBottom: '1px dotted #000', color: '#000'}}>Заметки</Link> / Фильм </em></h3>
  <div className="row">
    <div className="col-md-7 material well">
      <h4>Фильм: <span className="text-uppercase text-primary">"{movie.title}"</span></h4>
      <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
    </div>
    <div className="col-md-4 description well">
    <div className="row">
      <div className="col-md-3">
        <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle" style={{width: '70px'}}/>
      </div>
      <div className="col-md-9">
      <h4>{user.name}</h4>
      <h4><small>{user.email}</small></h4>
      </div>
    </div>
      <h4 className="taskList">Заметка</h4>
      <div className="eachTask eachTaskFirst">
        <div>{movienote.text}</div>
        <h5><small>{moment(movienote.date).format('llll')}</small></h5>
      </div>
      <hr/>
      {(movienote.approved == 0)?(
        <div>
          <button type="button" onClick={onApprove} id="approve" className="btn btn-success btn-block">Утвердить</button>
          <button type="button" onClick={onApprove} id="disapprove" className="btn btn-danger btn-block">Отклонить</button>
        </div>
      ):(movienote.approved == 1)?(
        <h5 className="text-center" style={{color: 'green'}}>Вы утвердили эту заметку!</h5>
      ):(
        <h5 className="text-center" style={{color: 'red'}}>Вы отклонили эту заметку!</h5>
      )}
    </div>
  </div>
</div>
);

export default MovieNote;

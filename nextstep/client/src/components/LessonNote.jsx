import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import YouTube from 'react-youtube';
import moment from 'moment';

const LessonNote = ({
  lessonnote,
  user,
  lesson,
  onApprove,
  tasks,
  deadline,
  downloadFile
}) => (
<div className="container">
<h3><em><Link to="/notes" style={{borderBottom: '1px dotted #000', color: '#000'}}>Заметки</Link> / Урок </em></h3>
  <div className="row">
    <div className="col-md-7 material well">
      <h4>Урок: <span className="text-uppercase text-primary">"{lesson.title}"</span></h4>
      <div className="row" style={{marginTop: '25px'}}>
        <div className="col-md-2">
        {user.myImg.length > 0 ?(
          <img src={require('../../../public/userImgs/'+user.myImg)} className="img-circle" style={{width: '70px'}} />
        ):(
          <img src={require('../../../public/img/no-user-image.jpg')} className="img-circle" style={{width: '70px'}} />
        )}
        </div>
        <div className="col-md-7">
          <h4>{user.name}</h4>
          <h4><small>{user.email}</small></h4>
        </div>
        <div className="col-md-3 text-right">
        <h2 style={{marginTop: '0px', marginBottom: '0px'}} className="text-success"><strong>{user.points}</strong></h2>
        <h4 style={{marginTop: '0px'}}><small>Общий балл</small></h4>
        </div>
      </div>
      <div className="row" style={{padding: '20px'}}>
        <h5>Вложения</h5>
        <div className="col-md-3" style={{padding: '0px'}}>
          <img src={require('../../../public/img/file-four.png')}  style={{width: '150px'}}/>
        </div>
        <div className="col-md-5" style={{marginTop: '34px'}}>
          <p>Добавлено {moment(lessonnote.date).format('llll')}</p>
          <button type="button" className="btn btn-default btn-block" onClick={downloadFile}>
            <span className="glyphicon glyphicon-download-alt"></span> Скачать
          </button>
        </div>
        <div className="col-md-4" style={{marginTop: '25px', padding: '0px'}}>
        {(lessonnote.approved == 0)?(
          <div>
            <button type="button" onClick={onApprove} id="approve" className="btn btn-success btn-block">Утвердить</button>
            <button type="button" onClick={onApprove} id="disapprove" className="btn btn-danger btn-block">Отклонить</button>
          </div>
        ):(lessonnote.approved == 1)?(
          <h5 className="text-center" style={{color: 'green'}}>Вы уже оценили это задание!</h5>
        ):(
          <h5 className="text-center" style={{color: 'red'}}>Вы отклонили решение этой задачи!</h5>
        )}
        </div>
      </div>
    </div>
    <div className="col-md-4 description well">
      <h4>Описание</h4>
      <h4><small>{lesson.description}</small></h4>
      <h4 className="taskList">Задания</h4>
      {tasks.map((task, t) =>
        <div key={t}>
        {(tasks[t] != '') ?(
          <div>
            <div className="eachTask">
              <div>{task}</div>
              <h5><small>Срок до {moment(deadline).format('LL')}</small></h5>
            </div>
            <hr/>
          </div>
        ):(
          <div></div>
        )}
        </div>
      )}
    </div>
  </div>
</div>
);

export default LessonNote;

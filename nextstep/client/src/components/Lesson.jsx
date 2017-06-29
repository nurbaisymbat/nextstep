import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';
import moment from 'moment';
moment.locale('ru');

const Lesson = ({
  _onReady,
  opts,
  _handleSubmit,
  _handleImageChange,
  filename,
  message,
  videoId,
  myLesson,
  deadline,
  changeVideo
}) => (
  <div className="container">
  <h3><em>Урок дня</em></h3>
    <div className="row">
      <div className="col-md-7">
        <div className="row material well">
          <div className="col-md-1 video-arrows" id="video-left" onClick={changeVideo}>
            <img src={require('../../../public/img/video-left.png')} id="video-left" style={{height: '40px', width: '20px'}}/>
          </div>
          <div className="col-md-10">
            <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
          </div>
          <div className="col-md-1 video-arrows" id="video-right" onClick={changeVideo}>
            <img src={require('../../../public/img/video-right.png')} id="video-right" style={{height: '40px', width: '20px'}}/>
          </div>
        </div>
        <div className="row addfile well">
          <h4>Загрузить файлы</h4>
          {message && <p style={{ fontSize: '14px', color: 'green' }}>{message}</p>}
          <form action="/" onSubmit={_handleSubmit} className="form-inline">
            <div className="row">
              <div className=" col-md-10 my-input-group input-group ">
                <input type="text" className="form-control" id="inlineFormInputGroup" value={filename} placeholder="Выберите файл" disabled/>
                <div className="input-group-addon input-file-browse">
                  <div className="btn-file">
                      Обзор <input type="file"  onChange={_handleImageChange}/>
                  </div>
                </div>
              </div>
              <div className="col-md-1 upload-file-div">
                <button type="submit" name="uploadFile" onClick={_handleSubmit} className="btn upload-file-btn glyphicon glyphicon-plus "></button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-4 myLesson well">
        <h4>Описание</h4>
        <h4 className="text-uppercase text-primary">Тема: "{myLesson.title}"</h4>
        <h4><small>{myLesson.description}</small></h4>
        <h4 className="taskList">Задания</h4>
        {myLesson.tasks.map((task, i) =>
          <div key={i}>
            <div className="eachTask">
              <h5>{task}</h5>
              <h5><small>срок до {moment(deadline).format('L')}</small></h5>
            </div>
            <hr/>
          </div>
        )}
      </div>
    </div>
  </div>
);

Lesson.propTypes = {
  _onReady: PropTypes.func.isRequired,
  _handleSubmit: PropTypes.func.isRequired,
  _handleImageChange: PropTypes.func.isRequired,
  filename: PropTypes.string.isRequired
};

export default Lesson;

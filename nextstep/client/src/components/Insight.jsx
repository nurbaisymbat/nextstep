import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import YouTube from 'react-youtube';

const Insight = ({
  _handleSubmit,
  _handleChange,
  message,
  checkDate,
  myInsight,
  messageErr,
  opts,
  videoId,
  _onReady
}) => (
  <div className="container">
  <h3><em>Инсайт</em></h3>
    <div className="row">
      <div className="col-md-7">
        <div className="row material well" >
          <h4>Пример Инсайта</h4>
          <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
        </div>
        <div className="row addfile well" >
          <h4>Инсайт</h4>
          {message && <p style={{ fontSize: '14px', color: 'green' }}>{message}</p>}
          {messageErr && <p style={{ fontSize: '14px', color: 'red' }}>{messageErr}</p>}
          <form action="/" onSubmit={_handleSubmit} >
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     value={myInsight}
                     name="myInsight"
                     onChange={_handleChange}
                     placeholder="Введите ссылку на инсайт"
                     disabled={!checkDate} />
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary" disabled={!checkDate} style={{width: '20%'}}>Отправить</button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-4 description well">
        <h4>Что такое Инсайт?</h4>
        <h4><small>Инсайт - многозначный термин из области зоопсихологии, психологии, психоанализа и психиатрии, описывающий сложное интеллектуальное явление, суть которого состоит в неожиданном, отчасти интуитивном прорыве к пониманию поставленной проблемы и «внезапном» нахождении её решения.</small></h4>
        <h4 className="taskList">Что нужно сделать?</h4>
        <div className="eachTask eachTaskFirst">
          <h5>1. Снять видео с инсайтом</h5>
          <hr/>
          <h5>2. Загрузить видео на YouTube</h5>
          <hr/>
          <h5>3. Указать ссылку на видео в поле для написания инсайта</h5>
          <hr/>
        </div>
      </div>
    </div>
  </div>
);

Insight.propTypes = {
  _handleSubmit: PropTypes.func.isRequired,
  _handleChange: PropTypes.func.isRequired
};

export default Insight;

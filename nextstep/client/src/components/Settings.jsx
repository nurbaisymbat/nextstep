import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Settings = ({
  myPoints,
  _handleChange,
  _handleSubmit,
  message,
  checkChange
}) => (
  <div className="container">
  <h3><em>Настройки</em></h3>
    <div className="row">
      <div className="col-md-5 settings well">
        <h4>Системные параметры</h4>
        {message && <p style={{ fontSize: '14px', color: 'green' }}>{message}</p>}
        <form onSubmit={_handleSubmit}>
          <div className="form-group">
          <p>Начисление за 1 пункт отзыва по видео</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftVideo" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftVideo"></i></span>
              <input type="text" className="form-control" name="video" value ={myPoints.video} disabled/>
              <span className="input-group-addon" id="rightVideo" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightVideo"></i></span>
            </div>
          </div>
          <div className="form-group">
          <p>Начисление за 1 пункт отзыва по книге</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftBook" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftBook"></i></span>
              <input type="text" className="form-control" value ={myPoints.book} disabled/>
              <span className="input-group-addon" id="rightBook" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightBook"></i></span>
            </div>
          </div>
          <div className="form-group">
            <p>Начисление за 1 задание по уроку</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftTask" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftTask"></i></span>
              <input type="text" className="form-control" value ={myPoints.task} disabled/>
              <span className="input-group-addon" id="rightTask" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightTask"></i></span>
            </div>
          </div>
          <div className="form-group">
            <p>Начисление за 1 инсайт</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftInsight" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftInsight"></i></span>
              <input type="text" className="form-control" value ={myPoints.insight} disabled/>
              <span className="input-group-addon" id="rightInsight" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightInsight"></i></span>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-success" style={{width: '30%'}} disabled={!checkChange}>Сохранить</button>
          </div>
        </form>
      </div>
      <div className="col-md-5 minimum-points well">
        <h4>Дисплей минимального количества баллов</h4>
        <table className="table">
    <thead>
      <tr>
        <th>Категории</th>
        <th>Минимум за неделю</th>
        <th>Минимум за программу</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>за фильм</td>
        <td>{myPoints.video*48}</td>
        <td>{myPoints.video*384}</td>
      </tr>
      <tr>
        <td>за книгу</td>
        <td>{myPoints.book*8}</td>
        <td>{myPoints.book*64}</td>
      </tr>
      <tr>
        <td>за задание урока</td>
        <td>{myPoints.task*6}</td>
        <td>{myPoints.task*48}</td>
      </tr>
      <tr>
        <td>за инсайт</td>
        <td>{myPoints.insight}</td>
        <td>{myPoints.insight*8}</td>
      </tr>
      <tr>
        <td>ИТОГО</td>
        <td>{(myPoints.video*48)+(myPoints.book*8)+(myPoints.task*6)+(myPoints.insight)}</td>
        <td>{(myPoints.video*384)+(myPoints.book*64)+(myPoints.task*48)+(myPoints.insight*8)}</td>
      </tr>
    </tbody>
  </table>
      </div>
    </div>
  </div>
);

Settings.propTypes = {
  myPoints: PropTypes.object.isRequired
};

export default Settings;

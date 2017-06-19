import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const SettingsMainAdmin = ({
  myPoints,
  _handleChange,
  _handleSubmit,
  messageProgramming,
  messageDesign,
  checkChangeDesign,
  checkChangeProgramming

}) => (
  <div className="container">
  <h3><em>Настройки</em></h3>
    <div className="row">
      <div className="col-md-5 settings well">
        <h4>Системные параметры <small>(Дизайн)</small></h4>
        {messageDesign && <p style={{ fontSize: '14px', color: 'green' }}>{messageDesign}</p>}
        <form onSubmit={_handleSubmit} name="Дизайн">
          <div className="form-group">
          <p>Начисление за 1 пункт отзыва по видео</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftVideoDesign" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftVideoDesign"></i></span>
              <input type="text" className="form-control" name="video" value ={myPoints[0].video} disabled/>
              <span className="input-group-addon" id="rightVideoDesign" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightVideoDesign"></i></span>
            </div>
          </div>
          <div className="form-group">
          <p>Начисление за 1 пункт отзыва по книге</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftBookDesign" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftBookDesign"></i></span>
              <input type="text" className="form-control" value ={myPoints[0].book} disabled/>
              <span className="input-group-addon" id="rightBookDesign" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightBookDesign"></i></span>
            </div>
          </div>
          <div className="form-group">
            <p>Начисление за 1 задание по уроку</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftTaskDesign" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftTaskDesign"></i></span>
              <input type="text" className="form-control" value ={myPoints[0].task} disabled/>
              <span className="input-group-addon" id="rightTaskDesign" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightTaskDesign"></i></span>
            </div>
          </div>
          <div className="form-group">
            <p>Начисление за 1 инсайт</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftInsightDesign" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftInsightDesign"></i></span>
              <input type="text" className="form-control" value ={myPoints[0].insight} disabled/>
              <span className="input-group-addon" id="rightInsightDesign" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightInsightDesign"></i></span>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-success" style={{width: '30%'}} disabled={!checkChangeDesign}>Сохранить</button>
          </div>
        </form>
      </div>
      <div className="col-md-5 minimum-points well">
        <h4>Дисплей минимального количества баллов <small>(Дизайн)</small></h4>
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
            <td>{myPoints[0].video*48}</td>
            <td>{myPoints[0].video*384}</td>
          </tr>
          <tr>
            <td>за книгу</td>
            <td>{myPoints[0].book*8}</td>
            <td>{myPoints[0].book*64}</td>
          </tr>
          <tr>
            <td>за задание урока</td>
            <td>{myPoints[0].task*6}</td>
            <td>{myPoints[0].task*48}</td>
          </tr>
          <tr>
            <td>за инсайт</td>
            <td>{myPoints[0].insight}</td>
            <td>{myPoints[0].insight*8}</td>
          </tr>
          <tr>
            <td>ИТОГО</td>
            <td>{(myPoints[0].video*48)+(myPoints[0].book*8)+(myPoints[0].task*6)+(myPoints[0].insight)}</td>
            <td>{(myPoints[0].video*384)+(myPoints.book*64)+(myPoints[0].task*48)+(myPoints[0].insight*8)}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <div className="row">
      <div className="col-md-5 settings well">
        <h4>Системные параметры <small>(Программирование)</small></h4>
        {messageProgramming && <p style={{ fontSize: '14px', color: 'green' }}>{messageProgramming}</p>}
        <form onSubmit={_handleSubmit} name="Программирование">
          <div className="form-group">
          <p>Начисление за 1 пункт отзыва по видео</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftVideoProgramming" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftVideoProgramming"></i></span>
              <input type="text" className="form-control" name="video" value ={myPoints[1].video} disabled/>
              <span className="input-group-addon" id="rightVideoProgramming" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightVideoProgramming"></i></span>
            </div>
          </div>
          <div className="form-group">
          <p>Начисление за 1 пункт отзыва по книге</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftBookProgramming" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftBookProgramming"></i></span>
              <input type="text" className="form-control" value ={myPoints[1].book} disabled/>
              <span className="input-group-addon" id="rightBookProgramming" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightBookProgramming"></i></span>
            </div>
          </div>
          <div className="form-group">
            <p>Начисление за 1 задание по уроку</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftTaskProgramming" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftTaskProgramming"></i></span>
              <input type="text" className="form-control" value ={myPoints[1].task} disabled/>
              <span className="input-group-addon" id="rightTaskProgramming" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightTaskProgramming"></i></span>
            </div>
          </div>
          <div className="form-group">
            <p>Начисление за 1 инсайт</p>
            <div className="input-group">
              <span className="input-group-addon" id="leftInsightProgramming" onClick={_handleChange}><i className="glyphicon glyphicon-minus" id="leftInsightProgramming"></i></span>
              <input type="text" className="form-control" value ={myPoints[1].insight} disabled/>
              <span className="input-group-addon" id="rightInsightProgramming" onClick={_handleChange}><i className="glyphicon glyphicon-plus" id="rightInsightProgramming"></i></span>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-success" style={{width: '30%'}} disabled={!checkChangeProgramming}>Сохранить</button>
          </div>
        </form>
      </div>
      <div className="col-md-5 minimum-points well">
        <h4>Дисплей минимального количества баллов <small>(Програм.)</small></h4>
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
        <td>{myPoints[1].video*48}</td>
        <td>{myPoints[1].video*384}</td>
      </tr>
      <tr>
        <td>за книгу</td>
        <td>{myPoints[1].book*8}</td>
        <td>{myPoints[1].book*64}</td>
      </tr>
      <tr>
        <td>за задание урока</td>
        <td>{myPoints[1].task*6}</td>
        <td>{myPoints[1].task*48}</td>
      </tr>
      <tr>
        <td>за инсайт</td>
        <td>{myPoints[1].insight}</td>
        <td>{myPoints[1].insight*8}</td>
      </tr>
      <tr>
        <td>ИТОГО</td>
        <td>{(myPoints[1].video*48)+(myPoints[1].book*8)+(myPoints[1].task*6)+(myPoints[1].insight)}</td>
        <td>{(myPoints[1].video*384)+(myPoints[1].book*64)+(myPoints[1].task*48)+(myPoints[1].insight*8)}</td>
      </tr>
    </tbody>
  </table>
      </div>
    </div>
  </div>
);


export default SettingsMainAdmin;

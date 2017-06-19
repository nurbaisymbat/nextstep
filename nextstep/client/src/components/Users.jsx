import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

moment.locale('ru');

const Users = ({
    users,
    mySize,
    showSize,
    mySlice,
    changeSize,
    tempSlice,
    changeUser,
    findUser
}) => (
<div className="container">
<h3><em>Пользователи</em></h3>
  <div className="row myUsers well">
      <div className="form-group form-inline text-right">
        <span style={{marginRight: '10px'}}>Поиск:</span>
        <input className="form-control" onChange={changeUser} value={findUser} placeholder="Введите запрос"/>
      </div>
      <div className="row" style={{marginTop: '20px'}}>
        <div className="col-md-3"><h5><strong>Пользователь</strong></h5></div>
        <div className="col-md-2"><h5><strong>Возраст</strong></h5></div>
        <div className="col-md-3"><h5><strong>Местоположение</strong></h5></div>
        <div className="col-md-2"><h5><strong>Отдел</strong></h5></div>
        <div className="col-md-2"><h5><strong>Дата регистрации</strong></h5></div>
      </div>
      <hr style={{marginTop: '10px', marginBottom: '0px'}}/>
      {users.slice(tempSlice,mySize).map((user, u) =>
        <div key={u}>
            {user.personal == null ?(
              <Link to={{ pathname: '/userProfile', query: { user: user.user._id } }}>
                <div className="row eachUser">
                  <div className="col-md-3">
                    {user.user.name}
                  </div>
                  <div className="col-md-2">
                     Неизвестно
                  </div>
                  <div className="col-md-3">
                    Неизвестно
                  </div>
                  <div className="col-md-2">
                    {user.user.department}
                  </div>
                  <div className="col-md-2">
                    {moment(user.user.signedDate).format('LL')}
                  </div>
                </div>
              </Link>
            ):(
              <Link to={{ pathname: '/userProfile', query: { user: user.user._id } }}>
              <div className="row eachUser">
                <div className="col-md-3">
                  {user.user.name}
                </div>
                <div className="col-md-2">
                  {user.age}
                </div>
                <div className="col-md-3">
                  {user.personal.city}
                </div>
                <div className="col-md-2">
                  {user.personal.department}
                </div>
                <div className="col-md-2">
                  {moment(user.user.signedDate).format('LL')}
                </div>
              </div>
              </Link>
            )}
            <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
        </div>
      )}
      <div className="row" style={{marginTop: '20px'}}>
      <div className="col-md-4">
        {mySize > users.length ?(
          <h5>Показано с {tempSlice+1} по {users.length} запись из {users.length} записи</h5>
        ):(
          <h5>Показано с {tempSlice+1} по {mySize} запись из {users.length} записи</h5>
        )}
      </div>
      <div className="col-md-8">
      <div className="btn-toolbar pull-right" role="toolbar">
        <div className="btn-group mr-2" role="group">
        <button type="button" className="btn btn-default" onClick={changeSize} name="back">Назад</button>
          {showSize.map((currSize, c) =>
            <div key={c} className="btn-group mr-2" role="group">
              {currSize == mySlice ?(
                <button type="button" className="btn btn-primary" onClick={changeSize} name={currSize}>{currSize}</button>
              ):(
                <button type="button" className="btn btn-default" onClick={changeSize} name={currSize}>{currSize}</button>
              )}

            </div>
          )}
          <button type="button" className="btn btn-default" onClick={changeSize} name="forward">Вперед</button>
        </div>
      </div>
      </div>
      </div>
  </div>
</div>
);

export default Users;

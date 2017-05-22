import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
moment.locale('ru');

const Notes = ({
    notes,
    message,
    mySize,
    showSize,
    mySlice,
    changeSize,
    tempSlice,
    changeUser,
    findUser
}) => (
<div className="container">
<h3><em>Заметки</em></h3>
  <div className="row myUsers well">
  <div className="form-group form-inline text-right">
    <span style={{marginRight: '10px'}}>Поиск:</span>
    <input className="form-control" onChange={changeUser} value={findUser} placeholder="Введите запрос"/>
  </div>
      <div className="row">
        <div className="col-md-3"><h5><strong>Пользователь</strong></h5></div>
        <div className="col-md-3"><h5><strong>Категория</strong></h5></div>
        <div className="col-md-3"><h5><strong>Дата</strong></h5></div>
      </div>
      <hr style={{marginTop: '10px', marginBottom: '0px'}}/>
      {message && <p style={{ fontSize: '14px', color: 'red' }}>{message}</p>}
      {notes.slice(tempSlice,mySize).map((note, n) =>
        <div key={n}>
            {note.type == 'book' ?(
              <Link to={{ pathname: '/bookNote', query: { note: note._id } }}>
                <div className="row eachUser">
                  <div className="col-md-3">
                    {note.username}
                  </div>
                  <div className="col-md-3">
                     Книга
                  </div>
                  <div className="col-md-3">
                    {moment(note.date).format('LLL')}
                  </div>
                </div>
              </Link>
            ):(note.type == 'movie')?(
              <Link to={{ pathname: '/movieNote', query: { note: note._id } }}>
                <div className="row eachUser">
                  <div className="col-md-3">
                    {note.username}
                  </div>
                  <div className="col-md-3">
                     Фильм
                  </div>
                  <div className="col-md-3">
                    {moment(note.date).format('LLL')}
                  </div>
                </div>
              </Link>
            ):(note.type == 'insight')?(
              <Link to={{ pathname: '/insightNote', query: { note: note._id } }}>
                <div className="row eachUser">
                  <div className="col-md-3">
                    {note.username}
                  </div>
                  <div className="col-md-3">
                     Инсайт
                  </div>
                  <div className="col-md-3">
                    {moment(note.date).format('LLL')}
                  </div>
                </div>
              </Link>
            ):(
              <Link to={{ pathname: '/lessonNote', query: { note: note._id } }}>
                <div className="row eachUser">
                  <div className="col-md-3">
                    {note.username}
                  </div>
                  <div className="col-md-3">
                     Урок
                  </div>
                  <div className="col-md-3">
                    {moment(note.date).format('LLL')}
                  </div>
                </div>
              </Link>
            )}
            <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
        </div>
      )}
      <div className="row" style={{marginTop: '20px'}}>
      <div className="col-md-4">
        {mySize > notes.length ?(
          <h5>Показано с {tempSlice+1} по {notes.length} запись из {notes.length} записи</h5>
        ):(
          <h5>Показано с {tempSlice+1} по {mySize} запись из {notes.length} записи</h5>
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

export default Notes;

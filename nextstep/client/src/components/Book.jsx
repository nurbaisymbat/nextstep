import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';
moment.locale('ru');

const Book = ({
  _handleSubmit,
  message,
  myBook,
  checkNote,
  changeCheckNote,
  bookNoteList,
  myBookNote,
  _handleChange,
  getRemainder,
  checkLength,
  messageQ,
  checkShowOthers,
  showOthers,
  hideOthers
}) => (
  <div className="container">
  <h3><em>Книга недели</em></h3>
    <div className="row">
      <div className="col-md-7">
        <div className="row material well">
          <a href={myBook.url} target="_blank" style={{textDecoration: 'none'}}><div className="material-book text-center">
            {myBook.title}
          </div></a>
        </div>
        <div className="row addfile well">
          <div className="row">
            <div className="col-md-9">
              <h4>Введите {getRemainder} заметок</h4>
            </div>
            <div className="col-md-3">
              <p className="changeCheckNote"><span className="glyphicon glyphicon-menu-left " id="left" onClick={changeCheckNote}></span> {checkNote}/{getRemainder} <span className="glyphicon glyphicon-menu-right" id="right" onClick={changeCheckNote}></span></p>
            </div>
          </div>
          {message && <p style={{ fontSize: '14px', color: 'green' }}>{message}</p>}
          {messageQ && <p style={{ fontSize: '14px', color: 'red' }}>{messageQ}</p>}
          <form action="/" onSubmit={_handleSubmit}>
            <div className="form-group">
              <textarea className="form-control" rows="5" placeholder="Текст заметки..." onChange={_handleChange} value={myBookNote} disabled={checkLength}/>
            </div>
            <button type="submit" name="sendNote" className="btn btn-primary send-note-btn" disabled={checkLength}>Отправить</button>
          </form>
        </div>
      </div>
      <div className="col-md-4">
        <div className="description well">
          <h4>Описание</h4>
          <h4 className="text-uppercase text-primary">"{myBook.title}"</h4>
          <h4><small>{myBook.description}</small></h4>
        </div>
        <div className="myNotes well">
          <h4>Мои заметки</h4>
          {bookNoteList.length == 0 ?(
            <div className="eachTask" style={{paddingTop: '10px', paddingBottom: '10px'}}>
              <h5>У вас пока нет заметок</h5>
            </div>
          ): ((bookNoteList.length == 1) && (bookNoteList[0].approved == 1))?(
              <div className={showOthers}>
                <div className="eachTask bg-success" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                  <div>{bookNoteList[0].text}</div>
                  <h5><small>{moment(bookNoteList[0].date).format('llll')}</small></h5>
                </div>
              </div>
          ):((bookNoteList.length == 1) && (bookNoteList[0].approved == 2))?(
            <div className={showOthers}>
              <div className="eachTask bg-danger" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                <div>{bookNoteList[0].text}</div>
                <h5><small>{moment(bookNoteList[0].date).format('llll')}</small></h5>
              </div>
            </div>
          ):((bookNoteList.length == 1) && (bookNoteList[0].approved == 0))?(
            <div className={showOthers}>
              <div className="eachTask" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                <div>{bookNoteList[0].text}</div>
                <h5><small>{moment(bookNoteList[0].date).format('llll')}</small></h5>
              </div>
            </div>
          ):((bookNoteList.length > 1) && (bookNoteList[0].approved == 1))?(
            <div className={showOthers}>
              <div className="eachTask bg-success" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                <div>{bookNoteList[0].text}</div>
                <h5><small>{moment(bookNoteList[0].date).format('llll')}</small></h5>
              </div>
              <div className="btn-show-hide" onClick={checkShowOthers} id="showNotes" style={{marginTop: '10px'}}>
                Показать все
              </div>
            </div>
          ):((bookNoteList.length > 1) && (bookNoteList[0].approved == 2))?(
            <div className={showOthers}>
              <div className="eachTask bg-danger" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                <div>{bookNoteList[0].text}</div>
                <h5><small>{moment(bookNoteList[0].date).format('llll')}</small></h5>
              </div>
              <div className="btn-show-hide" onClick={checkShowOthers} id="showNotes" style={{marginTop: '10px'}}>
                Показать все
              </div>
            </div>
          ):(
              <div className={showOthers}>
                <div className="eachTask" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                  <div>{bookNoteList[0].text}</div>
                  <h5><small>{moment(bookNoteList[0].date).format('llll')}</small></h5>
                </div>
                <div className="btn-show-hide" onClick={checkShowOthers} id="showNotes">
                  Показать все
                </div>
              </div>
          )}
          <div className={hideOthers}>
          {bookNoteList.map((notes, i) =>
            <div key={i}>
              {notes.approved == 1 ?(
                <div className="eachTask bg-success" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                  <div>{notes.text}</div>
                  <h5><small>{moment(notes.date).format('llll')}</small></h5>
                </div>
              ):(notes.approved == 2)?(
                <div className="eachTask bg-danger" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                  <div>{notes.text}</div>
                  <h5><small>{moment(notes.date).format('llll')}</small></h5>
                </div>
              ):(
                <div className="eachTask" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                  <div>{notes.text}</div>
                  <h5><small>{moment(notes.date).format('llll')}</small></h5>
                </div>
              )}
              <hr style={{marginTop: '5px', marginBottom: '5px'}}/>
            </div>
          )}
          <div className="btn-show-hide" onClick={checkShowOthers} id="hideNotes">
            Скрыть все
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Book.propTypes = {
  _handleSubmit: PropTypes.func.isRequired
};

export default Book;

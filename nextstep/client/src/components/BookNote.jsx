import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import YouTube from 'react-youtube';
import moment from 'moment';

const BookNote = ({
  booknote,
  user,
  book,
  onApprove
}) => (
<div className="container">
<h3><em><Link to="/notes" style={{borderBottom: '1px dotted #000', color: '#000'}}>Заметки</Link> / Книга </em></h3>
  <div className="row">
    <div className="col-md-7 material well">
      <h4>Книга: <span className="text-uppercase text-primary">"{book.title}"</span></h4>
      <a href={book.url} target="_blank" style={{textDecoration: 'none'}}><div className="material-book text-center">
        {book.title}
      </div></a>
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
        <div>{booknote.text}</div>
        <h5><small>{moment(booknote.date).format('llll')}</small></h5>
      </div>
      <hr/>
      {(booknote.approved == 0)?(
        <div>
          <button type="button" onClick={onApprove} id="approve" className="btn btn-success btn-block">Утвердить</button>
          <button type="button" onClick={onApprove} id="disapprove" className="btn btn-danger btn-block">Отклонить</button>
        </div>
      ):(booknote.approved == 1)?(
        <h5 className="text-center" style={{color: 'green'}}>Вы утвердили эту заметку!</h5>
      ):(
        <h5 className="text-center" style={{color: 'red'}}>Вы отклонили эту заметку!</h5>
      )}
    </div>
  </div>
</div>
);

export default BookNote;

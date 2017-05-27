import React from 'react';
import Auth from '../modules/Auth';
import Book from '../components/Book.jsx';
import axios from 'axios';

class BookPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      myBook: {
        _id: '',
        title: '',
        description: '',
        url: ''
      },
      message: '',
      checkNote: 1,
      bookNoteList: [],
      myBookNote: '',
      getRemainder: 0,
      checkLength: false,
      messageQ: '',
      showOthers: '',
      hideOthers: 'hidden'
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.changeCheckNote = this.changeCheckNote.bind(this);
    this.checkShowOthers = this.checkShowOthers.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getbook',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            myBook: res.data.book,
            bookNoteList: res.data.bookNoteList,
            getRemainder: (10 - res.data.bookNoteList.length),
            messageQ: res.data.messageQ,
            checkLength: res.data.checkLength
          });
      });
  }

  changeCheckNote(event){
    var getName = event.target.id;
    var note = this.state.checkNote;
    if(getName == "left"){
      if(this.state.getRemainder == 0){
        this.setState({
          checkNote: 0,
          myBookNote: ''
        });
      }
      else {
        if(note == 1){
          this.setState({
            checkNote: this.state.getRemainder,
            myBookNote: '',
            message: ''
          });
        } else {
          this.setState({
            checkNote: this.state.checkNote-1,
            myBookNote: '',
            message: ''
          });
        }
      }
    } else if(getName == "right"){
      if(this.state.getRemainder == 0){
        this.setState({
          checkNote: 0,
          myBookNote: ''
        });
      }
      else {
        if(note == this.state.getRemainder){
          this.setState({
            checkNote: 1,
            myBookNote: '',
            message: ''
          });
        } else {
          this.setState({
            checkNote: this.state.checkNote+1,
            myBookNote: '',
            message: ''
          });
        }
      }
    }
  }
  _handleChange(e){
    this.setState({
      myBookNote: e.target.value,
      message: ''
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const bookNoteText = encodeURIComponent(this.state.myBookNote);
    const bookId = encodeURIComponent(this.state.myBook._id);
    const formData = `bookNoteText=${bookNoteText}&bookId=${bookId}`;
    axios.post('/api/addbooknote', formData, {
      responseType: 'json',
      headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          myBookNote: '',
          message: 'Заметка добавлена'
        });
        this.componentDidMount();
      })
  }
  checkShowOthers(e){

    if(e.target.id=='hideNotes'){
      this.setState({
        showOthers: '',
        hideOthers: 'hidden'
      });
    }else if(e.target.id=='showNotes'){
      this.setState({
        showOthers: 'hidden',
        hideOthers: ''
      });
    }

  }
  render() {
    return (
      <Book
      _handleSubmit={this._handleSubmit}
      message={this.state.message}
      myBook={this.state.myBook}
      changeCheckNote={this.changeCheckNote}
      checkNote={this.state.checkNote}
      bookNoteList={this.state.bookNoteList}
      myBookNote={this.state.myBookNote}
      _handleChange={this._handleChange}
      getRemainder={this.state.getRemainder}
      checkLength={this.state.checkLength}
      messageQ={this.state.messageQ}
      showOthers={this.state.showOthers}
      hideOthers={this.state.hideOthers}
      checkShowOthers={this.checkShowOthers}
      />
    );
  }

}

export default BookPage;

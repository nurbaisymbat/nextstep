import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import BookNote from '../components/BookNote.jsx';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';

class BookNotePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bookNoteId: props.location.query.note,
      booknote: {},
      user: {},
      book: {}
    };
    this.onApprove = this.onApprove.bind(this);
  }
  componentDidMount() {
    axios.get('/profile/getbooknote?bookNoteId='+this.state.bookNoteId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
          this.setState({
            booknote: res.data.booknote,
            user: res.data.user,
            book: res.data.book
          })
      });
  }
  onApprove(event){
    event.preventDefault();
    const incType = encodeURIComponent(event.target.id);
    const userId = encodeURIComponent(this.state.user._id);
    const noteId = encodeURIComponent(this.state.booknote._id);
    const type = encodeURIComponent('book');
    const formData = `noteId=${noteId}&type=${type}&userId=${userId}&incType=${incType}`;
    axios.post('/profile/approvenote', formData,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          booknote: res.data.booknote
        })
      });
  }
  render() {
    return (
      <BookNote
          booknote={this.state.booknote}
          user={this.state.user}
          book={this.state.book}
          onApprove={this.onApprove}
      />
    );
  }

}

export default BookNotePage;

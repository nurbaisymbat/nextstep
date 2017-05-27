import React from 'react';
import Auth from '../modules/Auth';
import LessonNote from '../components/LessonNote.jsx';
import axios from 'axios';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

class LessonNotePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lessonNoteId: props.location.query.note,
      lessonnote: {},
      user: {
        myImg: ''
      },
      lesson: {},
      tasks: [],
      deadline: tomorrow
    };
    this.onApprove = this.onApprove.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  componentDidMount() {
    axios.get('/profile/getlessonnote?lessonNoteId='+this.state.lessonNoteId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            lessonnote: res.data.lessonnote,
            user: res.data.user,
            lesson: res.data.lesson,
            tasks: res.data.lesson.tasks
          })
      });
  }
  onApprove(event){
    event.preventDefault();
    const incType = encodeURIComponent(event.target.id);
    const userId = encodeURIComponent(this.state.user._id);
    const noteId = encodeURIComponent(this.state.lessonnote._id);
    const type = encodeURIComponent('lesson');
    const formData = `noteId=${noteId}&type=${type}&userId=${userId}&incType=${incType}`;
    axios.post('/profile/approvenote', formData,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.componentDidMount()
      });
  }

  downloadFile(event){
    event.preventDefault();
    var filename = this.state.lessonnote.filename
    var request = new XMLHttpRequest();
    request.open("GET", "/auth/downloadFile", true);
    request.responseType = "blob";
    request.onload = function (e) {
        if (this.status === 200) {
            var file = window.URL.createObjectURL(this.response);
            var a = document.createElement("a");
            a.href = file;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.onfocus = function () {
              document.body.removeChild(a)
            }
        };
    };
    request.send();
  }

  render() {
    return (
      <LessonNote
          lessonnote={this.state.lessonnote}
          user={this.state.user}
          lesson={this.state.lesson}
          onApprove={this.onApprove}
          tasks={this.state.tasks}
          deadline={this.state.deadline}
          downloadFile={this.downloadFile}
      />
    );
  }

}

export default LessonNotePage;

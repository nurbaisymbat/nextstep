import React from 'react';
import Auth from '../modules/Auth';
import Notes from '../components/Notes.jsx';
import axios from 'axios';

class NotesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      message: '',
      mySize: 10,
      mySlice: 1,
      showSize: [1],
      tempSlice: 0,
      findUser: ''
    };

    this.changeSize = this.changeSize.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
    axios.get('/profile/getnotes',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        var temp = Math.round(res.data.notes.length / this.state.mySize);
        var tempArr = [];
        for (var i=0; i<temp; i++){
          tempArr.push(i+1);
        };
        if(res.data.notes != null){
          this.setState({
            notes: res.data.notes,
            showSize: tempArr,
            findUser: ''
          });
        } else {
          this.setState({
            message: res.data.message
          });
        }
      });
  }

  changeSize(event){
    event.preventDefault();
    var getName = event.target.name;
    if(getName == 'back'){
      if(this.state.mySize>10){
        this.setState({
          mySlice: this.state.mySlice-1,
          mySize: this.state.mySize-10,
          tempSlice: this.state.tempSlice-10
        });
      }
    } else if(getName == 'forward'){
      if(this.state.mySize <= this.state.notes.length){
        this.setState({
          mySlice: this.state.mySlice+1,
          mySize: this.state.mySize+10,
          tempSlice: this.state.tempSlice+10
        });
      }
    } else {
      this.setState({
        mySlice: getName,
        mySize: getName*10,
        tempSlice: (getName-1)*10
      });
    }
  }

  changeUser(event){
    if(event.target.value.length > 0){
      this.setState({
        findUser: event.target.value,
        notes: this.state.notes.filter(function(note) {
                          return note.username.indexOf(event.target.value) > -1;
                      })
      });
    }
    else {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <Notes
          notes={this.state.notes}
          message={this.state.message}
          mySize={this.state.mySize}
          showSize={this.state.showSize}
          mySlice={this.state.mySlice}
          changeSize={this.changeSize}
          tempSlice={this.state.tempSlice}
          changeUser={this.changeUser}
          findUser={this.state.findUser}
      />
    );
  }

}

export default NotesPage;

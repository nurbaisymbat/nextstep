import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Users from '../components/Users.jsx';
import axios from 'axios';

class UsersPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
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
    axios.get('/profile/getusers',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        var temp = Math.round(res.data.users.length / this.state.mySize);
        var tempArr = [];
        for (var i=0; i<temp; i++){
          tempArr.push(i+1);
        };
        this.setState({
          users: res.data.users,
          showSize: tempArr,
          findUser: ''
        });
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
      if(this.state.mySize <= this.state.users.length){
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
        users: this.state.users.filter(function(user) {
                          return user.user.name.indexOf(event.target.value) > -1;
                      })
      });
    }
    else {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <Users
          users={this.state.users}
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

export default UsersPage;

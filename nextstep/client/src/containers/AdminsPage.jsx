import React from 'react';
import Auth from '../modules/Auth';
import Admins from '../components/Admins.jsx';
import axios from 'axios';

class AdminsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      admins: [],
      mySize: 10,
      mySlice: 1,
      showSize: [1],
      tempSlice: 0,
      findUser: '',
      newadmin: {
        name: '',
        email: '',
        department: ''
      },
      editadmin: {
        _id: '',
        name: '',
        email: '',
        department: ''
      },
      checkAddAdmin: false,
      errors: {},
      message: '',
      admin_id: '',
      messageDelete: '',
      checkEditAdmin: false,
      checkType: false
    };

    this.changeSize = this.changeSize.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changeAdmin = this.changeAdmin.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.getAdminId = this.getAdminId.bind(this);
    this.editAdmin = this.editAdmin.bind(this);
    this.changeEditAdmin = this.changeEditAdmin.bind(this);
    this.changeType = this.changeType.bind(this);
    this.cleanEdit = this.cleanEdit.bind(this);
  }

  componentDidMount() {
    axios.get('/profile/getadmins',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        var temp = Math.round(res.data.admins.length / this.state.mySize);
        var tempArr = [];
        for (var i=0; i<temp; i++){
          tempArr.push(i+1);
        };
        this.setState({
          admins: res.data.admins,
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
      if(this.state.mySize <= this.state.admins.length){
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
        admins: this.state.admins.filter(function(admin) {
                          return admin.name.indexOf(event.target.value) > -1;
                      })
      });
    }
    else {
      this.componentDidMount();
    }
  }
  changeAdmin(event){
    const field = event.target.name;
    const newadmin = this.state.newadmin;
    newadmin[field] = event.target.value;
    if(this.state.newadmin.name.length > 0 && this.state.newadmin.email.length >0 && this.state.newadmin.department.length >0){
      this.setState({
        newadmin,
        checkAddAdmin: true,
        errors: {},
        message: ''
      });
    } else {
      this.setState({
        newadmin,
        checkAddAdmin: false,
        errors: {},
        message: ''
      });
    }
  }
  changeEditAdmin(event){
    const field = event.target.name;
    const editadmin = this.state.editadmin;
    editadmin[field] = event.target.value;
      this.setState({
        editadmin,
        checkEditAdmin: true
      });
  }
  addAdmin(event){
    event.preventDefault();
    const formData = `newadmin=${JSON.stringify(this.state.newadmin)}`;
    axios.post('/profile/addadmin', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          message: res.data.message,
          newadmin: {
            name: '',
            email: '',
            department: ''
          },
          checkAddAdmin: false
        })
          this.componentDidMount();
      })
        .catch(error => {
        if (error.response) {
          const errors = error.response ? error.response : {};
          errors.summary = error.response.data.message;
          this.setState({
            errors
          });
        }
        });
  }
  editAdmin(event){
    event.preventDefault();
    const formData = `editadmin=${JSON.stringify(this.state.editadmin)}`;
    axios.post('/profile/editadmin', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          messageDelete: res.data.messageDelete
        })
          this.cleanEdit();
      })
        .catch(error => {
        if (error.response) {
          const errors = error.response ? error.response : {};
          errors.summary = error.response.data.message;
          this.setState({
            errors
          });
        }
        });
  }
  getAdminId(event){
    this.setState({
      admin_id: event.target.id
    })
  }
  deleteAdmin(event){
    event.preventDefault();
    const admin_id = encodeURIComponent(this.state.admin_id);
    const formData = `admin_id=${admin_id}`;
    axios.post('/profile/deleteadmin', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          messageDelete: res.data.messageDelete
        })
          this.componentDidMount();
      })
        .catch(error => {
          if (error.response) {
            const errors = error.response ? error.response : {};
            errors.summary = error.response.data.message;
            this.setState({
              errors
            });
          }
        });
  }
  changeType(event){
    this.setState({
      checkType: true,
      editadmin: this.state.admins.filter(function(admin) {
                        return admin._id.indexOf(event.target.id) > -1;
                    })[0]
    })
  }
  cleanEdit(){
    this.setState({
      editadmin: {
        _id: '',
        name: '',
        email: '',
        department: ''
      },
      checkType: false,
      checkEditAdmin: false
    })
    this.componentDidMount();
  }
  render() {
    return (
      <Admins
          admins={this.state.admins}
          mySize={this.state.mySize}
          showSize={this.state.showSize}
          mySlice={this.state.mySlice}
          changeSize={this.changeSize}
          tempSlice={this.state.tempSlice}
          changeUser={this.changeUser}
          findUser={this.state.findUser}
          newadmin={this.state.newadmin}
          changeAdmin={this.changeAdmin}
          checkAddAdmin={this.state.checkAddAdmin}
          addAdmin={this.addAdmin}
          errors={this.state.errors}
          message={this.state.message}
          deleteAdmin={this.deleteAdmin}
          getAdminId={this.getAdminId}
          messageDelete={this.state.messageDelete}
          editadmin={this.state.editadmin}
          editAdmin={this.editAdmin}
          changeEditAdmin={this.changeEditAdmin}
          checkEditAdmin={this.state.checkEditAdmin}
          checkType={this.state.checkType}
          changeType={this.changeType}
          cleanEdit={this.cleanEdit}
      />
    );
  }

}

export default AdminsPage;

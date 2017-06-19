import React from 'react';
import Auth from '../modules/Auth';
import DashboardMainAdmin from '../components/DashboardMainAdmin.jsx';
import axios from 'axios';

const today = new Date();

class DashboardMainAdminPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      maxPointsDesign: 0,
      maxPointsProgramming: 0,
      progressDesign: [],
      usersDesign: [],
      usersProgramming: [],
      progressProgramming: []
    };
  }

  componentDidMount() {
    axios.get('/api/dashboard',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            usersDesign: res.data.usersDesign,
            usersProgramming: res.data.usersProgramming,
            maxPointsDesign: res.data.maxPointsDesign,
            maxPointsProgramming: res.data.maxPointsProgramming,
            progressDesign: res.data.progressDesign,
            progressProgramming: res.data.progressProgramming
          });
      });
  }

  render() {
    return (
        <DashboardMainAdmin
              usersDesign={this.state.usersDesign}
              usersProgramming={this.state.usersProgramming}
              maxPointsDesign={this.state.maxPointsDesign}
              maxPointsProgramming={this.state.maxPointsProgramming}
              progressDesign={this.state.progressDesign}
              progressProgramming={this.state.progressProgramming}
              />);
  }

}

export default DashboardMainAdminPage;

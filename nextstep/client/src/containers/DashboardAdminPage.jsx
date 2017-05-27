import React from 'react';
import Auth from '../modules/Auth';
import DashboardAdmin from '../components/DashboardAdmin.jsx';
import axios from 'axios';

const today = new Date();

class DashboardAdminPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      maxPoints: 0,
      users: [],
      progress: []
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
            users: res.data.users,
            maxPoints: res.data.maxPoints,
            progress: res.data.progress
          });
      });
  }

  render() {
    return (
        <DashboardAdmin
              users={this.state.users}
              maxPoints={this.state.maxPoints}
              progress={this.state.progress}
              />);
  }

}

export default DashboardAdminPage;

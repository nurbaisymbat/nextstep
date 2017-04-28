import React, {PropTypes} from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import axios from 'axios';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      username: '',
      useremail: ''


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
          userId: res.data.userId,
          username: res.data.username,
          useremail: res.data.useremail
        });
      });
  }

  render() {
    return (
        <Dashboard
              userId={this.state.userId}
              username={this.state.username}
              useremail={this.state.useremail}
              />);
  }

}


export default DashboardPage;

import React, {PropTypes} from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import axios from 'axios';

const today = new Date();

class DashboardPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {},
      remainedDays: 0,
      remainedDaysPercent: '',
      maxPoints: 0,
      maxPointsPercent: '',
      users: []
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
          var userDate = new Date(res.data.user.signedDate);
          var millisecondsPerDay = 24 * 60 * 60 * 1000;
          var findDifference = (56-Math.round((today-userDate) / millisecondsPerDay));
          var remainedPercent = Math.round((findDifference*100)/56);
          if(remainedPercent>50){
            this.setState({
              user: res.data.user,
              remainedDays: findDifference,
              remainedDaysPercent: 'progress-circle over50 p'+remainedPercent,
              maxPoints: res.data.maxPoints,
              maxPointsPercent: res.data.maxPointsPercent,
              users: res.data.users
            });
          }else{
            this.setState({
              user: res.data.user,
              remainedDays: findDifference,
              remainedDaysPercent: 'progress-circle p'+remainedPercent,
              maxPoints: res.data.maxPoints,
              maxPointsPercent: res.data.maxPointsPercent,
              users: res.data.users
            });
          }
      });
  }

  render() {
    return (
        <Dashboard
              user={this.state.user}
              remainedDays={this.state.remainedDays}
              remainedDaysPercent={this.state.remainedDaysPercent}
              maxPoints={this.state.maxPoints}
              maxPointsPercent={this.state.maxPointsPercent}
              users={this.state.users}
              />);
  }

}

DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
};
export default DashboardPage;

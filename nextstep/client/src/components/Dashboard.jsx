import React, { PropTypes } from 'react';

const Dashboard = ({
  userId,
  username,
  useremail

  }) => (
  <div className="row">
    <div className="col-md-9 dashboard">
      <div className="container ">
        <h2>Welcome {username}!!</h2>
      </div>
    </div>
  </div>
);

Dashboard.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  useremail: PropTypes.string.isRequired
};

export default Dashboard;

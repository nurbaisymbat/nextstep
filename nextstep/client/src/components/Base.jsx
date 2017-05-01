import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
const src = require('./img.jpg');

const Base = ({ children }) => (
  <div className="row">
<<<<<<< Updated upstream
    <nav className="navbar menuMain col-md-2">
=======
    <nav className="navbar menuMain col-md-2 well">

      <div className="nav-logo">
        <p className="nav-text">NextStep</p>
      </div>

      <div className="thumbnail nav-foto text-center">
        <img src={src} className="img-circle" />

      </div>
        <p className="userName">
        userName
        <br/>
        <span className="glyphicon glyphicon-cog navglyphicon"></span>
        <span className="glyphicon glyphicon-off navglyphicon"></span>
        </p>
>>>>>>> Stashed changes
      <div className="navbar-header">
        <ul className="nav nav-stacked">
          <li className="eachLink"><IndexLink to="/">Home</IndexLink></li>
            {Auth.isUserAuthenticated() ?(
<<<<<<< Updated upstream
            <ul className="nav navbar-nav">
                <li className="eachLink"><Link to="/profile">Профиль</Link></li>
                <li className="eachLink"><Link to="/lesson">Урок</Link></li>
=======
            <ul className="nav nav-stacked">
                <li className="eachLink"><Link to="/profile">Profile</Link></li>
>>>>>>> Stashed changes
                <li className="eachLink"><Link to="/logout">Log out</Link></li>
            </ul>
            ) : (
            <ul className="nav nav-stacked">
                <li className="eachLink"><Link to="/login" >Log in</Link></li>
                </ul>
              )}
        </ul>
      </div>
    </nav>
    <div className="col-md-10">
      {children}
    </div>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;

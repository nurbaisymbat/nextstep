import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


const Base = ({ children }) => (
  <div>
    <nav className="navbar menuMain">
      <div className="navbar-header">
        <ul className="nav navbar-nav">
          <li className="eachLink"><IndexLink to="/">Home</IndexLink></li>
            {Auth.isUserAuthenticated() ?(
            <ul className="nav navbar-nav">
                <li className="eachLink"><Link to="/profile">Profile</Link></li>
                <li className="eachLink"><Link to="/logout">Log out</Link></li>
            </ul>
            ) : (
            <ul className="nav navbar-nav">
                <li className="eachLink"><Link to="/login" >Log in</Link></li>
                </ul>
              )}
        </ul>
      </div>
    </nav>
      {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;

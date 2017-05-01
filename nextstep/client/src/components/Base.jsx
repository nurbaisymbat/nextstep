import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


const Base = ({ children }) => (
  <div className="row">
    <nav className="navbar menuMain col-md-2">
      <div className="navbar-header">
        <ul className="nav navbar-nav">
          <li className="eachLink"><IndexLink to="/">Home</IndexLink></li>
            {Auth.isUserAuthenticated() ?(
            <ul className="nav navbar-nav">
                <li className="eachLink"><Link to="/profile">Профиль</Link></li>
                <li className="eachLink"><Link to="/lesson">Урок</Link></li>
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
    <div className="col-md-10">
      {children}
    </div>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;

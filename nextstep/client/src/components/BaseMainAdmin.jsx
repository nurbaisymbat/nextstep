import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

const BaseMainAdmin = ({ children }) => (
  <div className="row">
      {Auth.isUserAuthenticated() ?(
        <div className="col-md-2 well-white">
        <div className="nav-logo" style={{marginBottom: '30%', marginLeft: '-9%'}}>
          <h2 className="logo"><span className="next">Next</span><span className="step">Step</span></h2>
        </div>
        <nav className="navbar">
          <div className="navbar-header">
            <ul className="nav nav-stacked">
                <li className="eachLink"><IndexLink to="/"><span className="glyphicon glyphicon-home" style={{marginRight: '10px'}}></span>Главная</IndexLink></li>
                <li className="eachLink"><Link to="/program"><span className="glyphicon glyphicon-calendar" style={{marginRight: '10px'}}></span>Программа</Link></li>
                <li className="eachLink"><Link to="/users"><span className="glyphicon glyphicon-user" style={{marginRight: '10px'}}></span>Пользователи</Link></li>
                <li className="eachLink"><Link to="/notes"><span className="glyphicon glyphicon-bookmark" style={{marginRight: '10px'}}></span>Заметки</Link></li>
                <li className="eachLink"><Link to="/settings"><span className="glyphicon glyphicon-cog" style={{marginRight: '10px'}}></span>Настройки</Link></li>
                <li className="eachLink"><Link to="/admins"><span className="glyphicon glyphicon-text-background" style={{marginRight: '10px'}}></span>Администрация</Link></li>
                <li className="eachLink"><Link to="/mainadmin"><span className="glyphicon glyphicon-asterisk" style={{marginRight: '10px'}}></span>Мои данные</Link></li>
                <li className="eachLink"><Link to="/logout"><span className="glyphicon glyphicon-log-out" style={{marginRight: '10px'}}></span>Выйти</Link></li>
            </ul>
          </div>
        </nav>
        </div>
        ) : (
          <div></div>
        )}
        <div className="col-md-10 col-md-offset-2">
          {children}
        </div>

  </div>
);

BaseMainAdmin.propTypes = {
  children: PropTypes.object.isRequired
};

export default BaseMainAdmin;

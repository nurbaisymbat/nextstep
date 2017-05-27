import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import axios from 'axios';

class Base extends React.Component {
  render() {
    return (
      <div>
        {Auth.isUserAuthenticated() ?(
          <div className="row">
          <div className="col-md-2 well-white">
          <div className="nav-logo" style={{marginBottom: '30%', marginLeft: '-9%'}}>
            <h2 className="logo"><span className="next">Next</span><span className="step">Step</span></h2>
          </div>
          <div className="thumbnail text-center" style={{marginBottom: '30%',marginLeft: '-15%'}}>
            <Link to="/profile_page"><img src={require('../../../public/img/no-user-image.jpg')} className="img-circle" style={{width: '50%'}}/></Link>
            <h4 className="text-center"><Link to="/profile_page"><span className="glyphicon glyphicon-cog navglyphicon"></span></Link>
            <Link to="/logout"><span className="glyphicon glyphicon-off navglyphicon"></span></Link></h4>
          </div>
          <nav className="navbar">
            <div className="navbar-header">
              <ul className="nav nav-stacked">
                  <li className="eachLink"><IndexLink to="/"><span className="glyphicon glyphicon-home" style={{marginRight: '10px'}}></span>Главная</IndexLink></li>
                  <li className="eachLink"><Link to="/lesson"><span className="glyphicon glyphicon-calendar" style={{marginRight: '10px'}}></span>Урок</Link></li>
                  <li className="eachLink"><Link to="/movie"><span className="glyphicon glyphicon-film" style={{marginRight: '10px'}}></span>Фильм</Link></li>
                  <li className="eachLink"><Link to="/book"><span className="glyphicon glyphicon-book" style={{marginRight: '10px'}}></span>Книга</Link></li>
                  <li className="eachLink"><Link to="/insight"><span className="glyphicon glyphicon-facetime-video" style={{marginRight: '10px'}}></span>Инсайт</Link></li>
              </ul>
            </div>
          </nav>
          </div>
          <div className="col-md-10 baseChilds">
            {this.props.children}
          </div>
          </div>
          ) : (
            <div>
              {this.props.children}
            </div>
          )}

    </div>);
  }
}

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;

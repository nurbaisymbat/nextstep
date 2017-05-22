import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Routes } from 'react-router';
import routes from './routes.js';

ReactDom.render((
    //  var token = Auth.getToken.split(' ')[1];
      //var decoded = jwtDecode(token);
    <Router history={browserHistory} routes={routes} />

    ), document.getElementById('react-app'));

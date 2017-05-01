import Base from './components/Base.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import ForgotPage from './containers/ForgotPage.jsx';
import ChangePwdPage from './containers/ChangePwdPage.jsx';
import ProfilePage from './containers/ProfilePage.jsx';
import LessonPage from './containers/LessonPage.jsx';
import Auth from './modules/Auth';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()){
          callback(null, DashboardPage);
        } else {
          callback(null, SignUpPage);
        }
      }
    },

    {
      path: '/login',
      getComponent: (location, callback) => {
          if (Auth.isUserAuthenticated()){
            callback(null, DashboardPage);
          } else {
            callback(null, LoginPage);
          }
       }
    },
    {
      path: '/forgot',
      getComponent: (location, callback) => {
          if (Auth.isUserAuthenticated()){
            callback(null, DashboardPage);
          } else {
            callback(null, ForgotPage);
          }
       }
    },
    {
      path: '/change',
      getComponent: (location, callback) => {
          if (Auth.isUserAuthenticated()){
            callback(null, DashboardPage);
          } else {
            callback(null, ChangePwdPage);
          }
       }
    },
    {
      path: '/profile',
      getComponent: (location, callback) => {
          if (Auth.isUserAuthenticated()){
            callback(null, ProfilePage);
          } else {
            callback(null, SignUpPage);
          }
       }
    },
    {
      path: '/lesson',
      getComponent: (location, callback) => {
          if (Auth.isUserAuthenticated()){
            callback(null, LessonPage);
          } else {
            callback(null, SignUpPage);
          }
       }
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/');
      }
    }
  ]
};

export default routes;

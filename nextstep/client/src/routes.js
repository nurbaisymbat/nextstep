import Base from './components/Base.jsx';
import BaseA from './components/BaseA.jsx';
import BaseMainAdmin from './components/BaseMainAdmin.jsx';
import MainAdmin from './components/MainAdmin.jsx';
import ChangePasswordAdmin from './components/ChangePasswordAdmin.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import DashboardAdminPage from './containers/DashboardAdminPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import ForgotPage from './containers/ForgotPage.jsx';
import ChangePwdPage from './containers/ChangePwdPage.jsx';
import ProfilePage from './containers/ProfilePage.jsx';
import LessonPage from './containers/LessonPage.jsx';
import MoviePage from './containers/MoviePage.jsx';
import BookPage from './containers/BookPage.jsx';
import ProgramPage from './containers/ProgramPage.jsx';
import InsightPage from './containers/InsightPage.jsx';
import SettingsPage from './containers/SettingsPage.jsx';
import UsersPage from './containers/UsersPage.jsx';
import UserProfilePage from './containers/UserProfilePage.jsx';
import NotesPage from './containers/NotesPage.jsx';
import MovieNotePage from './containers/MovieNotePage.jsx';
import BookNotePage from './containers/BookNotePage.jsx';
import LessonNotePage from './containers/LessonNotePage.jsx';
import InsightNotePage from './containers/InsightNotePage.jsx';
import DashboardMainAdminPage from './containers/DashboardMainAdminPage.jsx';
import SettingsMainAdminPage from './containers/SettingsMainAdminPage.jsx';
import AdminsPage from './containers/AdminsPage.jsx';
import Auth from './modules/Auth';
const jwt = require('jsonwebtoken');
const config = require('../../config');

const routes = {
  // base component (wrapper for the whole application).
  getComponent: (location, callback) => {
    if (Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) { console.log(err) }
        else {
          var userStatus = decoded.userstatus;
          if(userStatus == 1){
            if(decoded.department == "all"){
              callback(null, BaseMainAdmin);
            }
            else {
              callback(null, BaseA);
            }
          }
          else {
            callback(null, Base);
          }
        }
      })
    } else {
      callback(null, Base);
    }
  },
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()){
          var token = Auth.getToken();
          jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) { console.log(err) }
            else {
              var userStatus = decoded.userstatus;
              if(userStatus == 1){
                if(decoded.department == 'all'){
                  callback(null, DashboardMainAdminPage);
                } else {
                  callback(null, DashboardAdminPage);
                }
              }
              else {
                callback(null, DashboardPage);
              }
            }
          })
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
      path: '/profile_page',
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
      path: '/movie',
      getComponent: (location, callback) => {
          if (Auth.isUserAuthenticated()){
            callback(null, MoviePage);
          } else {
            callback(null, SignUpPage);
          }
       }
    },
    {
      path: '/book',
      getComponent: (location, callback) => {
          if (Auth.isUserAuthenticated()){
            callback(null, BookPage);
          } else {
            callback(null, SignUpPage);
          }
       }
    },
    {
      path: '/insight',
      getComponent: (location, callback) => {
          if (Auth.isUserAuthenticated()){
            callback(null, InsightPage);
          } else {
            callback(null, SignUpPage);
          }
       }
    },
    {
      path: '/program',
      component: ProgramPage
    },
    {
      path: '/settings',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()){
          var token = Auth.getToken();
          jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) { console.log(err) }
            else {
              if(decoded.department == 'all'){
                callback(null, SettingsMainAdminPage);
              } else {
                callback(null, SettingsPage);
              }
            }
          })
        } else {
          callback(null, SignUpPage);
        }
      }
    },
    {
      path: '/users',
      component: UsersPage
    },
    {
      path: '/userProfile',
      component: UserProfilePage
    },
    {
      path: '/notes',
      component: NotesPage
    },
    {
      path: '/movieNote',
      component: MovieNotePage
    },
    {
      path: '/bookNote',
      component: BookNotePage
    },
    {
      path: '/lessonNote',
      component: LessonNotePage
    },
    {
      path: '/insightNote',
      component: InsightNotePage
    },
    {
      path: '/admins',
      component: AdminsPage
    },
    {
      path: '/mainadmin',
      component: MainAdmin
    },
    {
      path: '/newpassword',
      component: ChangePasswordAdmin
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

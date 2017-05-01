import React, { PropTypes } from 'react';
import TestComponent from './Countdown.js';
const src = require('./img.jpg');


const Dashboard = ({
  userId,
  username,
  useremail

  }) => (
    <div className="row">

          <h3 className = "Glavnaya">Главная</h3>

          

      <div className="col-md-6 dashboard">

            <div className="Total well">
              <p>Общий балл</p>
              <div className="totalBalls"> 
                <p className="countBalls">300</p><br/> 
                <p className="ballText">баллов на сегодня</p>
              </div>
              <div className="progress">
                  <div className="progress-bar progress-bar-success" role="progressbar" style={{width: "100px"}} >
                  </div>
              </div>
            </div>

            <div className="Top well">
              <p>Топ</p>
              <ol>

                  <li >
                    <div className="row topText">
                      <div className="thumbnailGroup nav-foto text-center col-md-3">
                        <img src={src} className="img-circle circleGroup" />
                      </div>
                      <div className="totalBallsGroup col-md-9"> 
                        <p className="countBallsGroup">90</p><br/> 
                        <p className="ballTextGroup">баллов</p>
                      </div>
                    </div>  
                      <div className="progress progressGroup">
                        <div className="progress-bar progress-bar-success" role="progressbar" style={{width: "90px"}} ></div>
                      </div>
                  </li>

                <li>
                  <div className="row topText">
                      <div className="thumbnailGroup nav-foto text-center col-md-3">
                        <img src={src} className="img-circle circleGroup" />
                      </div>
                      <div className="totalBallsGroup col-md-9"> 
                        <p className="countBallsGroup">50</p><br/> 
                        <p className="ballTextGroup">баллов</p>
                      </div>
                    </div>  
                      <div className="progress progressGroup">
                        <div className="progress-bar progress-bar-info" role="progressbar" style={{width: "50px"}} ></div>
                      </div>
                </li> 

                <li>
                  <div className="row topText">
                      <div className="thumbnailGroup nav-foto text-center col-md-3">
                        <img src={src} className="img-circle circleGroup" />
                      </div>
                      <div className="totalBallsGroup col-md-9"> 
                        <p className="countBallsGroup">30</p><br/> 
                        <p className="ballTextGroup">баллов</p>
                      </div>
                    </div>  
                      <div className="progress progressGroup">
                        <div className="progress-bar progress-bar-warning" role="progressbar" style={{width: "30px"}} ></div>
                      </div>
                </li> 

                <li>
                  <div className="row topText">
                      <div className="thumbnailGroup nav-foto text-center col-md-3">
                        <img src={src} className="img-circle circleGroup" />
                      </div>
                      <div className="totalBallsGroup col-md-9"> 
                        <p className="countBallsGroup">10</p><br/> 
                        <p className="ballTextGroup">баллов</p>
                      </div>
                    </div>  
                      <div className="progress progressGroup">
                        <div className="progress-bar progress-bar-danger" role="progressbar" style={{width: "10px"}} ></div>
                  </div>
                </li> 

              </ol>  
            </div>

      </div>

      <div className="col-md-6 dashboard">

            <div className="Days well">
              Дни
              
              <TestComponent secondsRemaining='10' />
            </div>

            <div className="CurentIssue well">
              Текущая задача
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

import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
 

var daysInterval = 60000;

var TestComponent = React.createClass({

  getInitialState: function() {
    return {
      secondsRemaining: 0
    };
  },
  tick: function() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  },
  componentDidMount: function() {
    this.setState({ secondsRemaining: this.props.secondsRemaining });
    this.interval = setInterval(this.tick, daysInterval);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
    	<div>
    		<div className="col-sm-4" >
    			<div className="c100 p100 center">
                  <span>{this.state.secondsRemaining}</span>
                  <div className="slice">
                      <div className="bar"></div>
                      <div className="fill"></div>
                  </div>
                </div>
		    <div className="totalBalls">
			      <p className="countBalls">{this.state.secondsRemaining}</p><br/>
			      <p className="ballText">Осталось дней</p>
		    </div>
		</div>
    );
  }
});

export default TestComponent;
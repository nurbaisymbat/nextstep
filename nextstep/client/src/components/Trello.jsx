import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import moment from 'moment';
moment.locale('ru');

class Trello extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      myTrello: {},
      checkloading: false
    };
  }
  componentDidMount(){
    axios.get('/profile/gettrello',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            myTrello: res.data.myTrello,
            checkloading: true
          });
      });
  }
  render() {
    return (<div>
            <div className="row" style={{paddingRight: '15px'}}>
              <div className="col-md-9"><h4>Текущая задача</h4></div>
              <div className="col-md-3 text-right" style={{marginTop: '10px'}}><span className="label label-success">В процессе</span></div>
            </div>
            {this.state.checkloading ?(
              <div>
                <h4 className="text-uppercase text-success" style={{marginTop: '40px'}}>{this.state.myTrello.cardname}</h4>
                <div className="text-muted" style={{marginTop: '40px'}}>
                  {this.state.myTrello.carddesc}
                </div>
                <div className="row" style={{marginTop: '40px'}}>
                  <div className="col-md-9">
                    <h5>Дата начала</h5>
                    <h5 className="text-muted">{moment(this.state.myTrello.cardsince).format('L')}</h5>
                  </div>
                  <div className="col-md-3">
                    <h5>Дата сдачи</h5>
                    <h5 className="text-muted">{moment(this.state.myTrello.carddue).format('L')}</h5>
                  </div>
                </div>
              </div>
            ):(
              <div className="text-center">
                <h4 className="text-uppercase text-info" style={{marginTop: '40px'}}>Подождите</h4>
                <img src={require('../../../public/img/trello.gif')} style={{width: '20%', marginTop: '20px'}}/>
              </div>
            )}

          </div>);
  }
}

export default Trello;

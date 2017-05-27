import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';
import axios from 'axios';
import moment from 'moment';
moment.locale('ru');

const today = new Date();

class Trello extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      myTrello: [],
      checkloading: false
    };
  }
  componentDidMount(){
    axios.get('/api/gettrello',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            myTrello: res.data.myTrello,
            checkloading: !this.state.checkloading
          });
      });
  }
  render() {
    return (<div>
              <div className="row" style={{paddingRight: '15px'}}>
                <div className="col-md-9"><h4>Текущая задача</h4></div>
                <div className="col-md-3 text-right" style={{marginTop: '10px'}}><span className="label label-success">В процессе</span></div>
              </div>
            {(!this.state.checkloading) ?(
                <div className="text-center">
                  <h4 className="text-uppercase text-info" style={{marginTop: '40px'}}>Подождите</h4>
                  <img src={require('../../../public/img/trello.gif')} style={{width: '20%', marginTop: '20px'}}/>
                </div>
            ):(
                <div></div>
            )}
            {this.state.myTrello.map((trello, t) =>
                <div key={t}>
                  <h4 className="text-uppercase text-success" style={{marginTop: '40px'}}>{trello.name}</h4>
                  <div className="text-muted" style={{marginTop: '20px'}}>
                    {trello.desc}
                  </div>
                  <div className="row" style={{marginTop: '20px'}}>
                    <div className="col-md-9">
                      <h5>Дата начала</h5>
                      <h5 className="text-muted">{moment(trello.dateLastActivity).format('L')}</h5>
                    </div>
                    <div className="col-md-3">
                      <h5>Дата сдачи</h5>
                      {(new Date(trello.due).getDate() == today.getDate()) && (new Date(trello.due).getMonth() == today.getMonth()) ?(
                        <h5 className="text-warning">{moment(trello.due).format('L')}</h5>
                      ):((new Date(trello.due).getDate() > today.getDate()) && (new Date(trello.due).getMonth() >= today.getMonth())) || (new Date(trello.due).getDate() <= today.getDate()) && (new Date(trello.due).getMonth() > today.getMonth()) ?(
                        <h5 className="text-danger">{moment(trello.due).format('L')}</h5>
                      ):(
                        <h5 className="text-muted">{moment(trello.due).format('L')}</h5>
                      )}

                    </div>
                  </div>
                  <hr/>
                </div>
            )}
          </div>);
  }
}

export default Trello;

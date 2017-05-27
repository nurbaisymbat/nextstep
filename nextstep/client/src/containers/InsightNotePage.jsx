import React from 'react';
import Auth from '../modules/Auth';
import InsightNote from '../components/InsightNote.jsx';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';

const opts = {
      height: '390',
      width: '640',
      autoplay: 0
    };

class InsightNotePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      insightNoteId: props.location.query.note,
      user: {},
      insight: {},
      videoId: ''
    };
    this._onReady = this._onReady.bind(this);
    this.onApprove = this.onApprove.bind(this);
  }
  _onReady(event) {
    event.target.pauseVideo();
  }
  componentDidMount() {
    axios.get('/profile/getinsightnote?insightNoteId='+this.state.insightNoteId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
          this.setState({
            user: res.data.user,
            insight: res.data.insight,
            videoId: getYouTubeID(res.data.insight.url)
          })
      });
  }
  onApprove(event){
    event.preventDefault();
    const incType = encodeURIComponent(event.target.id);
    const userId = encodeURIComponent(this.state.user._id);
    const noteId = encodeURIComponent(this.state.insight._id);
    const type = encodeURIComponent('insight');
    const formData = `noteId=${noteId}&type=${type}&userId=${userId}&incType=${incType}`;
    axios.post('/profile/approvenote', formData,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          insight: res.data.insight
        })
      });
  }
  render() {
    return (
      <InsightNote
          user={this.state.user}
          insight={this.state.insight}
          videoId={this.state.videoId}
          opts={this.state.opts}
          _onReady={this._onReady}
          onApprove={this.onApprove}
      />
    );
  }

}

export default InsightNotePage;

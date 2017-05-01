import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import YouTube from 'react-youtube';

const Lesson = ({
  _onReady,
  opts,
  _handleSubmit,
  _handleImageChange
}) => (
  <div className="container">
    <div className="row">
      <div className="col-md-7">
        <div className="row material well">
          <YouTube videoId="JPT3bFIwJYA" opts={opts} onReady={_onReady} />
        </div>
        <div className="row addfile well">
          <h4>Загрузить файлы</h4>
          <form action="/" onSubmit={_handleSubmit} className="form-horizontal">
            <input type="file" className="file" onChange={_handleImageChange}/>
            <button type="submit" name="uploadFile" onClick={_handleSubmit}>Загрузить</button>
          </form>
        </div>
      </div>
      <div className="col-md-4 description well">
      </div>
    </div>
  </div>
);

Lesson.propTypes = {
  _onReady: PropTypes.func.isRequired,
  _handleSubmit: PropTypes.func.isRequired,
  _handleImageChange: PropTypes.func.isRequired
};

export default Lesson;

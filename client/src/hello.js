/* global BACKEND */

import React from 'react';
import request from 'superagent';

let Hello = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      bio: '',
      country: ''
    };
  },

  componentDidMount: function() {
    request
      .get(BACKEND)
      .end((err, res) => {
        var athlete = res.body;

        this.setState({
          username: `${athlete.firstName} ${athlete.lastName}`,
          bio: athlete.bio,
          country: athlete.country
        });
      });
  },

  render() {
    return (
      <div>
        <h1>{this.state.username}</h1>
        <p>{this.state.bio}</p>

        <div className="well well-lg center-block" style={{ width:'250px', opacity:0.8 }}>
          <div className="row lead">
            <div className="col-xs-6 text-right">Cегодня</div>
            <div className="col-xs-6 text-left"><samp>20 км</samp></div>
          </div>
          <div className="row">
            <div className="col-xs-6 text-right">За неделю</div>
            <div className="col-xs-6 text-left"><samp>20 км</samp></div>
          </div>
          <div className="row">
            <div className="col-xs-6 text-right">За месяц</div>
            <div className="col-xs-6 text-left"><samp>20 км</samp></div>
          </div>
          <div className="row">
            <div className="col-xs-6 text-right">За год</div>
            <div className="col-xs-6 text-left"><samp>20 км</samp></div>
          </div>
          <div className="row">
            <div className="col-xs-6 text-right">Всего</div>
            <div className="col-xs-6 text-left"><samp>20 км</samp></div>
          </div>
          <a className="btn btn-link">Подробно >></a>
        </div>

        <a className="btn btn-default page-scroll" href="#journal">Журнал тренировок</a>
      </div>
    );
  }
});

export default Hello;

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
        <a className="btn btn-default page-scroll" href="#statistic">Статистика тренировок</a>
      </div>
    );
  }
});

export default Hello;

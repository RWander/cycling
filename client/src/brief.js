/* global BACKEND */

import React from 'react';
import request from 'superagent';

var BriefStore = {
  username: '',
  bio: '',
  country: '',
  statistic: []
};

let StatisticItem = React.createClass({
  propTypes: {
    period : React.PropTypes.string,
    value: React.PropTypes.string,
    classes: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      classes: 'row'
    };
  },

  render: function() {
    return (
      <div className={this.props.classes}>
        <div className="col-xs-6 text-right">{this.props.period}</div>
        <div className="col-xs-6 text-left"><samp>{this.props.value}</samp></div>
      </div>
    );
  }
});

let Brief = React.createClass({
  getInitialState: () => BriefStore,

  componentDidMount: function() {
    request
      .get(`${BACKEND}/full`)
      .end((err, res) => {
        let athlete = res.body.athlete;

        this.setState({
          username: `${athlete.firstName} ${athlete.lastName}`,
          bio: athlete.bio,
          country: athlete.country,
          statistic: [{
            period: 'Cегодня',
            value: '20 км'
          }, {
            period: 'За неделю',
            value: '200 км'
          }, {
            period: 'За месяц',
            value: '2000 км'
          }, {
            period: 'За год',
            value: '20000 км'
          }, {
            period: 'Всего',
            value: '200000 км'
          }]
        });
      });
  },

  render() {
    return (
      <div>
        <h1>{this.state.username}</h1>
        <p>{this.state.bio}</p>

        <div className="well well-lg center-block" style={{ width:'250px', opacity:0.8 }}>
          { /* Статистика за сегодня */ }
          { this.state.statistic.slice(0, 1).map(function(stat) {
            return (
              <StatisticItem
                classes="row lead"
                period={stat.period}
                value={stat.value} />
            );
          })}
          { /* Статистика за остальное время */ }
          { this.state.statistic.slice(1, this.state.statistic.length).map(function(stat) {
            return (
              <StatisticItem
                period={stat.period}
                value={stat.value} />
            );
          })}
          <a className="btn btn-link">Подробно >></a>
        </div>

        <a className="btn btn-default page-scroll" href="#journal">Журнал тренировок</a>
      </div>
    );
  }
});

export default Brief;

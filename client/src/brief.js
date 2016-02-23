/* global BACKEND */

import React from 'react';
import request from 'superagent';

var BriefStore = {
  username: '',
  bio: '',
  country: '',
  statisticToday: {},
  statisticWeek: {},
  statisticMonth: {},
  statisticYear: {},
  statisticTotal: {}
};

let StatisticItem = React.createClass({
  propTypes: {
    period : React.PropTypes.string,
    ski: React.PropTypes.string,
    run: React.PropTypes.string,
    cycling: React.PropTypes.string,
    swim: React.PropTypes.string,
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
        <div className="col-xs-3 text-right text-nowrap">{this.props.period}</div>
        <div className="col-xs-9">
          <div className="row">
            <div className="col-xs-3 text-nowrap"><samp>{this.props.cycling}<small>км</small></samp></div>
            <div className="col-xs-3 text-nowrap"><samp>{this.props.run}<small>км</small></samp></div>
            <div className="col-xs-3 text-nowrap"><samp>{this.props.ski}<small>км</small></samp></div>
            <div className="col-xs-3 text-nowrap"><samp>{this.props.swim}<small>км</small></samp></div>
          </div>
        </div>
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
        let statistic = res.body.statistic;

        this.setState({
          username: `${athlete.firstName} ${athlete.lastName}`,
          bio: athlete.bio,
          country: athlete.country,
          statisticToday: statistic.today,
          statisticWeek: statistic.week,
          statisticMonth: statistic.month,
          statisticYear: statistic.year,
          statisticTotal: statistic.total
        });
      });
  },

  render() {
    return (
      <div>
        <h1>{this.state.username}</h1>
        <p>{this.state.bio}</p>

        <div className="well well-lg center-block" style={{ width:'500px', opacity:0.8 }}>
          <div className="row lead">
            <div className="col-xs-3"></div>
            <div className="col-xs-9">
              <div className="row">
                <div className="col-xs-3"><img src="img/bike-32.png" title="Велосипед"></img></div>
                <div className="col-xs-3"><img src="img/running-32.png" title="Бег"></img></div>
                <div className="col-xs-3"><img src="img/skiing-32.png" title="Беговые лыжи"></img></div>
                <div className="col-xs-3"><img src="img/swimming-32.png" title="Плавание"></img></div>
              </div>
            </div>
          </div>
          <StatisticItem
            classes="row lead"
            period="Сегодня"
            cycling={this.state.statisticToday.cycling}
            run={this.state.statisticToday.run}
            ski={this.state.statisticToday.ski}
            swim={this.state.statisticToday.swim}/>
          <StatisticItem
            period="За неделю"
            cycling={this.state.statisticWeek.cycling}
            run={this.state.statisticWeek.run}
            ski={this.state.statisticWeek.ski}
            swim={this.state.statisticWeek.swim}/>
          <StatisticItem
            period="За месяц"
            cycling={this.state.statisticMonth.cycling}
            run={this.state.statisticMonth.run}
            ski={this.state.statisticMonth.ski}
            swim={this.state.statisticMonth.swim}/>
          <StatisticItem
            period="За год"
            cycling={this.state.statisticYear.cycling}
            run={this.state.statisticYear.run}
            ski={this.state.statisticYear.ski}
            swim={this.state.statisticYear.swim}/>
          <StatisticItem
            period="Всего"
            cycling={this.state.statisticTotal.cycling}
            run={this.state.statisticTotal.run}
            ski={this.state.statisticTotal.ski}
            swim={this.state.statisticTotal.swim}/>
          <a className="btn btn-link">Подробно >></a>
        </div>

        <a className="btn btn-default page-scroll" href="#journal">Журнал тренировок</a>
      </div>
    );
  }
});

export default Brief;

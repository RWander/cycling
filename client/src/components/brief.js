import React from 'react';
import { connect } from 'react-redux';
import { fetchFullInfo } from '../actions';

const StatisticItem = React.createClass({
  propTypes: {
    period : React.PropTypes.string.isRequired,
    ski: React.PropTypes.number.isRequired,
    run: React.PropTypes.number.isRequired,
    cycling: React.PropTypes.number.isRequired,
    swim: React.PropTypes.number.isRequired,
    classes: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      classes: 'row'
    };
  },

  render: function() {
    const { classes, period, cycling, run, ski, swim } = this.props;
    return (
      <div className={classes}>
        <div className="col-xs-3 text-right text-nowrap">{period}</div>
        <div className="col-xs-9">
          <div className="row">
            <div className="col-xs-3 text-nowrap"><samp>{cycling}<small>км</small></samp></div>
            <div className="col-xs-3 text-nowrap"><samp>{run}<small>км</small></samp></div>
            <div className="col-xs-3 text-nowrap"><samp>{ski}<small>км</small></samp></div>
            <div className="col-xs-3 text-nowrap"><samp>{swim}<small>км</small></samp></div>
          </div>
        </div>
      </div>
    );
  }
});

const Brief = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFullInfo());
  },

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    username : React.PropTypes.string.isRequired,
    bio: React.PropTypes.string.isRequired,
    country: React.PropTypes.string.isRequired,
    statisticToday: React.PropTypes.object.isRequired,
    statisticWeek: React.PropTypes.object.isRequired,
    statisticMonth: React.PropTypes.object.isRequired,
    statisticYear: React.PropTypes.object.isRequired,
    statisticTotal: React.PropTypes.object.isRequired
  },

  render() {
    const {
      username, bio, statisticToday, statisticWeek,
      statisticMonth, statisticYear, statisticTotal
    } = this.props;

    if (typeof username === 'undefined') {
      return (
        <h1>LOADING...</h1>
      );
    } else {
      return (
        <div>
          <h1>{username}</h1>
          <p>{bio}</p>

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
              cycling={statisticToday.cycling}
              run={statisticToday.run}
              ski={statisticToday.ski}
              swim={statisticToday.swim}/>
            <StatisticItem
              period="За неделю"
              cycling={statisticWeek.cycling}
              run={statisticWeek.run}
              ski={statisticWeek.ski}
              swim={statisticWeek.swim}/>
            <StatisticItem
              period="За месяц"
              cycling={statisticMonth.cycling}
              run={statisticMonth.run}
              ski={statisticMonth.ski}
              swim={statisticMonth.swim}/>
            <StatisticItem
              period="За год"
              cycling={statisticYear.cycling}
              run={statisticYear.run}
              ski={statisticYear.ski}
              swim={statisticYear.swim}/>
            <StatisticItem
              period="Всего"
              cycling={statisticTotal.cycling}
              run={statisticTotal.run}
              ski={statisticTotal.ski}
              swim={statisticTotal.swim}/>
            <a className="btn btn-link">Подробно >></a>
          </div>

          <a className="btn btn-default page-scroll" href="#journal">Журнал тренировок</a>
        </div>
      );
    }
  }
});

// export default Brief;

export default connect(state => state.brief)(Brief);

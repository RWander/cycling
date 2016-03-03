import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFullInfo } from '../actions';

class StatisticItem extends Component {
  getDefaultProps() {
    return {
      classes: 'row'
    };
  }

  render() {
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
}

StatisticItem.propTypes = {
  period : PropTypes.string.isRequired,
  ski: PropTypes.number.isRequired,
  run: PropTypes.number.isRequired,
  cycling: PropTypes.number.isRequired,
  swim: PropTypes.number.isRequired,
  classes: PropTypes.array.isRequired
};

class Brief extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFullInfo());
  }

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
}

Brief.propTypes = {
  dispatch: PropTypes.func.isRequired,
  username : PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  statisticToday: PropTypes.object.isRequired,
  statisticWeek: PropTypes.object.isRequired,
  statisticMonth: PropTypes.object.isRequired,
  statisticYear: PropTypes.object.isRequired,
  statisticTotal: PropTypes.object.isRequired
};

// export default Brief;

export default connect(state => state.brief)(Brief);

// /* global BACKEND */

import React from 'react';
import { connect } from 'react-redux';
import { fetchFullInfo } from '../actions';
// import request from 'superagent';

// var BriefStore = {
//   username: '',
//   bio: '',
//   country: '',
//   statisticToday: {},
//   statisticWeek: {},
//   statisticMonth: {},
//   statisticYear: {},
//   statisticTotal: {}
// };

// let StatisticItem = React.createClass({
//   propTypes: {
//     period : React.PropTypes.string.isRequired,
//     ski: React.PropTypes.string.isRequired,
//     run: React.PropTypes.string.isRequired,
//     cycling: React.PropTypes.string.isRequired,
//     swim: React.PropTypes.string.isRequired,
//     classes: React.PropTypes.array.isRequired
//   },
//
//   getDefaultProps: function() {
//     return {
//       classes: 'row'
//     };
//   },
//
//   render: function() {
//     return (
//       <div className={this.props.classes}>
//         <div className="col-xs-3 text-right text-nowrap">{this.props.period}</div>
//         <div className="col-xs-9">
//           <div className="row">
//             <div className="col-xs-3 text-nowrap"><samp>{this.props.cycling}<small>км</small></samp></div>
//             <div className="col-xs-3 text-nowrap"><samp>{this.props.run}<small>км</small></samp></div>
//             <div className="col-xs-3 text-nowrap"><samp>{this.props.ski}<small>км</small></samp></div>
//             <div className="col-xs-3 text-nowrap"><samp>{this.props.swim}<small>км</small></samp></div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// });

let Brief = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFullInfo());
  },
  //getInitialState: () => BriefStore,

  // componentDidMount: function() {
  //   request
  //     .get(`${BACKEND}/full`)
  //     .end((err, res) => {
  //       let athlete = res.body.athlete;
  //       let statistic = res.body.statistic;
  //
  //       this.setState({
  //         username: `${athlete.firstName} ${athlete.lastName}`,
  //         bio: athlete.bio,
  //         country: athlete.country,
  //         statisticToday: statistic.today,
  //         statisticWeek: statistic.week,
  //         statisticMonth: statistic.month,
  //         statisticYear: statistic.year,
  //         statisticTotal: statistic.total
  //       });
  //     });
  // },
  //
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    username : React.PropTypes.string//.isRequired,
  //   bio: React.PropTypes.string.isRequired,
  //   country: React.PropTypes.string.isRequired,
  //   statisticToday: React.PropTypes.string.isRequired,
  //   statisticWeek: React.PropTypes.string.isRequired,
  //   statisticMonth: React.PropTypes.array.isRequired,
  //   statisticYear: React.PropTypes.array.isRequired,
  //   statisticTotal: React.PropTypes.array.isRequired
  },

  render() {
    // return (
    //   <div>
    //     <h1>{this.props.username}</h1>
    //     <p>{this.props.bio}</p>
    //
    //     <div className="well well-lg center-block" style={{ width:'500px', opacity:0.8 }}>
    //       <div className="row lead">
    //         <div className="col-xs-3"></div>
    //         <div className="col-xs-9">
    //           <div className="row">
    //             <div className="col-xs-3"><img src="img/bike-32.png" title="Велосипед"></img></div>
    //             <div className="col-xs-3"><img src="img/running-32.png" title="Бег"></img></div>
    //             <div className="col-xs-3"><img src="img/skiing-32.png" title="Беговые лыжи"></img></div>
    //             <div className="col-xs-3"><img src="img/swimming-32.png" title="Плавание"></img></div>
    //           </div>
    //         </div>
    //       </div>
    //       <StatisticItem
    //         classes="row lead"
    //         period="Сегодня"
    //         cycling={this.props.statisticToday.cycling}
    //         run={this.props.statisticToday.run}
    //         ski={this.props.statisticToday.ski}
    //         swim={this.props.statisticToday.swim}/>
    //       <StatisticItem
    //         period="За неделю"
    //         cycling={this.props.statisticWeek.cycling}
    //         run={this.props.statisticWeek.run}
    //         ski={this.props.statisticWeek.ski}
    //         swim={this.props.statisticWeek.swim}/>
    //       <StatisticItem
    //         period="За месяц"
    //         cycling={this.props.statisticMonth.cycling}
    //         run={this.props.statisticMonth.run}
    //         ski={this.props.statisticMonth.ski}
    //         swim={this.props.statisticMonth.swim}/>
    //       <StatisticItem
    //         period="За год"
    //         cycling={this.props.statisticYear.cycling}
    //         run={this.props.statisticYear.run}
    //         ski={this.props.statisticYear.ski}
    //         swim={this.props.statisticYear.swim}/>
    //       <StatisticItem
    //         period="Всего"
    //         cycling={this.props.statisticTotal.cycling}
    //         run={this.props.statisticTotal.run}
    //         ski={this.props.statisticTotal.ski}
    //         swim={this.props.statisticTotal.swim}/>
    //       <a className="btn btn-link">Подробно >></a>
    //     </div>
    //
    //     <a className="btn btn-default page-scroll" href="#journal">Журнал тренировок</a>
    //   </div>
    // );
    const { username } = this.props.brief;
    debugger;

    return (
      <div>Hello, {username}</div>
    );
  }
});

// export default Brief;

export default connect(state => state)(Brief);

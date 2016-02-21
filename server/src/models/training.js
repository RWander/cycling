'use strict';

const TRAINING_TYPE =  require('./TrainingType');

var jpath = require('json-path');
var moment = require('moment');
var Document = require('camo').Document;
var statistic = require('../libs/statistic');
var Athlete = require('./athlete');

class Training extends Document {
  constructor () {
    super();

    this.schema({
      stravaId: {
        type: Number
      },
      name: {
        type: String,
        required: true
      },
      desc: {
        type: String
      },
      type: {
        type: String,
        default: TRAINING_TYPE[TRAINING_TYPE.cycling],
        choices: TRAINING_TYPE.vals(),
        required: true
      },
      startDate: {
        type: Date,
        default: Date.now,
        required: true
      },
      athlete: {
        type: Athlete,
        required: true
      },
      distance: { // meters
        type: Number,
        required: true,
        min: 0
      },
      movingTime: { // seconds
        type: Number,
        required: true,
        min: 0
      },
      elapsedTime: { // seconds
        type: Number,
        required: true,
        min: 0
      },
      elevationGain: { // meters - подъем
        type: Number,
        required: true,
        min: 0
      },
      averageSpeed: { // meters per second
        type: Number,
        required: true,
        min: 0
      },
      maxSpeed: { // meters per second
        type: Number,
        required: true,
        min: 0
      }
    });
  }

  static collectionName() {
    return 'trainings';
  }


  /**
   * static - Returns the current athlete.
   *
   * @return {Promise}
   */
  static loadCurrent() {
    return Training.loadMany({ }, {
      populate: false // don't load refs
    });
  }

  /**
   * static - Returns the statistic object of current athlete.
   *
   * @return {Promise}
   */
  static loadStatisticCurrent(path) {
    path = path ? path : '';
    if (Training._statisticObj) {
      return new Promise(resolve => resolve(jpath.resolve(Training._statisticObj, path)));
    } else {
      return Training.loadCurrent()
        .then(trainings => {
          Training._statisticObj = statistic(trainings);
          return jpath.resolve(Training._statisticObj, path);
        });
    }
  }

  /**
   * static - Returns the short statistic object of current athlete.
   *
   * @return {Promise}
   */
  static loadShortStatistic() {
    let currentTime = moment();
    let year = currentTime.format('YYYY');  // Current Year (2016)
    let month = currentTime.format('MMM');  // Current Month (Feb)
    let week = currentTime.format('WW');    // Current Week (06)
    let day = currentTime.format('DD');     // Current Day (10)

    return Training.loadStatisticCurrent()
      .then(stat => {
        let todayStat = jpath.resolve(stat, `/${year}/${month}/${week}/${day}`);
        let weekStat = jpath.resolve(stat, `/${year}/${month}/${week}`);
        let monthStat = jpath.resolve(stat, `/${year}/${month}`);
        let yearStat = jpath.resolve(stat, `/${year}`);

        let res = {
          today: Training._calcShortStatItem(todayStat),
          week: Training._calcShortStatItem(weekStat),
          month: Training._calcShortStatItem(monthStat),
          year: Training._calcShortStatItem(yearStat)
        };

        return res;
      });
  }

  // private
  static _calcShortStatItem(stat) {
    if (stat.length > 0) {
      let s = stat[0];
      return {
        cycling: s.cycling ? s.cycling.distance : 0,
        run: s.run ? s.run.distance : 0,
        ski: s.ski ? s.ski.distance : 0
      };
    } else {
      return {
        cycling: 0,
        run: 0,
        ski: 0
      };
    }
  }
}

module.exports = Training;

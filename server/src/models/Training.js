'use strict';

const TrainingType =  require('./TrainingType');

var jpath = require('json-path');
var Document = require('camo').Document;
var statistic = require('../libs/statistic');
var Athlete = require('./Athlete');

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
        default: TrainingType[TrainingType.cycling],
        choices: TrainingType.vals(),
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
  static loadCurrent(types, pageCount) {
    const find = { };
    const options = {
      sort: '-startDate',
      populate: false, // don't load refs
      limit: 10
    };

    // TODO (rwander): учитывать 'types' param
    // ..
    //if (types) {
    //  find.type = types;
    //}
    if (pageCount) {
      options.skip = pageCount*10;
    }

    return Training.find(find, options);
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
      return Training.find()
        .then(trainings => {
          Training._statisticObj = statistic.calculate(trainings);
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
    return Training.loadStatisticCurrent().then(statistic.convertToShort);
  }
}

module.exports = Training;

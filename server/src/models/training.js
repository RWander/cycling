'use strict';

const TRAINING_TYPE =  require('./TrainingType');

var jpath = require('json-path');
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

  static loadCurrent() {
    return Training.loadMany({ }, {
      populate: false // don't load refs
    });
  }

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
}

module.exports = Training;

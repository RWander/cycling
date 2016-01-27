'use strict';

var Document = require('camo').Document;
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
        type: Number,
        default: 1,
        choices: [
          1, // - cycling
          2, // - running
          3  // - skiing
        ],
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
}

module.exports = Training;

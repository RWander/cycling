var Document = require('camo').Document;
var Athlete = require('./athlete');

class Training extends Document {
  constructor () {
    super();

    this.schema({
      name: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        required: true
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
      date: {
        type: Date,
        required: true
      },
      athlete: {
        type: Athlete,
        required: true
      }
    });
  }

  static collectionName() {
    return 'trainings';
  }
}

module.exports = Training;

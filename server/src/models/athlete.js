'use strict';

var camo = require('camo');
var Document = camo.Document;

class Athlete extends Document {
  constructor () {
    super();

    this.schema({
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      birthday: {
        type: Date
      },
      country: {
        type: String
      },
      City: {
        type: String
      },
      Bio: {
        type: String
      }
    });
  }

  static collectionName() {
    return 'athletes';
  }

  static loadCurrent() {
    return Athlete.loadOne({ });
  }
}

module.exports = Athlete;

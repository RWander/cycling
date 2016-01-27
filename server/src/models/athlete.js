'use strict';

var camo = require('camo');

var Document = camo.Document;
var EmbeddedDocument = camo.EmbeddedDocument;

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
      },
      summary: {
        type: AthleteSummary
      }
    });
  }

  static collectionName() {
    return 'athletes';
  }
}

class ActivitySummary extends EmbeddedDocument {
  constructor () {
    super();

    this.schema({

    });
  }
}

class AthleteSummary extends EmbeddedDocument {
  constructor () {
    super();

    this.schema({
      cycling: {
        type: ActivitySummary,
        required: true
      },
      running: {
        type: ActivitySummary,
        required: true
      },
      skiing: {
        type: ActivitySummary,
        required: true
      }
    });
  }
}

module.exports = Athlete;

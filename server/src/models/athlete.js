var Document = require('camo').Document;

class Athlete extends Document {
  constructor () {
    super();

    this.schema({
      // General information
      firstName: String,
      lastName: String,
      birthday: Date,
      country: String,
      City: String,
      Bio: String
    });
  }

  static collectionName() {
    return 'athletes';
  }
}

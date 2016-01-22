/* eslint-disable no-console */
console.log('Connecting to db..');
/* eslint-disable no-console */

var config = require('config').get('db');
var camo = require('camo');

camo.connect(config.uri).then(function(dbClient) {
  /* eslint-disable no-console */
  console.log('db path is %s', dbClient._path);
  /* eslint-disable no-console */
});

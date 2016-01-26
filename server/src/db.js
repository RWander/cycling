/* eslint-disable no-console */
console.log('Connecting to db..');
/* eslint-disable no-console */

var config = require('config').get('db');
var camo = require('camo');

var connection = module.exports = camo.connect(config.uri);

connection
.then((dbClient) => {
  /* eslint-disable no-console */
  console.log('db path is %s', dbClient._path);
  /* eslint-disable no-console */
})
.catch((err) => {
  /* eslint-disable no-console */
  console.log('db connection errpr: %s', err);
  /* eslint-disable no-console */
});

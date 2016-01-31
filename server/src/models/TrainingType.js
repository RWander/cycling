'use strict';

var Enum = require('symbol-enum');

// FIXME (rwander): don't override prototype to get all possible string values of enum;
Enum.prototype.vals = function() {
  return Array.from(TRAINING_TYPE).map(s => TRAINING_TYPE[s[1]]);
};

var TRAINING_TYPE = new Enum('cycling', 'run', 'ski');

module.exports = TRAINING_TYPE;

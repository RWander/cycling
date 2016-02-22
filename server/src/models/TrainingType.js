'use strict';

var Enum = require('symbol-enum');

// FIXME (rwander): don't override prototype to get all possible string values of enum;
Enum.prototype.vals = function() {
  return Array.from(TrainingType).map(s => TrainingType[s[1]]);
};

var TrainingType = new Enum('cycling', 'run', 'ski');

module.exports = TrainingType;

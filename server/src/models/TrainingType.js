'use strict';

var Enum = require('symbol-enum');

var TRAINING_TYPE = new Enum('cycling', 'run', 'ski');

module.exports = TRAINING_TYPE;

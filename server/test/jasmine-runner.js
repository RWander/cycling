/*eslint-env jasmine */

var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter');
var noop = function() {};

var jrunner = new Jasmine();

// remove default reporter logs
jrunner.configureDefaultReporter({
  print: noop
});

// add jasmine-spec-reporter
jasmine.getEnv().addReporter(new SpecReporter({
  // all options: https://github.com/bcaudan/jasmine-spec-reporter#default-options
  displayStacktrace: 'summary'
}));

// load jasmine.json configuration
jrunner.loadConfigFile();

jrunner.execute();

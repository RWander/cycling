'use strict';

/* eslint-disable no-undef */

beforeEach(function () {
  var _ = require('lodash');

  jasmine.addMatchers({
    isEmpty: () => {
      return {
        compare: (actual) => {
          function check() {
            for (var key in actual) {
              if (actual.hasOwnProperty(key)){
                return false;
              }
            }
            return true;
          }

          return {
            pass: check(actual)
          };
        }
      };
    },

    /**
     * Checks whather the actual value is year in the YYYY format ([1990, current year]).
     */
    isYearYYYY: () => {
      return {
        compare: (actual) => {
          let year = parseInt(actual);
          let currentYear = new Date().getFullYear();

          return {
            pass: !isNaN(year) && year >= 1900 && year <= currentYear
          };
        }
      };
    },

    /**
     * Checks whather the actual value is month in MMM format ('Jan'|'Feb'|'Mar'|'Apr'| ..|'Dec')
     */
    isMonthMMM: () => {
      return {
        compare: (actual) => {
          let month = actual;
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          return {
            pass: months.indexOf(month) > -1
          };
        }
      };
    },

    isWeekNumber: () => {
      return {
        compare: (actual) => {
          let week = parseInt(actual);

          // TODO (rwander): Each month contains weeks with the different number
          // ..

          return {
            pass: actual.length == 2 && !isNaN(week) && week >= 1 && week <= 53
          };
        }
      };
    },

    isDayNumber: () => {
      return {
        compare: (actual) => {
          let day = parseInt(actual);

          // TODO (rwander): Month contains 28, 29, 30 or 31 days..
          // ..

          return {
            pass: !isNaN(day) && day >= 1 && day <= 31
          };
        }
      };
    },

    isCorrectStatisticPoint: () => {
      return {
        compare: (actual) => {
          let point = actual;
          let keys = Object.keys(point);

          return {
            pass: keys.length === 4
              // distance
              && keys.indexOf('distance') != -1
              && !isNaN(parseInt(point.distance))
              // movingTime
              && keys.indexOf('movingTime') != -1
              && !isNaN(parseInt(point.movingTime))
              // elapsedTime
              && keys.indexOf('elapsedTime') != -1
              && !isNaN(parseInt(point.elapsedTime))
              // elevationGain
              && keys.indexOf('elevationGain') != -1
              && !isNaN(parseInt(point.elevationGain))
          };
        }
      };
    },

    hasAtheleteSchema: () => {
      return {
        compare: (actual) => {
          return {
            pass: isAtheleteSchema(actual)
          };
        }
      };
    },

    hasFullAthleteInfoSchema: () => {
      return {
        compare: (actual) => {
          return {
            pass: isFullAthleteInfoSchema(actual)
          };
        }
      };
    },

    hasTrainingSchema: () => {
      return {
        compare: (actual) => {
          return {
            pass: isTrainingSchema(actual)
          };
        }
      };
    }
  });

  // TODO (rwander): vaildate schema using jsonschema
  // ..

  function isAtheleteSchema(obj) {
    let props = _.keys(obj);
    let diff = _.xor(
      props,
      ['_id', 'firstName', 'lastName', 'birthday', 'country', 'city', 'bio']
    );

    return diff.length === 0;
  }

  function isFullAthleteInfoSchema(obj) {
    let props = _.keys(obj);
    let diff = _.xor(props, ['athlete', 'trainings', 'statistic']);

    return diff.length === 0 && isAtheleteSchema(obj.athlete);
  }

  function isTrainingSchema(obj) {
    let props = _.keys(obj);
    let diff = _.xor(
      props,
      ['_id', 'stravaId', 'name', 'type', 'startDate', 'athlete', 'distance', 'movingTime', 'elapsedTime', 'elevationGain', 'averageSpeed', 'maxSpeed']
    );

    return diff.length === 0;
  }
});

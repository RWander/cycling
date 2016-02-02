'use strict';

/* eslint-disable no-undef */

beforeEach(function () {
  jasmine.addMatchers({

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
          var month = actual;
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
          var week = parseInt(actual);

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
          var day = parseInt(actual);

          // TODO (rwander): Month contains 28, 29, 30 or 31 days..
          // ..

          return {
            pass: !isNaN(day) && day >= 1 && day <= 31
          };
        }
      };
    }
  });
});

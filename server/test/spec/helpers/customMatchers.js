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

          // TODO
          // ..

          return month !== null;
        }
      };
    },

    // TODO: ES6 - enum support?
    // ...

    /**
     * Checks whather the actual value is correct training type in MMM format (1|2|3)
     */
    isTrainingType: () => {
      return {
        compare: (actual) => {
          var type = actual;

          // TODO
          // ..

          return type !== null;
        }
      };
    }
  });
});

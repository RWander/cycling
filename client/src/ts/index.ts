/// <reference path='../../typings/tsd.d.ts' />

module Cycling {
  angular.module('cycling', [])
    .constant('CYCLING_CONFIG', {
        'backend': 'http://localhost:5000'
    })
    .controller('cyclingCtrl', CyclingController);
}

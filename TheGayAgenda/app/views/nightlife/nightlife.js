'use strict';

angular.module('myApp.nightlife', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nightlife', {
    templateUrl: 'views/nightlife/nightlife.html',
    controller: 'nightlifeCtrl'
  });
}])

.controller('nightlifeCtrl', [function() {

}]);
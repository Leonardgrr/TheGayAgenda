'use strict';

angular.module('myApp.safePlaces', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/safePlaces', {
    templateUrl: 'views/safePlaces/safePlaces.html',
    controller: 'safePlacesCtrl'
  });
}])

.controller('safePlacesCtrl', [function() {

}]);
'use strict';

angular.module('myApp.restaurants', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/restaurants', {
    templateUrl: 'views/restaurants/restaurants.html',
    controller: 'restaurantsCtrl'
  });
}])

.controller('restaurantsCtrl', [function() {

}]);
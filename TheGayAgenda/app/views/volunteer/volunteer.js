'use strict';

angular.module('myApp.volunteer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/volunteer', {
    templateUrl: 'views/volunteer/volunteer.html',
    controller: 'volunteerCtrl'
  });
}])

.controller('volunteerCtrl', [function() {

}]);
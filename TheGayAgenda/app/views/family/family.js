'use strict';

angular.module('myApp.family', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/family', {
    templateUrl: 'views/family/family.html',
    controller: 'familyCtrl'
  });
}])

.controller('familyCtrl', [function() {

}]);
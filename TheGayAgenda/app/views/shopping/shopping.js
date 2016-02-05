'use strict';

angular.module('myApp.shopping', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shopping', {
    templateUrl: 'views/shopping/shopping.html',
    controller: 'shoppingCtrl'
  });
}])

.controller('shoppingCtrl', [function() {

}]);
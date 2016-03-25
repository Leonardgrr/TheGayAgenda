'use strict';

angular.module('myApp.listing', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/listing/:category', {
    templateUrl: 'views/listing/listing.html',
    controller: 'listingCtrl'
  });
}])

// JUST A SIMPLE FILTER TO SHORTEN THE ABOUT ON LISTING VIEW
.filter('ellipsis', function () {
    return function (text, length) {
        if (text.length > length) {
            return text.substr(0, length) + " ... ";
        }
        return text;
    }
}) 

.controller('listingCtrl', ['$routeParams', '$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', 'FIREBASE_URL',
	function($routeParams, $rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, FIREBASE_URL, user, Auth) {
	var ref = new Firebase(FIREBASE_URL);
	$scope.authObj = $firebaseAuth(ref);
	$scope.places = $firebaseArray(new Firebase(FIREBASE_URL+"places"));
	$scope.events = $firebaseArray(new Firebase(FIREBASE_URL+"events"));
	$scope.listingPlaces = $firebaseArray(new Firebase(FIREBASE_URL+"places/"));
	$scope.listingEvents = $firebaseArray(new Firebase(FIREBASE_URL+"events/"));
	$scope.category = $routeParams.category;
}]);
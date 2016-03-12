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

.controller('listingCtrl', ['$routeParams', '$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', 
	function($routeParams, $rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, user, Auth) {
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	// $scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	$scope.eventplace = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"));
	$scope.places = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places"));
	$scope.events = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/events"));

	//console.log($scope.places);
	// var listing = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"));
	var listingPlaces = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	var listingEvents = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/events/"));
	$scope.listingPlaces = listingPlaces;
	console.log("list of places"+listingPlaces);
	$scope.listingEvents = listingEvents;
	console.log("list of events"+listingEvents);

	$scope.category = $routeParams.category;
	var listingRef = new Firebase("https://thegayagenda.firebaseio.com/eventplace/"+$routeParams.category);
	
	// console.log($scope.category);


	

}]);
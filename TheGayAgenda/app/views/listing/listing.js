'use strict';

angular.module('myApp.listing', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/listing/:category', {
    templateUrl: 'views/listing/listing.html',
    controller: 'listingCtrl'
  });
}])

.controller('listingCtrl', ['$routeParams', '$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', 
	function($routeParams, $rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, user, Auth) {
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	// $scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	$scope.places = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.eventplace = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"));

	//console.log($scope.places);

	var list = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.list = list;
	console.log(list);

	var listing = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"));
	$scope.listing = listing;
	console.log(listing);

	var listingRef = new Firebase("https://thegayagenda.firebaseio.com/eventplace/"+$routeParams.category);
	$scope.category = $routeParams.category;
	// console.log($scope.category);
	

}]);
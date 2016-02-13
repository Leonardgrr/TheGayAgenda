'use strict';

angular.module('myApp.listing', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/listing', {
    templateUrl: 'views/listing/listing.html',
    controller: 'listingCtrl'
  });
}])

.controller('listingCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', 
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, user, Auth) {
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	// $scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	$scope.places = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.pictures = $firebaseArray(new Firebase("https://smsfoto.firebaseio.com/pictures/"));

	//console.log($scope.places);

	var list = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.list = list;
	console.log(list);

}]);
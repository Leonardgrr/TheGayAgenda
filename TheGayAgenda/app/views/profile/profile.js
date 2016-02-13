'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'views/profile/profile.html',
    controller: 'profileCtrl'
  });
}])

.controller('profileCtrl', [ '$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', 
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, user, Auth) {
	// var auth = $firebaseAuth(ref);
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	$scope.checkIn = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/checkIn"));
	$scope.rsvp = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/rsvp"));
	$scope.authObj.$onAuth(function(authData) {
		$rootScope.authorize(authData);
	});

	$rootScope.authorize = function(authData){
		if (authData) {
		  	$scope.userData = authData;
		  	var user = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"+authData.uid));
		  	if (authData.provider === "google"){
			  	user.profilePic = authData.google.profileImageURL;
			  	user.userName = authData.google.displayName;
			  	user.$save();
		  	}
		}
		//  else {
		//   	//if user not logged in
		//   	$location.path('/');
		// }
	}

$scope.test = function(){
	console.log("hello world");
}

	//User Check In Function
	$scope.newCheckIn = function(){
		console.log("did it check in?");
		$scope.checkIn.$add({
			category : $scope.newCategory.category,
			points: $scope.newPoints.points,
		})
	}

	// User RSVP Function
	$scope.newRSVP = function(){
		console.log("did it RSVP?");
		$scope.rsvp.$add({
			category : $scope.newCategory.category,
			points: $scope.newPoints.points,
		})
	}



}]);

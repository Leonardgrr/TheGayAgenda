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
	$scope.player_pin = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/player_pin"));
	$scope.player_pins = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/player_pin/"));
	$scope.pins = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/player_pin/"));
	$scope.checkIn = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/checkIn"));
	$scope.rsvp = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/rsvp"));
	$scope.authObj.$onAuth(function(authData) {
		$rootScope.authorize(authData);
		$scope.userData = authData;
		$rootScope.currentUser = authData.uid;
	});

	$rootScope.authorize = function(authData){
		if (authData) {
		  	$scope.userData = authData;
		  	$rootScope.currentUser = authData.uid;
		  	// console.log($rootScope.currentUser);
		  	var user = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"+authData.uid));
		  	if (authData.provider === "google"){
			  	user.profilePic = authData.google.profileImageURL;
			  	user.userName = authData.google.displayName;
			  	user.$save();
		  	}else if (authData.provider === "twitter"){
		  		user.profilePic = authData.twitter.profileImageURL;
			  	user.userName = authData.twitter.displayName;
			  	user.$save();
		  	}else if (authData.provider === "facebook"){
		  		user.profilePic = authData.facebook.profileImageURL;
			  	user.userName = authData.facebook.displayName;
			  	user.$save();	
		  	}
		}
		//  else {
		//   	//if user not logged in
		//   	$location.path('/');
		// }
	}


	//User Check In Function
	$scope.newCheckIn = function(){
		console.log("You have checked in");
		$scope.checkIn.$add({
			category : $scope.newCategory.category,
			points: $scope.newPoints.points,
			user: $scope.newUser.user,
			pin: $scope.newPlayerPin.pin,
			venue: $scope.newVenue.venue	
		})
	}

	// User RSVP Function
	$scope.newRSVP = function(){
		console.log("You have RSVP an event");
		$scope.rsvp.$add({
			category : $scope.newCategory.category,
			points: $scope.newPoints.points,
			user: $scope.newUser.user,
			pin: $scope.newPlayerPin.pin,
			venue: $scope.newVenue.venue			
		})
	}
	$scope.friller = $firebaseObject(ref.child('admins').child('users'));
	
	$scope.show = function(){
		console.log("hi there");
		console.log("Admin user is", $scope.friller.$value);
		console.log("Current user is ", $scope.userData.uid);
	}

	$scope.labels = 
	[
	 'Lipstick' ,
	 'Chapstick' ,
	 'Diesel' ,
	 'Twink' ,
	 'Otter' ,
	 'Bear'
	];


	//User select a label function
	$scope.newPlayerPin = function(){
		console.log("You have selected a label");
		$scope.player_pin.$add({
			label : $scope.newlabel.label,
			user: $scope.currentUser,
		})
	}


// console.log($scope.player_pin);
$scope.case = $firebaseObject(ref.child('player_pin').child('id').child('user'));


}]);

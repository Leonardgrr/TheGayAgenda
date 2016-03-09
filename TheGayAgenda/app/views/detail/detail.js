'use strict';

angular.module('myApp.detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/detail/:placeID', {
    templateUrl: 'views/detail/detail.html',
    controller: 'detailCtrl'
  });
}])



.controller('detailCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', "$routeParams", 
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, $routeParams, user, Auth) {
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.places = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.eventplace = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"));
	var list = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.list = list;
	var detailRef = new Firebase("https://thegayagenda.firebaseio.com/places/"+$routeParams.placeID);
	$scope.currentDetail = $routeParams.placeID;
	$scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	$scope.player_pin = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/player_pin"));
	$scope.player_pins = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/player_pin/"));
	$scope.pins = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/player_pin/"));
	$scope.authObj.$onAuth(function(authData) {
		$rootScope.authorize(authData);
		$scope.userData = authData;
		// $rootScope.currentUser = authData.uid;
		// get the users pin label
		new Firebase("https://thegayagenda.firebaseio.com/pins/"+authData.uid).once('value', function(snap) {
			$rootScope.userpin = snap.val();
		   console.log('I fetched a user!', snap.val());
		   console.log($rootScope.userpin.label);
		});
		var ref = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/pins/"+authData.uid));
		});

	$rootScope.authorize = function(authData){
		if (authData) {
		  	$scope.userData = authData;
		  	$rootScope.currentUser = authData.uid;
		  	// console.log($scope.currentUser);

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
	// $scope.checkIn = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/checkIn"));
	$scope.newCheckIn = function(){
		// create a path for the rsvp for the current user
		$scope.checkIn = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/pins/"+$scope.currentUser+"/checkins"));
		// create a url to save the rsvp under the right place/event
		$scope.allusercheckIn = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"+$scope.newCheckIn.venue+"/checkins"));
		console.log("You have checked in");
		$scope.checkIn.$add({
			category : $scope.newCheckIn.category,
			points: $scope.newCheckIn.points,
			user: $scope.newCheckIn.user,
			pin: $scope.newCheckIn.pin,
			venue: $scope.newCheckIn.venue	
		})
		$scope.allusercheckIn.$add({
			user: $scope.newCheckIn.user,
			pin: $scope.newCheckIn.pin
		})
	}

	// User RSVP Function
	$scope.newRSVP = function(){
		// create a path for the rsvp for the current user
		$scope.rsvp = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/pins/"+$scope.currentUser+"/rsvps"));
		// create a url to save the rsvp under the right place/event
		$scope.alluserrsvp = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"+$scope.newRSVP.venue+"/rsvps"));
		console.log("You have RSVP an event");
		$scope.rsvp.$add({
			category : $scope.newRSVP.category,
			points: $scope.newRSVP.points,
			user: $scope.newRSVP.user,
			pin: $scope.newRSVP.pin,
			venue: $scope.newRSVP.venue			
		})
		$scope.alluserrsvp.$add({
			user: $scope.newRSVP.user,
			pin: $scope.newRSVP.pin
		})
	}

	// 	GET THE CURRENT CHECKINS FOR THE PLACE / EVENT SELECTED 
	$scope.checkinsForPlace = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"+$routeParams.placeID+'/checkins/'));
	// console.log($scope.checkinsForPlace);
	$scope.rsvpsForPlace = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"+$routeParams.placeID+'/rsvps/'));
	// console.log($scope.rsvpsForPlace);



}]);

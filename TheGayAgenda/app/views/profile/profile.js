'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'views/profile/profile.html',
    controller: 'profileCtrl'
  });
}])

// THIS FACTORY IS USED TO CREATE A USER PIN OBJECT TO BE USED AS
.factory("Profile", ["$firebaseObject",
  function($firebaseObject) {
    return function(username) {
      // create a reference to the database node where we will store our data
      var ref = new Firebase("https://thegayagenda.firebaseio.com/pins/");
      var profileRef = ref.child(username);
      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
])

.controller('profileCtrl', [ '$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', 'Profile',
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, Profile, user, Auth) {
	// var auth = $firebaseAuth(ref);
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	
	$scope.testUsers = new Firebase("https://thegayagenda.firebaseio.com/users");
	$scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	// $scope.player_pin = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/player_pin"));
	$scope.player_pins = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/player_pin/"));
	// $scope.pins = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/player_pin"));
	$scope.checkIn = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/checkIn"));
	$scope.rsvp = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/rsvp"));
	$scope.authObj.$onAuth(function(authData) {
		$rootScope.authorize(authData);
		$scope.userData = authData;
		$rootScope.currentUser = authData.uid;
		console.log($rootScope.currentUser);

		// CRU USER PIN ALSO AKA USER PROFILE
		$scope.profile = Profile($rootScope.currentUser);
		// QUERY TO GET ALL THE USER RSVPS
		$scope.currentUserRSVP = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/pins/"+$rootScope.currentUser+"/rsvps/"));
		console.log($scope.currentUserRSVP);
		$scope.currentUserRSVP.$loaded(function() {
		    $rootScope.rsvpExists = $scope.currentUserRSVP.$value !== null;
		   console.log($rootScope.rsvpExists);
		});
	    // QUERY TO GET ALL THE USER CHECKINS
		$scope.currentUserCheckIn = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/pins/"+$rootScope.currentUser+"/checkins/"));
	    console.log($scope.currentUserCheckIn);
	    $scope.currentUserCheckIn.$loaded(function() {
		    $rootScope.checkinExists = $scope.currentUserCheckIn.$value !== null;
		   console.log($rootScope.checkinExists);
		});
	    // calling $save() on the synchronized object syncs all data back to our database
	    $scope.saveProfile = function() {
	      $scope.profile.$save().then(function() {
	        alert('Profile saved!');
	      }).catch(function(error) {
	        alert('Error!');
	      });
	    };

	});



	$rootScope.authorize = function(authData){
		if (authData) {
		  	$scope.userData = authData;
		  	// $rootScope.currentUser = authData.uid;
		  	// console.log($rootScope.currentUser);
		  	var user = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"+authData.uid));
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
			category : $scope.newCheckIn.category,
			points: $scope.newCheckIn.points,
			user: $scope.newCheckIn.user,
			pin: $scope.newCheckIn.pin,
			venue: $scope.newCheckIn.venue	
		})
	}

	// User RSVP Function
	$scope.newRSVP = function(){
		console.log("You have RSVP an event");
		$scope.rsvp.$add({
			category : $scope.newRSVP.category,
			points: $scope.newRSVP.points,
			user: $scope.newRSVP.user,
			pin: $scope.newRSVP.pin,
			venue: $scope.newRSVP.venue			
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

	// QUERY FOR GETTING THE CHECK CHECKINS/RSVPS FOR PLACES/EVENTS
	// $scope.eventplace = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/eventplace/"));
	$scope.places = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.events = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/events/"));
	// console.log($scope.eventplace);
		


}]);

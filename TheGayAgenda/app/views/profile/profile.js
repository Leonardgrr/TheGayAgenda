'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'views/profile/profile.html',
    controller: 'profileCtrl'
  });
}])

// THIS FACTORY IS USED TO CREATE A USER PIN OBJECT
.factory("Profile", ["$firebaseObject", "FIREBASE_URL",
  function($firebaseObject, FIREBASE_URL) {
    return function(username) {
      // create a reference to the database node where we will store our data
      var ref = new Firebase(FIREBASE_URL+"pins/");
      var profileRef = ref.child(username);
      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
])

.controller('profileCtrl', [ '$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', 'Profile', 'FIREBASE_URL',
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, Profile, FIREBASE_URL, Auth) {
	// var auth = $firebaseAuth(ref);
	var ref = new Firebase(FIREBASE_URL);
	$scope.authObj = $firebaseAuth(ref);
	$scope.users = $firebaseObject(new Firebase(FIREBASE_URL+"users/"));
	$scope.player_pins = $firebaseArray(new Firebase(FIREBASE_URL+"player_pin/"));
	$scope.checkIn = $firebaseArray(new Firebase(FIREBASE_URL+"checkIn"));
	$scope.rsvp = $firebaseArray(new Firebase(FIREBASE_URL+"rsvp"));

	// GET THE DATA TO VERIFY THE ADMIN
	$scope.friller = $firebaseObject(ref.child('admins').child('users'));

	// LABELS FOR DROPDOWN SELECTION
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
	$scope.places = $firebaseObject(new Firebase(FIREBASE_URL+"places/"));
	$scope.events = $firebaseObject(new Firebase(FIREBASE_URL+"events/"));

	// use this to get user data instead! SAVE FOR REFERENCE LATER
	// var currentUser = $scope.authObj.$getAuth();
	// if (currentUser) {
	// 	console.log("Logged in as:", currentUser.uid);
	// } else {
	//   console.log("Logged out");
	// }



}]);

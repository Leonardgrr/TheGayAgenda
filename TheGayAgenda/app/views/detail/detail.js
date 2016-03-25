'use strict';

angular.module('myApp.detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/detail/:placeID', {
    templateUrl: 'views/detail/detail.html',
    controller: 'detailCtrl'
  })
}])



.controller('detailCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', "$routeParams", "FIREBASE_URL",
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, $routeParams, FIREBASE_URL, user, Auth) {
	var ref = new Firebase(FIREBASE_URL);
	$scope.authObj = $firebaseAuth(ref);
	$scope.places = $firebaseArray(new Firebase(FIREBASE_URL+"places/"));
	$scope.events = $firebaseArray(new Firebase(FIREBASE_URL+"events/"));
	var detailRef = new Firebase(FIREBASE_URL+"places/"+$routeParams.placeID);
	$scope.currentDetail = $routeParams.placeID;
	$scope.users = $firebaseObject(new Firebase(FIREBASE_URL+"users/"));
	// QUERY CURRENT CHECKINS FOR THE PLACE / EVENT SELECTED 
	$scope.checkinsForPlace = $firebaseObject(new Firebase(FIREBASE_URL+"places/"+$routeParams.placeID+'/checkins/'));
	// console.log($scope.checkinsForPlace);
	$scope.rsvpsForPlace = $firebaseObject(new Firebase(FIREBASE_URL+"events/"+$routeParams.placeID+'/rsvps/'));
	// console.log($scope.rsvpsForPlace);

	// use this to get user data instead!
	var currentUser = $scope.authObj.$getAuth();
	if (currentUser) {
		// CHECK FOR USER CHECK IN AND RSVP
		new Firebase(FIREBASE_URL+"places/"+$routeParams.placeID+'/checkins/'+currentUser.uid).once('value', function(snap) {
			$scope.checkinpin = snap.val();
			if(currentUser.uid === $scope.checkinpin.user){
				// THE USER IS CHECKED IN AT THE CURRENT PLACE
				$scope.user_is_checked_in = true;
			}else{
				// USER IS NOT CHECKED IN AT THE CURRENT PLACE
				$scope.user_is_checked_in = false;
			}
		});

		new Firebase(FIREBASE_URL+"events/"+$routeParams.placeID+'/rsvps/'+currentUser.uid).once('value', function(snap) {
			$scope.rsvppin = snap.val();
			if(currentUser.uid === $scope.rsvppin.user){
				// THE USER IS RSVP IN AT THE CURRENT EVENT
				$scope.user_has_rsvp = true;
			}else{
				// USER IS NOT RSVP IN AT THE CURRENT EVENT
				$scope.user_has_rsvp = false;
			}
		});

	} else {
	  console.log("Logged out");
	}


	
	// USER CHECK IN FUNCTION
	$scope.newCheckIn = function(){
		// create a path for the rsvp for the current user
		$scope.checkIn = $firebaseArray(new Firebase(FIREBASE_URL+"pins/"+$scope.currentUser+"/checkins"));
		// create a url to save the rsvp under the right place/event
		console.log("You have checked in");
		$scope.checkIn.$add({
			category : $scope.newCheckIn.category,
			points: $scope.newCheckIn.points,
			user: $scope.newCheckIn.user,
			pin: $scope.newCheckIn.pin,
			venue: $scope.newCheckIn.venue	
		}).then(function(p){
			console.log(p.key());
			$scope.keepKey = p.key();
			var allusercheckIn = $firebaseArray(new Firebase(FIREBASE_URL+"places/"+$scope.newCheckIn.venue+"/checkins"));
			var checkinDetails = {
				user: $scope.newCheckIn.user,
				pin: $scope.newCheckIn.pin
			}
			allusercheckIn.$ref().child($scope.newCheckIn.user).set(checkinDetails);
		});
	}

	// USER RSVP IN FUNCTION
	$scope.newRSVP = function(){
		// create a path for the rsvp for the current user
		$scope.rsvp = $firebaseArray(new Firebase(FIREBASE_URL+"pins/"+$scope.currentUser+"/rsvps"));
		// create a url to save the rsvp under the right place/event
		console.log("You have rsvp");
		$scope.rsvp.$add({
			category : $scope.newRSVP.category,
			points: $scope.newRSVP.points,
			user: $scope.newRSVP.user,
			pin: $scope.newRSVP.pin,
			venue: $scope.newRSVP.venue	
		}).then(function(p){
			console.log(p.key());
			$scope.keepKey = p.key();
			var alluserrsvp = $firebaseArray(new Firebase(FIREBASE_URL+"events/"+$scope.newRSVP.venue+"/rsvps"));
			var checkinDetails = {
				user: $scope.newRSVP.user,
				pin: $scope.newRSVP.pin
			}
			alluserrsvp.$ref().child($scope.newRSVP.user).set(checkinDetails);
		});
	}




}]);

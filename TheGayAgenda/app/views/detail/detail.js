'use strict';

angular.module('myApp.detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/detail/:placeID', {
    templateUrl: 'views/detail/detail.html',
    controller: 'detailCtrl'
  })
}])



.controller('detailCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', "$routeParams", 
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, $routeParams, user, Auth) {
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.places = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.events = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/events/"));
	var detailRef = new Firebase("https://thegayagenda.firebaseio.com/places/"+$routeParams.placeID);
	$scope.currentDetail = $routeParams.placeID;
	$scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	// QUERY CURRENT CHECKINS FOR THE PLACE / EVENT SELECTED 
	$scope.checkinsForPlace = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/places/"+$routeParams.placeID+'/checkins/'));
	// console.log($scope.checkinsForPlace);
	$scope.rsvpsForPlace = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/events/"+$routeParams.placeID+'/rsvps/'));
	// console.log($scope.rsvpsForPlace);


	$scope.authObj.$onAuth(function(authData) {
		$rootScope.authorize(authData);
		$scope.userData = authData.uid;
		console.log($scope.userData);

		// CHECK FOR USER CHECK IN AND RSVP
		new Firebase("https://thegayagenda.firebaseio.com/places/"+$routeParams.placeID+'/checkins/'+$scope.userData).once('value', function(snap) {
			$scope.checkinpin = snap.val();
			// console.log('I fetched a user!', snap.val());
			// console.log("label for place ", $scope.detailpin.user);
			if($scope.userData === $scope.checkinpin.user){
				// THE USER IS CHECKED IN AT THE CURRENT PLACE
				$scope.user_is_checked_in = true;
			}else{
				// USER IS NOT CHECKED IN AT THE CURRENT PLACE
				$scope.user_is_checked_in = false;
			}
		});
		new Firebase("https://thegayagenda.firebaseio.com/events/"+$routeParams.placeID+'/rsvps/'+$scope.userData).once('value', function(snap) {
			$scope.rsvppin = snap.val();
			console.log('I fetched a user!', snap.val());
			console.log("label for place ", $scope.rsvppin.user);
			if($scope.userData === $scope.rsvppin.user){
				// THE USER IS CHECKED IN AT THE CURRENT PLACE
				$scope.user_has_rsvp = true;
			}else{
				// USER IS NOT CHECKED IN AT THE CURRENT PLACE
				$scope.user_has_rsvp = false;
			}
		});

	});


	$rootScope.authorize = function(authData){
		if (authData) {
		  	$scope.userData = authData;
		  	$rootScope.currentUser = authData.uid;
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

	
	// USER CHECK IN FUNCTION
	$scope.newCheckIn = function(){
		// create a path for the rsvp for the current user
		$scope.checkIn = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/pins/"+$scope.currentUser+"/checkins"));
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
			var allusercheckIn = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"+$scope.newCheckIn.venue+"/checkins"));
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
		$scope.rsvp = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/pins/"+$scope.currentUser+"/rsvps"));
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
			var alluserrsvp = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/events/"+$scope.newRSVP.venue+"/rsvps"));
			var checkinDetails = {
				user: $scope.newRSVP.user,
				pin: $scope.newRSVP.pin
			}
			alluserrsvp.$ref().child($scope.newRSVP.user).set(checkinDetails);
		});
	}





	



}]);

'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'loginCtrl'
  });
}])

// THIS FACTORY IS USED TO CREATE A USER PIN OBJECT TO BE USED AS
.factory("Profile", ["$firebaseObject",
  function($firebaseObject) {
    return function(username) {
      // create a reference to the database node where we will store our data
      var ref = new Firebase(FIREBASE_URL+"pins/");
      var profileRef = ref.child(username);
      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
])


.controller('loginCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', '$routeParams', 'Profile', '$location', 'FIREBASE_URL',
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, $routeParams, Profile, $location, FIREBASE_URL, user, Auth) {
	var ref = new Firebase(FIREBASE_URL);
	$scope.authObj = $firebaseAuth(ref);
	$scope.users = $firebaseObject(ref,"/users/");
	$scope.authObj.$onAuth(function(authData) {
		$rootScope.authorize(authData);
		$scope.userData = authData;
		$rootScope.currentUser = authData.uid;
		// CRU USER PIN ALSO AKA USER PROFILE
		$scope.profile = Profile($rootScope.currentUser);
		// QUERY TO GET ALL THE USER RSVPS
		$scope.currentUserRSVP = $firebaseObject(new Firebase(FIREBASE_URL+"pins/"+$rootScope.currentUser+"/rsvps/"));
		$scope.currentUserRSVP.$loaded(function() {
		    $rootScope.rsvpExists = $scope.currentUserRSVP.$value !== null;
		});
	    // QUERY TO GET ALL THE USER CHECKINS
		$scope.currentUserCheckIn = $firebaseObject(new Firebase(FIREBASE_URL+"pins/"+$rootScope.currentUser+"/checkins/"));
	    $scope.currentUserCheckIn.$loaded(function() {
		    $rootScope.checkinExists = $scope.currentUserCheckIn.$value !== null;
		});
	    // calling $save() on the synchronized object syncs all data back to our database
	    $scope.saveProfile = function() {
	      $scope.profile.$save().then(function() {
	        alert('Profile saved!');
	      }).catch(function(error) {
	        alert('Error!');
	      });
	    };

		// GET USER LABEL
		new Firebase(FIREBASE_URL+"pins/"+authData.uid).once('value', function(snap) {
			$rootScope.userpin = snap.val();
		});



	});

	$rootScope.authorize = function(authData){
		if (authData) {
		  	$scope.userData = authData;
		  	var user = $firebaseObject(new Firebase(FIREBASE_URL+"users/"+authData.uid));
		  	if (authData.provider === "google"){
			  	user.profilePic = authData.google.profileImageURL;
			  	user.userName = authData.google.displayName;
			  	user.$save();
		  	}else if (authData.provider === "twitter"){
		  		user.profilePic = authData.twitter.profileImageURL;
			  	user.userName = authData.twitter.displayName;
			  	user.$save();
		  	}

		}
	}

	$scope.loginGoogle = function(){
		$scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  console.log(authData);
		  console.log(authData.google.profileImageURL);
		  $scope.userData = authData;

		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		})
	}

	$scope.loginTwitter = function(){
		console.log("twitter login dialog is here")
		$scope.authObj.$authWithOAuthPopup("twitter").then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  console.log(authData.twitter.displayName);
		  console.log(authData.twitter.profileImageURL);
		  $scope.userData = authData;
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		})
	}

	$scope.logout = function(){
		$scope.authObj.$unauth();
		$route.reload();
		console.log("user logged out");
	}



}]);
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
      var ref = new Firebase("https://thegayagenda.firebaseio.com/pins/");
      var profileRef = ref.child(username);
      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
])


.controller('loginCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', '$routeParams', 'Profile', '$location',
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, $routeParams, Profile, $location, user, Auth) {

	// var auth = $firebaseAuth(ref);
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	// $scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	$scope.users = $firebaseObject(ref,"/users/");
	$scope.authObj.$onAuth(function(authData) {
		$rootScope.authorize(authData);
		$scope.userData = authData;
		$rootScope.currentUser = authData.uid;


		// PROFILE JS CODE

		// CRU USER PIN ALSO AKA USER PROFILE
		$scope.profile = Profile($rootScope.currentUser);
		// QUERY TO GET ALL THE USER RSVPS
		$scope.currentUserRSVP = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/pins/"+$rootScope.currentUser+"/rsvps/"));
		// console.log($scope.currentUserRSVP);
		$scope.currentUserRSVP.$loaded(function() {
		    $rootScope.rsvpExists = $scope.currentUserRSVP.$value !== null;
		   // console.log($rootScope.rsvpExists);
		});
	    // QUERY TO GET ALL THE USER CHECKINS
		$scope.currentUserCheckIn = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/pins/"+$rootScope.currentUser+"/checkins/"));
	    // console.log($scope.currentUserCheckIn);
	    $scope.currentUserCheckIn.$loaded(function() {
		    $rootScope.checkinExists = $scope.currentUserCheckIn.$value !== null;
		   // console.log($rootScope.checkinExists);
		});
	    // calling $save() on the synchronized object syncs all data back to our database
	    $scope.saveProfile = function() {
	      $scope.profile.$save().then(function() {
	        alert('Profile saved!');
	      }).catch(function(error) {
	        alert('Error!');
	      });
	    };

// DETAIL.JS CODE
		// GET USER LABEL
		new Firebase("https://thegayagenda.firebaseio.com/pins/"+authData.uid).once('value', function(snap) {
			$rootScope.userpin = snap.val();
			// console.log('I fetched a user!', snap.val());
			// console.log("label for place ", $rootScope.userpin);
		});



	});

	$rootScope.authorize = function(authData){
		if (authData) {
		  	$scope.userData = authData;
		  	var user = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"+authData.uid));
		  	if (authData.provider === "google"){
			  	user.profilePic = authData.google.profileImageURL;
			  	user.userName = authData.google.displayName;
			  	user.$save();
		  	}else if (authData.provider === "twitter"){
		  		user.profilePic = authData.twitter.profileImageURL;
			  	user.userName = authData.twitter.displayName;
			  	user.$save();
		  	}

		}else {
		  	//if user not logged in
		  	// $location.path('#/home');
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
		  // $location.path('#/home');
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
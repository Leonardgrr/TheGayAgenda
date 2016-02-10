'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'loginCtrl'
  });
}])


.controller('loginCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', 
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, user, Auth) {

	// var auth = $firebaseAuth(ref);
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
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

	$scope.logout = function(){
		$scope.authObj.$unauth();
		$route.reload();
		console.log("user logged out");
	}



}]);
'use strict';

angular.module('myApp.detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/detail', {
    templateUrl: 'views/detail/detail.html',
    controller: 'detailCtrl'
  });
}])

.controller('detailCtrl', [ '$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', 
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, user, Auth) {
	// var auth = $firebaseAuth(ref);
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	$scope.checkedIn = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/checkedIn"));
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

	// This gets the data for the logged in user to CRUD
	$scope.authObj.$onAuth(function(authData) {
		$rootScope.authorize(authData);
		if (authData) {
		  	$scope.userData = authData;
		  	// for use to use with current user crud ie: edit/delete user comments
		  	$rootScope.currentUser = $scope.userData.uid;
		  	$rootScope.currentUserDataAll = $scope.userData;
		  	// $rootScope.currentUser1 = $scope.userData.uid;
		  	// console.log("current user is ", $scope.currentUser);
		  	// console.log($scope.currentUserDataAll);
		  	// console.log("current user is ", $rootScope.currentUser1);
		} 
	});


	// User Check In Function
	$scope.newCheckIn = function(){
		console.log("userId "+ $scope.userData.uid, "category "+$scope.newCategory.category, "points "+$scope.newPoints.points);
		$scope.checkedIn.$add({
			userId : $scope.userData.uid,
			category: $scope.newCategory.category,
			points: $scope.newPoints.points
		})
		// $scope.newCheckIn.userCheckIn = "";
	}







}]);

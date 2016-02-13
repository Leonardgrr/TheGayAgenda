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
	// $scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	$scope.places = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));

	//console.log($scope.places);

	var list = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.list = list;
	// console.log(list);
	
	var detailRef = new Firebase("https://thegayagenda.firebaseio.com/places/"+$routeParams.placeID);
	// grabs the slected place set as 'currentImage' for use in HTML ng-show line 64
	$scope.currentDetail = $routeParams.placeID;
	console.log($scope.currentDetail);

}]);

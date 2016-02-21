'use strict';

angular.module('myApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'views/admin/admin.html',
    controller: 'adminCtrl'
  });
}])

.controller('adminCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', "$routeParams", 
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, $routeParams, user, Auth) {
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.eventplace = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace"));

 	$scope.categories = [
		"sports",
		"family",
		"nightlife",
		"shopping",
		"restaurants",
		"volunteer",
		"safePlaces"
    ];

    $scope.areas = [
		"UpTown",
		"MidTown",
		"DownTown"
    ];

    $scope.types = [
		"place",
		"event"
    ];

    $scope.points = [
		5,
		10,
		15
    ];



	//User Check In Function
	$scope.neweventplace = function(){
		console.log("Did it add something?");
		$scope.eventplace.$add({
			category : $scope.newCategory.category,
			points : $scope.newPoints.points,
			type : $scope.newType.type,
			area : $scope.newArea.area,
			address : $scope.newAddress.address,
			venueName : $scope.newVenueName.venueName,
			contact : $scope.newContact.contact,
			hours : $scope.newHours.hours,
			about : $scope.newAbout.about,
			image : $scope.newImage.image
		})
	}

}]);

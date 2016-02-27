'use strict';

angular.module('myApp.admin', ['ngRoute','angular-cloudinary'])

.config(['$routeProvider', function($routeProvider, cloudinaryProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'views/admin/admin.html',
    controller: 'adminCtrl'
  });
}])


.controller('adminCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', "$routeParams", "cloudinary" ,
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, $routeParams, cloudinary, user, Auth) {
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.eventplace = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace"));
	$scope.admin = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/admin"));

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

	//add new event and place function
	$scope.neweventplace = function(newEvent){
		console.log("Did it add something?");
		// newImage.image
		var imageFile = newEvent.image;
		console.log(imageFile);
		cloudinary.upload(imageFile, { /* cloudinary options here */ })
			.success(function (resp) {
				$scope.imageUrl = 'http://res.cloudinary.com/dkkcd8ay6/image/upload/v1456528975/'+resp.public_id+'.'+resp.format;
				$scope.eventplace.$add({
					category : $scope.newCategory.category,
					points : $scope.newPoints.points,
					type : $scope.newType.type,
					area : $scope.newArea.area,
					address : $scope.newAddress.address,
					venueName : $scope.newVenueName.venueName,
					contact : $scope.newContact.contact,
					monday : $scope.newMonday.monday,
					tuesday : $scope.newTuesday.tuesday,
					wednesday : $scope.newWednesday.wednesday,
					thursday : $scope.newThursday.thursday,
					friday : $scope.newFriday.friday,
					saturday : $scope.newSaturday.saturday,
					sunday : $scope.newSunday.sunday,
					eventName : $scope.newEventName.eventName,
					about : $scope.newAbout.about,
					image : $scope.imageUrl
				})
			});
	}

	//add a new admin
	$scope.newAdmin = function(){
		console.log("admin added");
		$scope.admin.$add({
			admin : $scope.newAdmin.admin
		})
	}

	$scope.upload = function(newEvent){
		console.log(newEvent);
		console.log(newEvent.image);
		// $scope.imageUrl = 'http://res.cloudinary.com/dkkcd8ay6/image/upload/v1456528975/'+resp.public_id+'.'+resp.format;
	}

}]);



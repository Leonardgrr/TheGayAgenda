'use strict';

angular.module('myApp.admin', ['ngRoute','angular-cloudinary', 'ngMaterialDatePicker'])

.config(['$routeProvider', function($routeProvider, cloudinaryProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'views/admin/admin.html',
    controller: 'adminCtrl'
  });
}])


.controller('adminCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$route', "$routeParams", "cloudinary" , 
	function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $route, $routeParams, cloudinary,  user, Auth) {
	var ref = new Firebase("https://thegayagenda.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.places = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places"));
	$scope.events = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/events"));
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
	$scope.newplace = function(newPlace){
		console.log("Did it add something?");
		// newImage.image
		var imageFile = newPlace.image;
		console.log(imageFile);
		cloudinary.upload(imageFile, { /* cloudinary options here */ })
			.success(function (resp) {
				$scope.imageUrl = 'http://res.cloudinary.com/dkkcd8ay6/image/upload/v1456528975/'+resp.public_id+'.'+resp.format;
				$scope.places.$add({
					category : $scope.newplace.category,
					points : $scope.newplace.points,
					area : $scope.newplace.area,
					address : $scope.newplace.address,
					venueName : $scope.newplace.venueName,
					contact : $scope.newplace.contact,
					monday : $scope.newplace.monday,
					tuesday : $scope.newplace.tuesday,
					wednesday : $scope.newplace.wednesday,
					thursday : $scope.newplace.thursday,
					friday : $scope.newplace.friday,
					saturday : $scope.newplace.saturday,
					sunday : $scope.newplace.sunday,
					eventName : $scope.newplace.eventName,
					about : $scope.newplace.about,
					image : $scope.imageUrl
				})

				// CLEAR ALL THE FIELDS IN THE FORM 
				$scope.newplace.category = "";
				$scope.newplace.points = "";
				$scope.newplace.area = "";
				$scope.newplace.address = "";
				$scope.newplace.venueName = "";
				$scope.newplace.contact = "";
				$scope.newplace.eventName = "";
				$scope.newplace.about = "";
				$scope.newplace.image = "";
				$scope.newplace.monday = "";
				$scope.newplace.tuesday = "";
				$scope.newplace.wednesday = "";
				$scope.newplace.thursday = "";
				$scope.newplace.friday = "";
				$scope.newplace.saturday = "";
				$scope.newplace.sunday = "";
				// ALERT THE USER THE FORM HAS SUCCESSFULLY BEEN SAVED
				alert("New place has successfully been added!");
			});
	}

	//add new event function
	$scope.newevent = function(newEvent){
		console.log("new event function fired");
		// newImage.image
		var imageFile = newEvent.image;
		console.log(imageFile);
		cloudinary.upload(imageFile, { /* cloudinary options here */ })
			.success(function (resp) {
				$scope.imageUrl = 'http://res.cloudinary.com/dkkcd8ay6/image/upload/v1456528975/'+resp.public_id+'.'+resp.format;
				$scope.events.$add({
					category : $scope.newEvent.category,
					points : $scope.newEvent.points,
					area : $scope.newEvent.area,
					address : $scope.newEvent.address,
					venueName : $scope.newEvent.venueName,
					contact : $scope.newEvent.contact,
					date : $scope.newEvent.date,
					time : $scope.newEvent.time,
					eventName : $scope.newEvent.eventName,
					about : $scope.newEvent.about,
					image : $scope.imageUrl
				})
				console.log($scope.myDate);
				console.log($scope.time);
				// CLEAR ALL THE FIELDS IN THE FORM 
				$scope.newEvent.category = "";
				$scope.newEvent.points = "";
				$scope.newEvent.area = "";
				$scope.newEvent.address = "";
				$scope.newEvent.venueName = "";
				$scope.newEvent.contact = "";
				$scope.newEvent.eventName = "";
				$scope.newEvent.about = "";
				$scope.newEvent.image = "";
				$scope.newEvent.date = "";
				$scope.newEvent.time = "";
				// ALERT THE  USER THE FORM HAS SUCCESSFULLY BEEN SAVED
				alert("New event has successfully been added!");

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

	
	$scope.myDate = new Date();

}]);



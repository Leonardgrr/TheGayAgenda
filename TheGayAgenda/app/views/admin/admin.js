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
	// $scope.users = $firebaseObject(new Firebase("https://thegayagenda.firebaseio.com/users/"));
	$scope.places = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.eventplace = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/eventplace"));

	//console.log($scope.places);

	var list = $firebaseArray(new Firebase("https://thegayagenda.firebaseio.com/places/"));
	$scope.list = list;
	// console.log(list);
	
	var detailRef = new Firebase("https://thegayagenda.firebaseio.com/places/"+$routeParams.placeID);
	// grabs the slected place set as 'currentImage' for use in HTML ng-show line 64
	$scope.currentDetail = $routeParams.placeID;
	// console.log($scope.currentDetail);



	// $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
 //    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
 //    'WY').split(' ').map(function(state) {
 //        return {abbrev: state};
 //      })

 	// $scope.categories = ('sports family nightlife shopping restaurants volunteer safePlaces')
 	// .split(' ').map(function(category) {
  //       return {abbrev: category};
  //   })

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

    $scope.sizes = [
          "small (12-inch)",
          "medium (14-inch)",
          "large (16-inch)",
          "insane (42-inch)"
    ];

	$scope.test = function(){
		console.log("hello world");
	}

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


	// var nameInput = document.getElementById('testingForm');

	// document.querySelector('form.pure-form').addEventListener('submit', function (e) {
	//     //prevent the normal submission of the form
	//     e.preventDefault();
	//     console.log(nameInput.value);    
	// });

}]);

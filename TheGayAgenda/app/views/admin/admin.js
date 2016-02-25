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

	//add new event and place function
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


	$scope.uploadImage = function(imageData, incidentID) {
		console.log(imageData);
    var FR = new FileReader();
    var fb = new Firebase('https://thegayagenda.firebaseio.com/');
    FR.onload = function(e) {
    var imageString = e.target.result;

	//create URL that refers to a specific event and add images as an array-like object to hold images
	var eventReference = fb.child("events/" + incidentID);
	var syncArray = $firebaseArray(eventReference.child("images"));

      $scope.user = Auth.getUser();
      var username = $scope.user.username || '';
      var submitDate = new Date().toISOString().slice(0, 10);

      syncArray.$add({
          imageString: imageString,
          username: username,
          submitDate: submitDate
	    })
      .then(function() {
          console.log('Image has been uploaded');
      });
    };
    FR.readAsDataURL(imageData);
  };

}]);


// angular.module('app.controllers', ['firebase'])

// .controller('AppCtrl', function($scope,$firebaseArray) {
//   $scope.uploadImage = function(imageData, incidentID) {
//     var FR = new FileReader();

//     FR.onload = function(e) {
//       var imageString = e.target.result;

// 	//create URL that refers to a specific event and add images as an array-like object to hold images
//       var eventReference = fb.child(&quot;events/&quot; + incidentID);
//       var syncArray = $firebaseArray(eventReference.child(&quot;images&quot;));

//       $scope.user = Auth.getUser();
//       var username = $scope.user.username || '';
//       var submitDate = new Date().toISOString().slice(0, 10);

//       syncArray.$add({
//           imageString: imageString,
//           username: username,
//           submitDate: submitDate
// 	    })
//       .then(function() {
//           console.log('Image has been uploaded');
//       });
//     };
//     FR.readAsDataURL(imageData);
//   });

//   //...other code here...//
// });

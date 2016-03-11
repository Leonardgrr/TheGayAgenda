'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.home',
  'myApp.view2',
  'myApp.profile',
  'myApp.listing',
  'myApp.detail',
  'myApp.version',
  'myApp.admin',
  'ngMaterial',
  'ngMessages',
  'ngSanitize',
  'firebase',
  'angular-cloudinary',
  'ngMaterialDatePicker',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.config(function (cloudinaryProvider) {
  cloudinaryProvider.config({
    upload_endpoint: 'https://api.cloudinary.com/v1_1/', // default
    cloud_name: 'dkkcd8ay6', // required
    upload_preset: 'o4r47vnw', // optional
  });
})


  

.controller('homeCtrl', function ($scope, $timeout, $mdSidenav, $log) {
	$scope.toggleLeft = buildDelayedToggler('left');
	$scope.toggleRight = buildToggler('right');
	$scope.isOpenRight = function(){
	  return $mdSidenav('right').isOpen();
	};
	/**
	 * Supplies a function that will continue to operate until the
	 * time is up.
	 */
	function debounce(func, wait, context) {
	  var timer;
	  return function debounced() {
	    var context = $scope,
	        args = Array.prototype.slice.call(arguments);
	    $timeout.cancel(timer);
	    timer = $timeout(function() {
	      timer = undefined;
	      func.apply(context, args);
	    }, wait || 10);
	  };
	}
	/**
	 * Build handler to open/close a SideNav; when animation finishes
	 * report completion in console
	 */
	function buildDelayedToggler(navID) {
	  return debounce(function() {
	    $mdSidenav(navID)
	      .toggle()
	      .then(function () {
	        $log.debug("toggle " + navID + " is done");
	      });
	  }, 200);
	}
	function buildToggler(navID) {
	  return function() {
	    $mdSidenav(navID)
	      .toggle()
	      .then(function () {
	        $log.debug("toggle " + navID + " is done");
	      });
	  }
	}
	})
	.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
		$scope.close = function () {
		  $mdSidenav('left').close()
		    .then(function () {
		      $log.debug("close LEFT is done");
		    });
		};
	})
	.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
	$scope.close = function () {
	  $mdSidenav('right').close()
	    .then(function () {
	      $log.debug("close RIGHT is done");
	    });
	};
});
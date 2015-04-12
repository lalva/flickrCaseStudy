'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:TabsCtrl
 * @description
 * # TabsCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('TabsCtrl', function ($scope, $location) {
  	$scope.getLocation = function() {
  		if($location.path() === '/filter') {
  			return 1;
  		}
  		else {
  			return 0;
  		}
  	};
  	$scope.loc = $scope.getLocation();
  });

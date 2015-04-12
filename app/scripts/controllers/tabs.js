'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:TabsCtrl
 * @description
 * # TabsCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('TabsCtrl', function ($scope, $location, flickrPhotos, $state) {

      $scope.loading = true;
      flickrPhotos.recentPhotos(function() {
        $scope.loading = false;
        $state.go('filter');
        $scope.loc = 1;
      });

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

'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('MainCtrl', function ($scope, mainService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    mainService.getRecentPhotos(function(data) {
      console.log(data);
    });
  });

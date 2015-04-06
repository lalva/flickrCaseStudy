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
      mainService.getSourceUrls(data, function(res) {
        for(var i=0; i < res.length; i++)
          console.log("Photo #:" + i + res[i]);

        console.log("Successfully got " + res.length + " photos.");
      });
    });
  });

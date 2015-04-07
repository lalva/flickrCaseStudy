'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('AnalysisCtrl', function ($scope, mainService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    mainService.getRecentPhotos(function(data) {
      mainService.getSourceUrls(data, function(res) {
        var photosArray = res.splice(49, 50);
        for(var i=0; i < photosArray.length; i++)
          console.log("Photo #:" + i + photosArray[i]);

        console.log("Successfully got " + photosArray.length + " photos.");
        $scope.photos = photosArray;
      });
    });
  });

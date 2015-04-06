'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('FilterCtrl', function ($scope) {
  	var vm = this;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

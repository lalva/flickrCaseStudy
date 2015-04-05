'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('MainCtrl', function ($scope, $mdSidenav) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
  });

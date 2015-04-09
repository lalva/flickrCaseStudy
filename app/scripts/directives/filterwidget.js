'use strict';

/**
 * @ngdoc directive
 * @name flickerCaseStudyApp.directive:filterWidget
 * @description
 * # filterWidget
 */
angular.module('flickerCaseStudyApp')
  .directive('filterWidget', function () {
    return {
      templateUrl: 'views/filterWidget.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	scope.types = ['jpg', 'gif', 'png'];
      	scope.colors = ['Any Color', 'Full Color', 'Black and White', 'Transparent'];
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name flickerCaseStudyApp.directive:graph
 * @description
 * # graph
 */
angular.module('flickerCaseStudyApp')
  .directive('graph', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the graph directive');
        if (attrs) {
          //do something
        }
      }
    };
  });

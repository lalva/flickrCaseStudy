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
      scope: true,
      templateUrl: 'views/filterWidget.html',
      restrict: 'E',
      link: function link(scope) {//, element, attrs) {

        var parentScope = scope.$parent.filter;
        scope.sizes =  parentScope.sizes;
        scope.dominantColors = parentScope.dominantColors;
        scope.secondaryColors = parentScope.secondaryColors;
        scope.tags =  parentScope.tags;

        scope.updateSize = function() {
          parentScope.size = scope.sizePicked;
        };
        scope.updateDominantColor = function() {
          parentScope.dominantColorPicked = scope.dominantColorPicked;
          var arg = JSON.parse(scope.dominantColorPicked).name;
          parentScope.selectColor(arg);
        }  ;
        scope.updateSecondaryColor = function() {
          parentScope.secondaryColorPicked = scope.secondaryColorPicked;
        };
        scope.updateSearchQuery = function() {
          parentScope.searchQuery = scope.searchQuery;
          console.log('updating');
        };
        scope.updateTags = function() {
          parentScope.tagsPicked = scope.tagsSelected;
        };
      }
    };
  });

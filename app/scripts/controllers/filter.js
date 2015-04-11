'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('FilterCtrl', ['flickrPhotos', '$scope', function (flickrPhotos, $scope) {
    var self = this;
    self.photos = [];
    self.usedColors = {};

    //Defined FOR the nested filter-widget directive
    self.sizes = ['small', 'medium', 'large'];
    self.dominantColors = {};
    self.secondaryColors = {};
    self.tags = ['tag1', 'tag2'];
    //Defined BY the nested filter-widget directive
    self.size = '';
    self.dominantColorPicked = '';
    self.secondaryColorPicked = '';
    self.tagsPicked = [];
    self.searchQuery = '';
    self.selectColor = function(color) {
      flickrPhotos.filterByColor(color, true, function(filtered) {
        self.photos = filtered;
      });
    };
    flickrPhotos.recentPhotos(function(photos, colors) {
      self.photos = photos;
      self.usedColors = colors;
      for(var property in colors)
        self.dominantColors[property] = colors[property];
      $scope.$apply();
    });


  }]);

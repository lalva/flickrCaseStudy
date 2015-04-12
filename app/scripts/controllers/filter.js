'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('FilterCtrl', ['flickrPhotos', function(flickrPhotos) {
    var self = this;

    //Defined FOR the nested filter-widget directive
    self.sizes = ['None', 'Small', 'Medium', 'Large'];
    self.dominantColors = {};

    //Defined BY the nested filter-widget directive
    self.size = '';
    self.dominantColorPicked = '';
    self.secondaryColorPicked = '';
    self.tagsPicked = [];
    self.searchQuery = '';
    self.searchQueryTwo = '';

    flickrPhotos.recentPhotos(function(photos, colors, tags) {
      self.photos = photos;
      self.usedColors = colors;
      self.tags = tags;
      console.log(self.tags);
      for(var property in colors) {
        self.dominantColors[property] = colors[property];
      }
    });

    self.selectColor = function(color) {
      flickrPhotos.filterByColor(color, true, function(filtered) {
        self.photos = filtered;
      });
    };


  }]);

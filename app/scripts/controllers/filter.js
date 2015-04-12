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

    flickrPhotos.recentPhotos(function(photos, colors, tags) {
      self.photos = photos;
      self.usedColors = colors;
      self.tags = tags;
      for(var property in colors) {
        self.dominantColors[property] = colors[property];
      }
    });

    self.selectColor = function(color) {
      var add = true;
      if (color === 'None') {
        add = false;
      }
      flickrPhotos.filterByColor(color, add, function(filtered) {
        self.photos = filtered;
      });
    };

    self.selectTag = function(tag) {
      var add = true;
      if (tag === 'None') {
        add = false;
      }
      flickrPhotos.filterByTag(tag, add, function(filtered) {
        self.photos = filtered;
      });
    };

    self.selectSize = function(size) {
      var add = true;
      if (size === 'None') {
        add = false;
      }
      flickrPhotos.filterBySize(size, add, function(filtered) {
        self.photos = filtered;
      });
    }


  }]);

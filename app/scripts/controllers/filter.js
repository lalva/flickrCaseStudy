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

    self.selectColor = function(color) {
      flickrPhotos.filterByColor(color, true, function(filtered) {
        self.photos = filtered;
      });
    };

    flickrPhotos.recentPhotos(function(photos, colors) {
      self.photos = photos;
      self.usedColors = colors;
      $scope.$apply();
    });
  }]);

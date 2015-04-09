'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('AnalysisCtrl', ['flickrPhotos', 'colorService', function (flickrPhotos, colorService) {
    var self = this;
    self.colors = colorService.getColors();
    self.photos = [];
    self.usedColors = {};

    flickrPhotos.recentPhotos(function(photos, colors) {
      self.photos = photos;
      self.usedColors = colors;
    });
  }]);

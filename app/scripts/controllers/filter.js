'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('FilterCtrl', ['flickrPhotos', function (flickrPhotos) {
    var self = this;
    self.photos = flickrPhotos.recentPhotos();
  }]);

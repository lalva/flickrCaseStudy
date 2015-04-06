'use strict';

/**
 * @ngdoc service
 * @name flickerCaseStudyApp.mainService.js
 * @description
 * # mainService.js
 * Service in the flickerCaseStudyApp.
 */
angular.module('flickerCaseStudyApp')
  .service('mainService', function ($http) {

  	this.getRecentPhotos = function(callback) {
  		var key = 'fdbfc2d5c7d44266e23400351774b323';
	    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + key;
	    $http.get(url).
		  success(function(data, status, headers, config) {
		  	callback(data);
		  }).
		  error(function(data, status, headers, config) {
		  	callback("Error" + status);
		  });
	}
  });

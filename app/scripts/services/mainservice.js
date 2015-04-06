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
  		var apiKey = 'fdbfc2d5c7d44266e23400351774b323';
	    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + apiKey;
	    var response = undefined;
	    $http.get(url).
		  success(function(data, status, headers, config) {
		  	response = data.rsp.photos.photo;
		  	callback(response);
		  }).
		  error(function(data, status, headers, config) {
		  	callback("Error" + status);
		  });
	}
	this.getSourceUrls = function(photo, callback) {
		https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
		var urls = [];
		var baseUrl = "https://farm";
		var format = ".jpg";
		for(var i=0; i < photo.length; i++) 
			urls[i] = baseUrl + photo[i]._farm + '.staticflickr.com/' + photo[i]._server + '/' + photo[i]._id + '_' + photo[i]._secret + format;
		callback(urls);
	}
  });

'use strict';

/**
 * @ngdoc service
 * @name flickerCaseStudyApp.FlickrPhotos
 * @description
 * # FlickrPhotos
 * Service in the flickerCaseStudyApp.
 */
angular.module('flickerCaseStudyApp')
  .service('flickrPhotos', ['$http', function ($http) {
    var photos = [];
    var filters = [];
    var filtered = [];

    var apiKey = '4460bb9ae847021d54cbe009c74c7534';
    var apiExtras = 'url_t,url_o,tags,description,media';
    var apiPerPage = 50;

    var init = function(callback) {
      photos = [];
      filters = false;
      filtered = [];

      getRecentPhotos(function(recentPhotos) {
        processPhotos(function(){
          for (var i=0;i<recentPhotos.length;i++) {
            var getColors = function(j) {
              RGBaster.colors(recentPhotos[j].url_t, {
                success: function (payload) {
                  recentPhotos[j].colors = payload;
                }
              });
            }
            getColors(i);
          }
          callback(photos);
        });
      });
    };

    var getRecentPhotos = function(callback) {
      $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key='+apiKey+'&extras='+apiExtras+'&format=json&nojsoncallback=1&per_page='+apiPerPage)
      .success(function(data, status, headers, config) {
        if (data.photos && Array.isArray(data.photos.photo)) {
          photos = data.photos.photo;
        }
        
        callback(photos);
      })
      .error(function(data, status, headers, config) {
        callback('Error ' + status);
      });
    };

    var processPhotos = function(callback) {
      callback();
    };

    init(function(){
      
    });
    return {
      reset: function(callback) {
        init(callback);
      },
      recentPhotos: function(callback) {
        console.log(photos);
        return photos;
      }
    };
  }]);

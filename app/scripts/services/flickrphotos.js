'use strict';

/**
 * @ngdoc service
 * @name flickerCaseStudyApp.FlickrPhotos
 * @description
 * # FlickrPhotos
 * Service in the flickerCaseStudyApp.
 */
angular.module('flickerCaseStudyApp')
  .service('flickrPhotos', ['$http', 'colorService', function ($http, colorService) {
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
                exclude: [
                  'rgb(255,255,255)',
                  'rgb(0,0,0)'
                ],
                success: function (payload) {
                  var rgb = payload.dominant.match(/rgb\((\d+),(\d+),(\d+)\)/);
                  var r = rgb[1] / 255, g = rgb[2] / 255, b = rgb[3] / 255;

                  var max = Math.max.apply(Math, [r,g,b]);
                  var min = Math.min.apply(Math, [r,g,b]);

                  var chr = max-min;
                  var hue = 0;
                  var val = max;
                  var sat = 0;

                  if (val > 0) {
                    sat = chr/val;
                    if (sat > 0) {
                      if (r === max) { 
                        hue = 60*(((g-min)-(b-min))/chr);
                        if (hue < 0) {
                          hue += 360;
                        }
                      } else if (g === max) { 
                        hue = 120+60*(((b-min)-(r-min))/chr); 
                      } else if (b === max) { 
                        hue = 240+60*(((r-min)-(g-min))/chr); 
                      }
                    }
                  }
                  payload.r = rgb[1];
                  payload.g = rgb[2];
                  payload.b = rgb[3];
                  payload.h = Math.round(hue);
                  payload.s = sat;
                  payload.l = val;
                  var reducedHue = Math.round(payload.h / 60) * 60;
                  var reducedSat = 0;
                  var reducedVal = 0;
                  if (reducedHue === 360) {
                    reducedHue = 0;
                  }
                  if (reducedHue === 0) {
                    if (val * 100 < 60) {
                      reducedVal = 0.5;
                    } else if (val * 100 < 80) {
                      reducedVal = 0.75;
                    } else {
                      reducedVal = 1;
                    }
                  } else {
                    reducedSat = 1;
                  }
                  if (reducedSat === 1) {
                    reducedVal = val*100;
                    if (reducedVal < 75) {
                      reducedVal = .5;
                    } else {
                      reducedVal = 1;
                    }
                  }
                  payload.reduced = {
                    h: reducedHue,
                    s: reducedSat,
                    l: reducedVal
                  }
                  var color = colorService.findByHSL(reducedHue, reducedSat, reducedVal);
                  if (!color)
                    console.log(reducedHue, reducedSat, reducedVal);
                  recentPhotos[j].color = color;
                  recentPhotos[j].colors = payload;
                  
                }
              });
            };
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
        if (photos.length === 0) {
          init(callback);
        } else {
          callback(photos);
        }
      }
    };
  }]);

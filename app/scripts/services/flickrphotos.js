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
    var filters = {};
    var filtered = [];
    var callbacks = [];
    var inProgress = false;
    var usedColors = {};
    var loadingTimeout = null;

    var apiKey = '4460bb9ae847021d54cbe009c74c7534';
    var apiExtras = 'url_t,url_o,tags,description,media';
    var apiPerPage = 50;

    var init = function(callback) {
      if (inProgress) {
        callbacks.push(callback);
        return;
      }
      inProgress = true;
      photos = [];
      filters = {};
      filtered = [];
      usedColors = {};
      callbacks = [callback];
      initUsedColors();

      getRecentPhotos();
    };

    var finishLoading = function() {
      for (var j = 0; j < callbacks.length; j++) {
        callbacks[j](photos, usedColors);
      }
      inProgress = false;
      callbacks = [];
    };

    var initUsedColors = function() {
      var colors = colorService.getColors();
      var keys = Object.keys(colors);
      for(var i = 0; i < keys.length; i++) {
        usedColors[keys[i]] = {
          name: keys[i],
          hex: colors[keys[i]].hex,
          count: 0
        };
      }
    };

    var getRecentPhotos = function() {
      var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key='+apiKey+'&extras='+apiExtras+'&format=json&nojsoncallback=1&per_page='+apiPerPage;
      $http.get(url)
      .success(function(data) {
        if (data.photos && Array.isArray(data.photos.photo)) {
          photos = data.photos.photo;
          processPhotos();
        } else {
          console.log('Error no photo data');
        }
      })
      .error(function(data, status) {
        console.log('Error ',status,data);
      });
    };

    var processPhotos = function() {
      for (var i=0;i<photos.length;i++) {
        if (!photos[i].colors) {
          processPhoto(i);
        }
      }
    };

    var processPhoto = function(i) {
      var url = photos[i].url_t; // jshint ignore:line
      RGBaster.colors(url, {
        paletteSize: 64,
        success: function (payload) {
          if (loadingTimeout) {
            window.clearTimeout(loadingTimeout);
          }
          loadingTimeout = window.setTimeout(finishLoading, 300);
          processColors(i, payload);
          
        }
      });
    };

    var processColors = function(j, payload) {
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
          reducedVal = 0.5;
        } else {
          reducedVal = 1;
        }
      }
      payload.reduced = {
        h: reducedHue,
        s: reducedSat,
        l: reducedVal
      };
      var color = colorService.findByHSL(reducedHue, reducedSat, reducedVal);
      if (!color) {
        console.log(reducedHue, reducedSat, reducedVal);
      } else {
        usedColors[color.name].count += 1;
        photos[j].color = color;
        photos[j].colors = payload;
      }
    };

    var applyFilters = function(callback) {
      filtered = [];
      var keys = Object.keys(filters);
      for (var j = 0; j < photos.length; j++) {
        for (var i = 0; i < keys.length; i++) {
          var filter = filters[keys[i]];
          switch(keys[i]) {
            case 'color':
              if (photos[j].color && photos[j].color.name === filter) {
                filtered.push(photos[j]);
              }
              break;
            case 'query':
              if (photos[j].description && photos[j].description._content && photos[j].description._content.indexOf(filter) !== -1) {
                filtered.push(photos[j]);
              }
              if (photos[j].title && photos[j].title.indexOf(filter) !== -1) {
                filtered.push(photos[j]);
              }
              /* falls through */
            case 'tags':
              if (photos[j].tags && photos[j].tags.indexOf(filter) !== -1) {
                filtered.push(photos[j]);
              }
              break;
            default:
              console.log(keys[i]+' not in switch statement.');
              break;
          }
        }
      }
      callback(filtered);
    };

    return {
      reset: function(callback) {
        init(callback);
      },
      recentPhotos: function(callback) {
        if (photos.length === 0) {
          init(callback);
        } else {
          callback(photos, usedColors);
        }
      },
      searchPhotos: function(query, callback) {
        //api for search photos
        callback(query);
      },
      filterByColor: function(color, add, callback) {
        // if (filters.color) {
        //   filtered = [];
        // }
        // filters.color = color;
        // for (var i = 0; i < photos.length; i++) {
        //   if (photos[i].color && photos[i].color.name === color) {
        //     filtered.push(photos[i]);
        //   }
        // }
        // callback(filtered);
        if (add) {
          filters.color = color;
        } else {
          delete filters.color;
        }
        applyFilters(callback);
      },
      filterByTag: function(tag, add, callback) {
        if (add) {
          if (!Array.isArray(filters.tag)) {
            filters.tags = [];
          }
          filters.tags.push(tag);
        } else {
          delete filters.tag;
        }
        applyFilters(callback);
      },
      filterByQuery: function(query, add, callback) {
        if (add) {
          filters.query = query;
        } else {
          delete filters.query;
        }
        applyFilters(callback);
      }
    };
  }]);

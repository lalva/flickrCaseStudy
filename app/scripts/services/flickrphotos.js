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
    var tags = [];
    var tagz = {};

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
      tags = [];
      tagz = {};
      callbacks = [callback];
      initUsedColors();

      getRecentPhotos();
    };

    var finishLoading = function() {
      for (var i = 0; i < photos.length; i++) {
        if (!photos[i].colors) {
          photos.splice(i, 1);
        } else {
          var photoTags = photos[i].tags.split(' ');
          photos[i].tags = [];
          for (var k = 0; k < photoTags.length; k++) {
            var tag = photoTags[k].toLowerCase();
            if (tag.indexOf(':') === -1 && tag !== '') {
              if (!tagz[tag]) {
                tagz[tag] = 0;
              }
              tagz[tag] += 1;
              photos[i].tags.push(tag);
            }
          }
        }
      }
      var keys = Object.keys(tagz);
      for (var n = 0; n < keys.length; n++) {
        if (tagz[keys[n]] > 1) {
          tags.push(keys[n]);
        }
      }
      for (var j = 0; j < callbacks.length; j++) {
        callbacks[j](photos, usedColors, tags);
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
        paletteSize: 256,
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
      var rgbSecondary = payload.secondary.match(/rgb\((\d+),(\d+),(\d+)\)/);
      rgb.splice(0, 1);
      rgbSecondary.splice(0, 1);
      var color = colorService.findClosestColor(rgb);
      var colorSecondary = colorService.findClosestColor(rgbSecondary);
      usedColors[color.name].count += 1;
      if (color !== colorSecondary) {
        usedColors[colorSecondary.name].count += 1;
      }
      photos[j].color = color;
      photos[j].colorSecondary = colorSecondary;
      photos[j].colors = payload;
    };

    var applyFilters = function(callback) {
      filtered = [];
      var keys = Object.keys(filters);
      for (var j = 0; j < photos.length; j++) {
        for (var i = 0; i < keys.length; i++) {
          var filter = filters[keys[i]];
          switch(keys[i]) {
            case 'color':
              if ((photos[j].color && photos[j].color.name === filter) || (photos[j].colorSecondary && photos[j].colorSecondary.name === filter)) {
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
            case 'size':
              var max = Math.max(photos[j].width_o, photos[j].height_o); // jshint ignore:line
              if (filter === 'Large') {
                if (max >= 1080) {
                  filtered.push(photos[j]);
                }
              } else if (filter === 'Small') {
                if (max <= 720) {
                  filtered.push(photos[j]);
                }
              } else {
                if (max < 1080 && max > 720) {
                  filtered.push(photos[j]);
                }
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
          delete filters.tags;
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
      },
      filterBySize: function(size, add, callback) {
        if (add) {
          filters.size = size;
        } else {
          delete filters.size;
        }
        applyFilters(callback);
      }
    };
  }]);

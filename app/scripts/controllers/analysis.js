'use strict';

/**
 * @ngdoc function
 * @name flickerCaseStudyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flickerCaseStudyApp
 */
angular.module('flickerCaseStudyApp')
  .controller('AnalysisCtrl', ['$scope', 'flickrPhotos', 'colorService', function ($scope, flickrPhotos, colorService) {
    var self = this;
    self.colors = colorService.getColors();
    self.photos = [];
    self.usedColors = {};
    self.graphData = [];

    var processData = function() {
      self.graphData = [];
      for(var i=0; i < self.photos.length; i++) {
        var photo = self.photos[i];
        if (photo.colors) {
          var dominant = photo.colors.dominant;
          var color = photo.color.name;
          self.graphData.push([color, dominant, 1, 1]);
        }
      }
    };

    var drawBPGraph = function() {
      var width = 1100, height = 1200, margin ={b:0, t:40, l:170, r:50};
      var svg = d3.select(".analysis-container")
        .append("svg").attr('width',width).attr('height',(height+margin.b+margin.t))
        .append("g").attr("transform","translate("+ margin.l+","+margin.t+")");
      var data = [ 
        {data:bP.partData(self.graphData,2), id:'ColorSeparation', header:["Reduced Color","Dominant Color", "Color Separation"]}
      ];
      bP.draw(data, svg);
    }

    flickrPhotos.recentPhotos(function(photos, colors) {
      self.photos = photos;
      self.usedColors = colors;
      processData();
      drawBPGraph();
    });
  }]);

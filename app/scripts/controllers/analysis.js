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
          self.graphData.push([color, dominant, 1, 5]);
        }
      }
    };

    var drawBPGraph = function() {
      var width = 1100, height = 1200, margin ={b:0, t:40, l:170, r:50};
      var svg = d3.select(".analysis-container")
        .append("svg").attr('width',width).attr('height',(height+margin.b+margin.t))
        .append("g").attr("transform","translate("+ margin.l+","+margin.t+")");
      var data = [ 
        {data:bP.partData(self.graphData,2), id:'ColorSeparation', header:["Reduced","Dominant", "Color Separation"]}
      ];
      bP.draw(data, svg);
    }
    var tags = [];
    var getWordCloudData = function() {
      var photoTags = flickrPhotos.getTags();
      var keys = Object.keys(photoTags);
      for(var k=0; k < keys.length; k++) {
        for(var l=0; l < photoTags[keys[k]]; l++) {
          tags.push(keys[k]);
        }
      }
    }
    var drawWordCloud = function() {
      var fill = d3.scale.category20();
      d3.layout.cloud().size([300, 300])
          .words(tags.map(function(d) {
            return {text: d, size: 10 + Math.random() * 90};
          }))
          .padding(5)
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .fontSize(function(d) { return d.size; })
          .on("end", draw)
          .start();
      function draw(words) {
        d3.select("#drawingArea").append("svg")
            .attr("width", 300)
            .attr("height", 300)
          .append("g")
            .attr("transform", "translate(150,150)")
          .selectAll("text")
            .data(words)
          .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
      }
  }

    flickrPhotos.recentPhotos(function(photos, colors) {
      self.photos = photos;
      self.usedColors = colors;
      processData();
      drawBPGraph();
      getWordCloudData();
      drawWordCloud();
    });



  }]);

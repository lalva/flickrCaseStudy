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

    flickrPhotos.recentPhotos(function(photos, colors) {
      self.photos = photos;
      self.usedColors = colors;
    });


    console.log(self.photos);

    var tags = ['one', 'two'];


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

    
  }]);

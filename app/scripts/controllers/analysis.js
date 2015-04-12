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
      // $scope.$apply();
    });


    console.log(self.photos);

    var graphData = [];
    for(var i=0; i < self.photos.length; i++) {

      if(self.photos[i].colors != undefined) {
        var colorData = self.photos[i].colors;
        var reducedColor = self.photos[i].colors.reduced;
      }

      // var param1 = colorData.h + colorData.l + colorData.s;
      // var param2 = reducedColor.h + reducedColor.l + reducedColor.s;
      // var param3 = colorData.b;

      // console.log(param1);
      // console.log(param2);
      // console.log(param3);

      // graphData.push( [param1, param2, param3] );
    }
    var sales_data = angular.copy(graphData);
    console.log(sales_data);


    var sales_data = [
      ['Black', '2', '15'],
      ['White', '3', '16']
    ];

    var width = 1100, height = 610, margin ={b:0, t:40, l:170, r:50};

    var svg = d3.select("body")
      .append("svg").attr('width',width).attr('height',(height+margin.b+margin.t))
      .append("g").attr("transform","translate("+ margin.l+","+margin.t+")");

    var data = [ 
      {data:bP.partData(sales_data,2), id:'SalesAttempts', header:["Color","Derived", "Analysis 1"]},
      {data:bP.partData(sales_data,3), id:'Sales', header:["Color","Derived", "Analysis 2"]}
    ];

    bP.draw(data, svg);

  }]);

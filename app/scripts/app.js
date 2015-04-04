'use strict';

/**
 * @ngdoc overview
 * @name flickerCaseStudyApp
 * @description
 * # flickerCaseStudyApp
 *
 * Main module of the application.
 */
angular
  .module('flickerCaseStudyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/analysis', {
        templateUrl: 'views/analysis.html',
        controller: 'AnalysisCtrl'
      })
      .when('/filter', {
        templateUrl: 'views/filter.html',
        controller: 'FilterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

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
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('splash', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('analysis', {
        url: '/analysis',
        templateUrl: 'views/analysis.html',
        controller: 'AnalysisCtrl'
      })
      .state('filter', {
        url: '/filter',
        templateUrl: 'views/filter.html',
        controller: 'FilterCtrl'
      });
  });

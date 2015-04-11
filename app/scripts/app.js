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
    'ngMaterial',
    'xml'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
    $stateProvider
      .state('splash', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as main'
      })
      .state('analysis', {
        url: '/analysis',
        templateUrl: 'views/analysis.html',
        controller: 'AnalysisCtrl as analysis'
      })
      .state('filter', {
        url: '/filter',
        templateUrl: 'views/filter.html',
        controller: 'FilterCtrl as filter'
      });
    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);
  });

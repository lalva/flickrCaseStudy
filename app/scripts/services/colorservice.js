'use strict';

/**
 * @ngdoc service
 * @name flickerCaseStudyApp.colorService
 * @description
 * # colorService
 * Service in the flickerCaseStudyApp.
 */
angular.module('flickerCaseStudyApp')
  .service('colorService', function Colorservice() {
    var colors = {
      black: {
        name: 'black',
        hex: '#000000',
        r: 0,
        g: 0,
        b: 0,
        h: 0,
        s: 0,
        l: 0
      },
      white: {
        name: 'white',
        hex: '#FFFFFF',
        r: 255,
        g: 255,
        b: 255,
        h: 0,
        s: 0,
        l: 1
      },
      red: {
        name: 'red',
        hex: '#FF0000',
        r: 255,
        g: 0,
        b: 0,
        h: 0,
        s: 1,
        l: 1
      },
      lime: {
        name: 'lime',
        hex: '#00FF00',
        r: 0,
        g: 255,
        b: 0,
        h: 120,
        s: 1,
        l: 1
      },
      blue: {
        name: 'blue',
        hex: '#0000FF',
        r: 0,
        g: 0,
        b: 255,
        h: 240,
        s: 1,
        l: 1
      },
      yellow: {
        name: 'yellow',
        hex: '#FFFF00',
        r: 255,
        g: 255,
        b: 0,
        h: 60,
        s: 1,
        l: 1
      },
      cyan: {
        name: 'cyan',
        hex: '#00FFFF',
        r: 0,
        g: 255,
        b: 255,
        h: 180,
        s: 1,
        l: 1
      },
      magenta: {
        name: 'magenta',
        hex: '#FF00FF',
        r: 255,
        g: 0,
        b: 255,
        h: 300,
        s: 1,
        l: 1
      },
      silver: {
        name: 'silver',
        hex: '#C0C0C0',
        r: 192,
        g: 192,
        b: 192,
        h: 0,
        s: 0,
        l: 0.75
      },
      gray: {
        name: 'gray',
        hex: '#808080',
        r: 128,
        g: 128,
        b: 128,
        h: 0,
        s: 0,
        l: 0.5
      },
      maroon: {
        name: 'maroon',
        hex: '#800000',
        r: 128,
        g: 0,
        b: 0,
        h: 0,
        s: 1,
        l: 0.5
      },
      olive: {
        name: 'olive',
        hex: '#808000',
        r: 128,
        g: 128,
        b: 0,
        h: 60,
        s: 1,
        l: 0.5
      },
      green: {
        name: 'green',
        hex: '#008000',
        r: 0,
        g: 128,
        b: 0,
        h: 120,
        s: 1,
        l: 0.5
      },
      purple: {
        name: 'purple',
        hex: '#800080',
        r: 128,
        g: 0,
        b: 128,
        h: 300,
        s: 1,
        l: 0.5
      },
      teal: {
        name: 'teal',
        hex: '#008080',
        r: 0,
        g: 128,
        b: 128,
        h: 180,
        s: 1,
        l: 0.5
      },
      navy: {
        name: 'navy',
        hex: '#000080',
        r: 0,
        g: 0,
        b: 128,
        h: 240,
        s: 1,
        l: 0.5
      }
    };
    return {
      findByHex: function(hex) {
        var keys = Object.keys(colors);
        for (var i = 0; i < keys.length; i++) {
          if (colors[keys[i]].hex === hex) {
            return colors[keys[i]];
          }
        }
        return false;
      },
      findByRGB: function(r, g, b) {
        var keys = Object.keys(colors);
        for (var i = 0; i < keys.length; i++) {
          var c = colors[keys[i]];
          if (c.r === r && c.g === g && c.b === b) {
            return c;
          }
        }
        return false;
      },
      findByHSL: function(h, s, l) {
        var keys = Object.keys(colors);
        for (var i = 0; i < keys.length; i++) {
          var c = colors[keys[i]];
          if (c.h === h && c.s === s && c.l === l) {
            return c;
          }
        }
        return false;
      },
      findByName: function(name) {
        return colors[name];
      },
      getColors: function() {
        return colors;
      }
    };
  });

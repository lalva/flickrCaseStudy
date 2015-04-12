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
    var rgbToXyz = function(rgb) {
      var _r = (rgb[0] / 255);
      var _g = (rgb[1] / 255);
      var _b = (rgb[2] / 255);

      if (_r > 0.04045) {
        _r = Math.pow(((_r + 0.055) / 1.055), 2.4);
      } else {
        _r = _r / 12.92;
      }

      if (_g > 0.04045) {
        _g = Math.pow(((_g + 0.055) / 1.055), 2.4);
      } else {                 
        _g = _g / 12.92;
      }

      if (_b > 0.04045) {
        _b = Math.pow(((_b + 0.055) / 1.055), 2.4);
      } else {
        _b = _b / 12.92;
      }

      _r = _r * 100;
      _g = _g * 100;
      _b = _b * 100;

      var X = _r * 0.4124 + _g * 0.3576 + _b * 0.1805;
      var Y = _r * 0.2126 + _g * 0.7152 + _b * 0.0722;
      var Z = _r * 0.0193 + _g * 0.1192 + _b * 0.9505;

      return [X, Y, Z];
    };

    var xyzToLab = function(xyz) {
      var refX =  95.047;
      var refY = 100.000;
      var refZ = 108.883;

      var _X = xyz[0] / refX;
      var _Y = xyz[1] / refY;
      var _Z = xyz[2] / refZ;

      if (_X > 0.008856) {
        _X = Math.pow(_X, (1/3));
      } else {
        _X = (7.787 * _X) + (16 / 116);
      }

      if (_Y > 0.008856) {
        _Y = Math.pow(_Y, (1/3));
      } else {
        _Y = (7.787 * _Y) + (16 / 116);
      }

      if (_Z > 0.008856) {
        _Z = Math.pow(_Z, (1/3));
      } else { 
        _Z = (7.787 * _Z) + (16 / 116);
      }

      var CIEL = (116 * _Y) - 16;
      var CIEa = 500 * (_X - _Y);
      var CIEb = 200 * (_Y - _Z);

      return [CIEL, CIEa, CIEb];
    };

    var cie1994 = function(x, y, isTextiles) {
      var _x = {l: x[0], a: x[1], b: x[2]};
      var _y = {l: y[0], a: y[1], b: y[2]};
      var k2;
      var k1;
      var kl;
      var kh = 1;
      var kc = 1;
      if (isTextiles) {
        k2 = 0.014;
        k1 = 0.048;
        kl = 2;
      } else {
        k2 = 0.015;
        k1 = 0.045;
        kl = 1;
      }

      var c1 = Math.sqrt(_x.a * _x.a + _x.b * _x.b);
      var c2 = Math.sqrt(_y.a * _y.a + _y.b * _y.b);

      var sh = 1 + k2 * c1;
      var sc = 1 + k1 * c1;
      var sl = 1;

      var da = _x.a - _y.a;
      var db = _x.b - _y.b;
      var dc = c1 - c2;

      var dl = _x.l - _y.l;
      var dh = Math.sqrt(da * da + db * db - dc * dc);

      return Math.sqrt(Math.pow((dl/(kl * sl)),2) + Math.pow((dc/(kc * sc)),2) + Math.pow((dh/(kh * sh)),2));
    };



    var colors = {
      'black': {
        'name': 'black',
        'hex': '#000000',
        'hsv': [
          0,
          0,
          0
        ],
        'rgb': [
          0,
          0,
          0
        ],
        'lab': [
          0,
          0,
          0
        ]
      },
      'white': {
        'name': 'white',
        'hex': '#FFFFFF',
        'hsv': [
          0,
          0,
          1
        ],
        'rgb': [
          255,
          255,
          255
        ],
        'lab': [
          100,
          0.0052604999583039,
          -0.010408184525268
        ]
      },
      'red': {
        'name': 'red',
        'hex': '#FF0000',
        'hsv': [
          0,
          1,
          1
        ],
        'rgb': [
          255,
          0,
          0
        ],
        'lab': [
          53.232881785842,
          80.109309529822,
          67.220068310264
        ]
      },
      'lime': {
        'name': 'lime',
        'hex': '#00FF00',
        'hsv': [
          120,
          1,
          1
        ],
        'rgb': [
          0,
          0,
          255
        ],
        'lab': [
          32.302586667249,
          79.196661789309,
          -107.86368104495
        ]
      },
      'blue': {
        'name': 'blue',
        'hex': '#0000FF',
        'hsv': [
          240,
          1,
          1
        ],
        'rgb': [
          0,
          255,
          0
        ],
        'lab': [
          87.737033473544,
          -86.184636497625,
          83.181164747779
        ]
      },
      'yellow': {
        'name': 'yellow',
        'hex': '#FFFF00',
        'hsv': [
          60,
          1,
          1
        ],
        'rgb': [
          255,
          0,
          255
        ],
        'lab': [
          60.319933664076,
          98.254218686161,
          -60.842984223862
        ]
      },
      'cyan': {
        'name': 'cyan',
        'hex': '#00FFFF',
        'hsv': [
          180,
          1,
          1
        ],
        'rgb': [
          0,
          255,
          255
        ],
        'lab': [
          91.116521109463,
          -48.079618466229,
          -14.138127754846
        ]
      },
      'magenta': {
        'name': 'magenta',
        'hex': '#FF00FF',
        'hsv': [
          300,
          1,
          1
        ],
        'rgb': [
          255,
          255,
          0
        ],
        'lab': [
          97.138246981297,
          -21.555908334832,
          94.482485446445
        ]
      },
      'silver': {
        'name': 'silver',
        'hex': '#C0C0C0',
        'hsv': [
          0,
          0,
          0.75
        ],
        'rgb': [
          192,
          192,
          192
        ],
        'lab': [
          77.704363589953,
          0.0042494120755521,
          -0.0084076923023257
        ]
      },
      'gray': {
        'name': 'gray',
        'hex': '#808080',
        'hsv': [
          0,
          0,
          0.5
        ],
        'rgb': [
          128,
          128,
          128
        ],
        'lab': [
          53.585013452169,
          0.0031556203479721,
          -0.0062435660362459
        ]
      },
      'maroon': {
        'name': 'maroon',
        'hex': '#800000',
        'hsv': [
          0,
          1,
          0.5
        ],
        'rgb': [
          128,
          0,
          0
        ],
        'lab': [
          25.530784572416,
          48.055236045488,
          38.059632583495
        ]
      },
      'olive': {
        'name': 'olive',
        'hex': '#808000',
        'hsv': [
          60,
          1,
          0.5
        ],
        'rgb': [
          128,
          0,
          128
        ],
        'lab': [
          29.782100092098,
          58.939837319042,
          -36.497929962824
        ]
      },
      'green': {
        'name': 'green',
        'hex': '#008000',
        'hsv': [
          120,
          1,
          0.5
        ],
        'rgb': [
          0,
          0,
          128
        ],
        'lab': [
          12.975311577717,
          47.507765310138,
          -64.704273245805
        ]
      },
      'purple': {
        'name': 'purple',
        'hex': '#800080',
        'hsv': [
          300,
          1,
          0.5
        ],
        'rgb': [
          128,
          128,
          0
        ],
        'lab': [
          51.868331363348,
          -12.930760098733,
          56.677284661941
        ]
      },
      'teal': {
        'name': 'teal',
        'hex': '#008080',
        'hsv': [
          180,
          1,
          0.5
        ],
        'rgb': [
          0,
          128,
          128
        ],
        'lab': [
          48.256073813376,
          -28.841559463342,
          -8.4810500862884
        ]
      },
      'navy': {
        'name': 'navy',
        'hex': '#000080',
        'hsv': [
          240,
          1,
          0.5
        ],
        'rgb': [
          0,
          128,
          0
        ],
        'lab': [
          46.228817842627,
          -51.699647328082,
          49.897952309838
        ]
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
      findByName: function(name) {
        return colors[name];
      },
      findClosestColor: function(rgb) {
        var lab = xyzToLab(rgbToXyz(rgb));
        var keys = Object.keys(colors);
        var closestColor = false;
        var closestVal = false;
        for (var i = 0; i < keys.length; i++) {
          var color = colors[keys[i]];
          var val = cie1994(color.lab, lab);
          if (!closestColor || closestVal > val) {
            closestVal = val;
            closestColor = color;
          }
        }
        return closestColor;
      },
      getColors: function() {
        return colors;
      }
    };
  });

'use strict';

describe('Service: mainService.js', function () {

  // load the service's module
  beforeEach(module('flickerCaseStudyApp'));

  // instantiate service
  var mainService.js;
  beforeEach(inject(function (_mainService.js_) {
    mainService.js = _mainService.js_;
  }));

  it('should do something', function () {
    expect(!!mainService.js).toBe(true);
  });

});

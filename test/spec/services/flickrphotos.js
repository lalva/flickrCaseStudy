'use strict';

describe('Service: FlickrPhotos', function () {

  // load the service's module
  beforeEach(module('flickerCaseStudyApp'));

  // instantiate service
  var FlickrPhotos;
  beforeEach(inject(function (_FlickrPhotos_) {
    FlickrPhotos = _FlickrPhotos_;
  }));

  it('should do something', function () {
    expect(!!FlickrPhotos).toBe(true);
  });

});

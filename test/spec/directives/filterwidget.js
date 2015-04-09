'use strict';

describe('Directive: filterWidget', function () {

  // load the directive's module
  beforeEach(module('flickerCaseStudyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<filter-widget></filter-widget>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the filterWidget directive');
  }));
});

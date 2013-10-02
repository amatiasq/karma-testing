define(function(require) {
	var assert = require('chai').assert;
	var sinon = require('sinon');

	// SUT
	require('back');

	describe('Back directive', function() {
		beforeEach(module('sui'));

		it('should invoke window back', inject(function($window, $compile, $rootScope) {
			var mock = sinon.mock($window.history);
			mock.expects('back').once();

			var link = $compile('<button sui-back>Back</button>');
			var element = link($rootScope);
			element.click();

			mock.verify();
		}));
	});
});

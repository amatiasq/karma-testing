define(function(require) {
	'use strict';
	var sinon = require('sinon');
	var utils = require('utils');

	describe('Deprecated utility', function() {

		it('should display a warning when invoked', function() {
			var mock = sinon.mock(console);
			mock.expects('warn').atLeast(1);
			utils.deprecated('LOL');
			mock.verify();
		});
	});
});

define(function(require) {
	'use strict';
	var assert = require('chai').assert;

	// SUT
	require('localize');

	describe('Location module', function() {
		beforeEach(module('sui-location'));

		describe('localize service', function() {

			describe('getLocalizedString method', function() {

				it('should return an value of a key added with addToDictionary', inject(function(localize) {
					localize.addToDictionary([
						{ key: 'test', value: 'testing' },
						{ key: 'unit', value: 'tdd' },
					]);

					assert.equal(localize.getLocalizedString('test'), 'testing');
					assert.equal(localize.getLocalizedString('unit'), 'tdd');
				}));

				// TODO
			});

			// TODO
		});

		describe('translate directive', function() {

			// TODO
			it('should ');
		});
	});
});

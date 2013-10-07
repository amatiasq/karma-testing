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

				it('should return the input string if it\'s not found on the dictionary', inject(function(localize) {
					localize.addToDictionary([
						{ key: 'test', value: 'testing' },
						{ key: 'unit', value: 'tdd' },
					]);
					assert.equal(localize.getLocalizedString('blabla'), 'blabla');
				}));

				it('should return empty string if the dictionary has no data', inject(function(localize) {
					assert.equal(localize.getLocalizedString('blabla'), '');
				}));
			});

			// TODO
		});

		describe('translate directive', function() {

			// TODO
			it('should ');
		});
	});
});

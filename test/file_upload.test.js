define(function(require) {
	var assert = require('chai').assert;
	var sinon = require('sinon');

	// SUT
	require('file_upload');

	describe('File Upload directive', function() {
		beforeEach(module('sui-file-upload'));

		it('should do nothing', inject(function($compile, $rootScope) {
			var link = $compile('<input type="file" x-sui-file-upload></input>');
			link($rootScope);

			// TODO
		});
	});
});

define(function(require) {
	require('file_upload');
	var assert = require('chai').assert;

	describe('File Upload directive', function() {
		beforeEach(module('file-upload'));

		it('should do nothing', function() {
			inject(function($compile, $rootScope) {
				var element = $compile('<input type="file" x-sui-file-upload></input>');
				var scope = {};
				element(scope);
				assert(true, 'tomaya!');
			});
		});
	});
});

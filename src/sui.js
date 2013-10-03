define(function(require) {
	'use strict';

	require('back');
	require('file_upload');

	return angular.module('sui', [
		'sui-back',
		'sui-file-upload',
	]);

});

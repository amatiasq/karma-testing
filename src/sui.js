define(function(require) {
	'use strict';

	require('back/back');
	require('file_upload/file_upload');
	require('localize/localize');

	return angular.module('sui', [
		'sui-back',
		'sui-file-upload',
		'sui-location',
	]);
});

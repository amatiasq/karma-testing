define(function() {

	require('back');
	require('file_upload');

	return angular.module('sui', [
		'sui-back',
		'sui-file-upload',
	]);

});

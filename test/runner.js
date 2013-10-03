//jshint camelcase:false
'use strict';

requirejs.config({
	// This is because karma puts files under base/ directory
	baseUrl: 'base/src/',

	urlArgs: Date.now(),

	paths: {
		'chai': '../bower_components/chai/chai',
		'sinon': '../lib/sinon-1.7.3',
		'test': '../test',

		'FileAPI': '../lib/FileAPI.min',
	},

	shim: {
		'sinon': { exports: 'sinon' }
	}
});

angular.module('sui', []);

requirejs([
	'test/back.test',
	'test/file_upload.test',
], function() {
	window.__karma__.start();
});

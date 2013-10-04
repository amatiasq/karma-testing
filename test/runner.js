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

(function() {

	var files = Object.keys(window.__karma__.files);

	var deps = files.filter(function(filename) {
		return filename.indexOf('.test.js') !== -1;
	});

	requirejs(deps, function() {
		window.__karma__.start();
	});
})();

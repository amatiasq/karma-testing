requirejs.config({
	// This is because karma puts files under base/ directory
	baseUrl: 'base/src/',

	urlArgs: Date.now(),

	paths: {
		'chai': '../bower_components/chai/chai',
		'sinon': '../lib/sinon-1.7.3',
		'test': '../test',
	},

	shim: {
		'sinon': { exports: 'sinon' }
	}
})

angular.module('sui', []);

require([
	'test/back.test'
], function() {
	window.__karma__.start();
});

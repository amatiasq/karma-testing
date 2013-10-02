requirejs.config({
	// This is because karma puts files under base/ directory
	baseUrl: 'base/',
	//urlArgs: Date.now(),

	paths: {
		'chai': 'bower_components/chai/chai',
	}
})

console.log('b');
require([
	'test/file_upload.test'
], function() {
	window.__karma__.start();
	mocha.run();
});

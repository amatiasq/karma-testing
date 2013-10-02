requirejs.config({
	// This is because karma puts files under base/ directory
	baseUrl: 'base/',
	//urlArgs: Date.now(),
})

console.log('b');
require([
	'test/file_upload.test'
], function() {

})

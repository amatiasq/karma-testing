/*globals module*/
// Karma configuration
// Generated on Wed Oct 02 2013 11:59:43 GMT+0200 (CEST)

module.exports = function(config) {
	'use strict';

	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',


		// frameworks to use
		frameworks: [ 'mocha', 'requirejs' ],


		files: [
			'bower_components/angular/angular.js',
			'lib/angular-mocks.js',
			'src/test_runner.js',
			{pattern: 'bower_components/chai/chai.js', included: false},
			{pattern: 'lib/sinon-1.7.3.js', included: false},
			{pattern: 'lib/FileAPI.min.js', included: false},
			{pattern: 'src/**/*.js', included: false},
		],

		// list of files to exclude
		exclude: [

		],


		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: [ 'progress' ],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: [
			'PhantomJS',
			'Chrome',
			//'Firefox'
		],


		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};

module.exports = function(grunt) {
	'use strict';
	// Project configuration.

	grunt.initConfig({

		files: {
			js: [
				'src/**/*.js',
				'!src/**/*.test.js',
				'!src/test_runner.js',
			],
			test: [
				'src/**/*.test.js',
				'src/test_runner.js',
			],
			json: [
				'jshintrc.json',
				'bower.json',
				'package.json',
			],
			html: [
				'src/**/*.html'
			],
			config: [
				'Gruntfile.js',
				'karma.config.js',
			],
			vendor: [
				'bower_components/**/*',
				'node_modules/**/*',
				'lib/**/*',
			],
		},

		watch: {
			test: {
				files: [
					'<%= files.js %>',
					'<%= files.test %>',
					'<%= files.config %>',
				],
				tasks: [
					'jshint:src',
					'jshint:test',
					'karma:watch'
				]
			},
		},

		karma: {
			watch: {
				configFile: 'karma.config.js',
				browsers: [ 'PhantomJS' ],
				runnerPort: 9101,
				singleRun: true,
				autoWatch: false,
			},
		},

		jshint: {
			options: {
				jshintrc: 'jshintrc.json',
				ignores: '<%= files.vendor %>',
			},
			src: [ '<%= files.js %>' ],
			test: [ '<%= files.test %>' ],
			config: [ '<%= files.config %>', '<%= files.json %>' ],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');

	// Default task(s).
	grunt.registerTask('default', [ 'watch' ]);

};

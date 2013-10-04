module.exports = function(grunt) {
	'use strict';
	// Project configuration.

	grunt.initConfig({

		files: {
			js: [ 'src/**/*.js' ],
			test: [
				'test/**/*.test.js',
				'test/runner.js',
			],
			html: [ 'demo/**/*.html' ],
			json: [
				'jshintrc.json',
				'bower.json',
				'package.json',
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

		delta: {
			test: {
				files: [
					'<%= files.js %>',
					'<%= files.test %>',
					'<%= files.config %>',
				],
				tasks: [
					'jshint:src',
					'jshint:test',
					'karma:delta'
				]
			},
		},

		karma: {
			delta: {
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
	grunt.renameTask( 'watch', 'delta' );
	grunt.registerTask( 'watch', [
		'jshint:src',
		'jshint:test',
		'karma:delta',
		'delta'
	] );
	grunt.registerTask('default', [ 'watch' ]);

};

/*globals FileAPI*/
// This library depends on FileAPI
//   FileAPI doc: https://github.com/mailru/FileAPI

define(function(require) {
	'use strict';
	require('FileAPI');

	return angular.module('sui-file-upload', [])

	// This module requires FileAPI.flashUrl to be defined
	.config(function() {
		if (FileAPI.flashUrl === './FileAPI.flash.swf')
			throw new Error('Please, provide the path to "FileAPI.flash.swf" at ' +
				'"FileAPI.flashUrl" in order to use "sui-file-upload"');
	})

	.factory('suiFile', function($q) {
		function upload(config) {
			var defer = $q.defer();

			var complete = config.complete;
			config.complete = function(err, xhr) {
				if (err) {
					defer.reject(err);
				} else {
					defer.resolve(xhr);
				}

				if (angular.isFunction(complete))
					complete(err, xhr);
			};

			FileAPI.upload(config);
			return defer.promise;
		}

		return {
			upload: upload
		};
	})

	.directive('suiFileSelector', function() {
		return {
			scope: {
				onfileselected: '&',
			},

			link: function(scope, iElement) {
				var element = iElement[0];

				element.addEventListener('change', function(event) {
					var files = FileAPI.getFiles(event);
					scope.onfileselected({ files: files });
				});
			}
		};
	});
});

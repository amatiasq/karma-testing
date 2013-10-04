// This library depends on FileAPI
//   FileAPI doc: https://github.com/mailru/FileAPI


define(function(require) {
	require('FileAPI');

	// This module requires FileAPI.flashUrl to be defined

	return angular.module('sui-file-upload', [])

	.config(function() {
		if (FileAPI.flashUrl === './FileAPI.flash.swf')
			throw new Error('Please, provide the path to "FileAPI.flash.swf" at ' +
				'"FileAPI.flashUrl" in order to use "sui-file-upload"');
	})

	.service('suiFile', function($q) {
		this.upload = function uploadFile(config) {
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
		};
	})

	.directive('suiFileSelector', function() {
		return {
			scope: {
				onfileselected: '&',
			},

			link: function(scope, iElement, iAttrs) {
				var element = iElement[0];

				element.addEventListener('change', function(event) {
					var files = FileAPI.getFiles(event);
					scope.onfileselected({ files: files });
				});
			}
		};
	});
});

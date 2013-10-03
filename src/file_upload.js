define(function(require) {
	require('FileAPI');

	// This module requires FileAPI.flashUrl to be defined

	return angular.module('sui-file-upload', [])

	.config(function() {
		if (FileAPI.flashUrl === './FileAPI.flash.swf')
			throw new Error('Please, provide the path to FileAPI.flash.swf at "FileAPI.flashUrl" in order to use "sui-file-upload"');
	})

	.factory('suiFileUpload', function($q) {
		return function uploadFile(config) {
			var defer = $q.defer();

			var complete = config.complete;
			config.complete = function(err, xhr) {
				if (err) return defer.reject(err);
				defer.resolve(xhr);

				if (angular.isFunction(complete))
					complete(err, xhr);
			};

			if (config.file) {
				if (config.files)
					throw new Error('suiFileUpload accepts "file" OR "files" at configuration, it recived both');

				config.files = { file: config.file };
			}

			FileAPI.upload(config)
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

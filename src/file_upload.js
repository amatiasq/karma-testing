define(function(require) {
	require('FileAPI');

	// This module requires the value FileAPIFlashPath to be defined

	return angular.module('sui-file-upload', [])

	.factory('suiFileUpload', function(FileAPIFlashPath, $q) {
		FileAPI.flashUrl = FileAPIFlashPath;

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

	.directive('suiFileSelector', function(FileAPIFlashPath) {
		FileAPI.flashUrl = FileAPIFlashPath;

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

define(function() {
	return angular.module('file-upload', [])

	.directive('suiFileUpload', function() {
		console.log('invocado');
		return function postLink(scope, iElement, iAttrs) {
			console.log('instanciado');
		}
	});
});

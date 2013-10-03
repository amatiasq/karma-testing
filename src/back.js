define(function(require) {

	return angular.module('sui-back', [])

	.directive('suiBack', function($window) {
		return function($scope, $element, attrs) {
			$element.on('click', function(e) {
				e.preventDefault();
				$window.history.back();
			});
		};
	});
});

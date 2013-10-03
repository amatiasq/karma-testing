define(function(require) {

	return angular.module('sui-back', [])

	.directive('suiBack', function($window) {
		return function($scope, $element, attrs) {
			// It can be a jQuery lite element
			var el = $element[0]

			el.addEventListener('click', function(event) {
				event.preventDefault();
				$window.history.back();
			});
		};
	});
});

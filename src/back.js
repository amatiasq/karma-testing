define(function(require) {
	require('sui')

	.directive('suiBack', function($window) {
		return function($scope, $element, attrs) {
			$element.on('click', function(e) {
				e.preventDefault();
				$window.history.back();
			});
		};
	});
});

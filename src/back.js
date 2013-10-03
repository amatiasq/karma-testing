define(function() {
	'use strict';

	return angular.module('sui-back', [])

	.directive('suiBack', function($window) {
		return function($scope, iElement) {
			// It can be a jQuery lite element
			var el = iElement[0];

			el.addEventListener('click', function(event) {
				event.preventDefault();
				$window.history.back();
			});
		};
	});
});

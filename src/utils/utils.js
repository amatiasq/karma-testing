define(function() {
	'use strict';

	function deprecated(component, alternative) {
		console.warn('DEPRECATED WARNING');
		console.warn(component + ' is deprecated');

		if (alternative)
			console.warn('please use "' + alternative + '" instead');
	}

	return {
		deprecated: deprecated
	};
});

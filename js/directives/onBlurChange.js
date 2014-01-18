'use strict';

reportsApp.directive('onBlurChange', function($parse) {
	return function(scope, element, attr) {
		var fn = $parse(attr['onBlurChange']);
		var hasChanged = false;
		element.on('change', function(event) {
			hasChanged = true;
		});

		element.on('blur', function(event) {
			if (hasChanged) {
				scope.$apply(function() {
					fn(scope, {
						$event : event
					});
				});
				hasChanged = false;
			}
		});
	};
});
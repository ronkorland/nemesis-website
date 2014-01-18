/**
 * Created by Ron on 16/01/14.
 */
'use strict';

// Click to navigate
// similar to <a href="#/partial"> but hash is not required,
// e.g. <div click-link="/partial">
reportsApp.directive('clickLink', ['$location', function ($location) {
    return {
        link: function (scope, element, attrs) {
            element.on('click', function () {
                scope.$apply(function () {
                    $location.path(attrs.clickLink);
                });
            });
        }
    }
}]);
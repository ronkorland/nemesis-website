/**
 * Created by Ron on 17/01/14.
 */
'use strict';

reportsApp.directive('dashboardPanel', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            summary: '='
        },
        templateUrl: '/template/dashboard-panel.html'
    };
});
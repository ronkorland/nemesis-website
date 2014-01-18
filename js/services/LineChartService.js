'use strict';

reportsApp.factory('LineChartService', function ($resource, $q) {
    var resource = $resource('http://localhost:port/api/suite/chart/line/tests', {port: ':8080'});
    return {
        getTestLineChart: function () {
            var deferred = $q.defer();
            resource.get(function (activity) {
                    deferred.resolve(activity);
                },
                function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    };
});
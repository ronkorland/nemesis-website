'use strict';

reportsApp.factory('LineChartService', function ($resource, $q) {
    var resource = $resource(appConfig.apiUrl + '/suite/chart/line/tests');
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
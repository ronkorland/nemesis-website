'use strict';

reportsApp.factory('SuiteService', function ($resource, $q) {
    var resource = $resource(appConfig.apiUrl + '/suites/:id', {id: '@id'});

    var namesResource = $resource(appConfig.apiUrl + '/suites/names');

    var summaryResource = $resource(appConfig.apiUrl + '/suites/last/24/summary');

    return {
        getSuite: function (params) {
            var deferred = $q.defer();
            resource.get(params,
                function (suite) {
                    deferred.resolve(suite);
                },
                function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        getAllSuites: function (params) {
            var deferred = $q.defer();
            resource.get(params,
                function (suites) {
                    deferred.resolve(suites);
                },
                function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        getSuiteNames: function () {
            var deferred = $q.defer();
            namesResource.query(
                function (names) {
                    deferred.resolve(names);
                },
                function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        getSuitePieChart: function () {
            var deferred = $q.defer();
            resource.get(function (activity) {
                    deferred.resolve(activity);
                },
                function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        getSuiteSummary: function () {
            var deferred = $q.defer();
            summaryResource.get(
                function (names) {
                    deferred.resolve(names);
                },
                function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }
    };
});
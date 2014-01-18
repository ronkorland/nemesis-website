'use strict';

reportsApp.factory('SuiteService', function ($resource, $q) {
    var resource = $resource('http://localhost:port/api/suites/:id', {port: ':8080'}, {id: '@id'});

    var namesResource = $resource('http://localhost:port/api/suites/names', {port: ':8080'});

    var summaryResource = $resource('http://localhost:port/api/suites/last/24/summary', {port: ':8080'});

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
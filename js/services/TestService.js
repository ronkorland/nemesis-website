'use strict';

reportsApp.factory('TestService', function ($resource, $q) {
    var resource = $resource('http://localhost:port/api/tests/:id', {
        port: ':8080'
    }, {
        id: '@id'
    });

    var resourceBySuite = $resource('http://localhost:port/api/tests/suite/:id', {
        port: ':8080'
    }, {
        id: '@id'
    });

    var resourceMethodNamesBySuite = $resource('http://localhost:port/api/tests/suite/:id/method', {
        port: ':8080'
    }, {
        id: '@id'
    });

    var resourceMethodNames = $resource('http://localhost:port/api/tests/method', {
        port: ':8080'
    });

    var summaryResource = $resource('http://localhost:port/api/tests/last/24/summary', {
        port: ':8080'
    });

    return {
        getTests: function (params) {
            var deferred = $q.defer();
            resource.get(params, function (tests) {
                deferred.resolve(tests);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        getTestsBySuite: function (params) {
            var deferred = $q.defer();
            resourceBySuite.get(params, function (tests) {
                deferred.resolve(tests);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },
        getTestsMethodBySuite: function (params) {
            var deferred = $q.defer();
            resourceMethodNamesBySuite.query(params, function (tests) {
                deferred.resolve(tests);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },
        getTestsMethodNames: function (params) {
            var deferred = $q.defer();
            resourceMethodNames.query(params, function (tests) {
                deferred.resolve(tests);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },
        getTestSummary: function () {
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
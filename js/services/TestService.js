'use strict';

reportsApp.factory('TestService', function ($resource, $q) {
    var resource = $resource(appConfig.apiUrl + '/tests/:id', {
        id: '@id'
    });

    var resourceBySuite = $resource(appConfig.apiUrl + '/tests/suite/:id', {
        id: '@id'
    });

    var resourceMethodNamesBySuite = $resource(appConfig.apiUrl + '/tests/suite/:id/method', {
        id: '@id'
    });

    var resourceMethodNames = $resource(appConfig.apiUrl + '/tests/method');

    var summaryResource = $resource(appConfig.apiUrl + '/tests/last/24/summary');

    var historyResource = $resource(appConfig.apiUrl + '/tests/:id/history', {
        id: '@id'
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
        },
        getTestHistory: function (params) {
            var deferred = $q.defer();
            historyResource.get(params, function (tests) {
                deferred.resolve(tests);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }
    };
});
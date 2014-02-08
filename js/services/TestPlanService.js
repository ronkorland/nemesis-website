/**
 * Created by Ron on 25/01/14.
 */
'use strict';

reportsApp.factory('TestPlanService', function ($resource, $q) {
    var resource = $resource('http://localhost:port/api/testplans/:id', {
        port: ':8080',
        id: '@id'
    }, {
        "update": {method: "PUT", params: {id: ''}}
    });

    return {
        createTestPlan: function (testPlanData) {
            var deferred = $q.defer();
            resource.save(testPlanData, function (testPlan) {
                deferred.resolve(testPlan);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        getTestPlans: function (params) {
            var deferred = $q.defer();
            resource.get(params, function (testPlans) {
                deferred.resolve(testPlans);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        updateTestPlan: function (params) {
            var deferred = $q.defer();
            resource.update(params, function (testPlans) {
                deferred.resolve(testPlans);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    };
});
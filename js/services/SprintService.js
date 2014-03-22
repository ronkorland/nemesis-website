/**
 * Created by Ron on 15/03/14.
 */
'use strict';

reportsApp.factory('SprintService', function ($resource, $q) {
    var resource = $resource('http://localhost:port/api/sprints/:id', {
        port: ':8080',
        id: '@id'
    }, {
        "update": {method: "PUT", params: {id: ''}}
    }, {
        "delete": {method: "DELETE", params: {id: '@id'}}
    });

    return {
        createSprint: function (sprintData) {
            var deferred = $q.defer();
            resource.save(sprintData, function (sprint) {
                deferred.resolve(sprint);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        getSprints: function (params) {
            var deferred = $q.defer();
            resource.get(params, function (testPlans) {
                deferred.resolve(testPlans);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        updateSprint: function (params) {
            var deferred = $q.defer();
            resource.update(params, function (sprint) {
                deferred.resolve(sprint);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        deleteSprint: function (params) {
            var deferred = $q.defer();
            resource.delete(params, function (sprint) {
                deferred.resolve(sprint);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    };
});
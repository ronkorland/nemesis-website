/**
 * Created by Ron on 29/03/14.
 */
'use strict';

reportsApp.factory('UsersService', function ($resource, $q) {
    var resource = $resource(appConfig.apiUrl + '/users/:id', {
        id: '@id'
    }, {
        "update": {method: "PUT", params: {id: ''}}
    }, {
        "delete": {method: "DELETE", params: {id: '@id'}}
    });

    var permissionsRec = $resource(appConfig.apiUrl + '/users/permissions');

    return {
        createUser: function (userData) {
            var deferred = $q.defer();
            resource.save(userData, function (user) {
                deferred.resolve(user);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        getUsers: function (params) {
            var deferred = $q.defer();
            resource.get(params, function (users) {
                deferred.resolve(users);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        updateUser: function (params) {
            var deferred = $q.defer();
            resource.update(params, function (user) {
                deferred.resolve(user);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        deleteUser: function (params) {
            var deferred = $q.defer();
            resource.delete(params, function (user) {
                deferred.resolve(user);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        changePermissions: function (params) {
            var deferred = $q.defer();
            permissionsRec.save(params, function (user) {
                deferred.resolve(user);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    };
});
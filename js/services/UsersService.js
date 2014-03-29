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

    var permissionsRes = $resource(appConfig.apiUrl + '/users/permissions');

    var changePasswordRes = $resource(appConfig.apiUrl + '/users/changepassword', {},
        {
            save: {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        }
    );

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
            permissionsRes.save(params, function (user) {
                deferred.resolve(user);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        changePassword: function (params) {
            var deferred = $q.defer();
            changePasswordRes.save(params, function (msg) {
                deferred.resolve(msg);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    };
});
/**
 * Created by Ron on 29/03/14.
 */

'use strict';

reportsApp.controller('UsersController', function ($scope, $route, $location, $modal, UsersService) {
    $scope.totalPages = 0;
    $scope.usersCount = 0;
    $scope.loaded = false;
    $scope.currentId = null;

    $scope.headers = [
        {
            title: 'Username',
            value: 'username'
        },
        {
            title: 'Email',
            value: 'email'
        },
        {
            title: 'Permissions',
            value: 'permissions'
        }
    ];

    $scope.rightClick = function (id) {
        $scope.currentId = id;
    }

    $scope.deleteUser = function () {
        UsersService.deleteUser({id: $scope.currentId}).then(function () {
            $route.reload();
        }, function () {
            console.error("Failed to delete user " + $scope.currentId);
        });
    }

    $scope.permissionChange = function (id, mapPermissions) {
        console.log(mapPermissions);
        console.log(id);
        UsersService.changePermissions({id: id, mapPermissions: mapPermissions}).then(function (data) {

        });
    }

    $scope.openAddModalDialog = function () {

        var modalInstance = $modal.open({
            templateUrl: '/template/modal/UsersAddNewModal.html',
            controller: 'UsersAddNewModalCtrl'
        });

        modalInstance.result.then(function (input) {
            UsersService.createUser(input).then(function () {
                    $route.reload();
                }, function (data) {
                    console.error(data);
                }
            );
        });
    };

    UsersService.getUsers().then(function (data) {
        $scope.users = data.users;
        $scope.usersCount = data.total;
        $scope.loaded = true;
    }, function () {
        $scope.users = [];
        $scope.usersCount = 0;
        $scope.loaded = false;
    });
});
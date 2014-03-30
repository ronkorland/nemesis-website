/**
 * Created by Ron on 29/03/14.
 */

'use strict';

reportsApp.controller('UsersController', function ($scope, $route, $location, $modal, UsersService, growl) {
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

    $scope.rightClick = function (id, username, email) {
        $scope.currentId = id;
        $scope.currentUsername = username;
        $scope.currentEmail = email;
    }

    $scope.deleteUser = function () {
        UsersService.deleteUser({id: $scope.currentId}).then(function () {
            $route.reload();
            console.log("User successfully deleted");
        }, function () {
            growl.addErrorMessage("Failed to delete user");
            console.error("Failed to delete user " + $scope.currentId);
        });
    }

    $scope.permissionChange = function (id, mapPermissions) {
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
                    console.log("New user successfully created");
                }, function (data) {
                    growl.addErrorMessage(data.data.message);
                    console.error(data);
                }
            );
        });
    };

    $scope.openEditDetailsDialog = function () {
        var modalInstance = $modal.open({
            templateUrl: '/template/modal/EditUserModal.html',
            controller: 'EditUserModalCtrl',
            resolve: {
                email: function () {
                    return $scope.currentEmail;
                },
                username: function () {
                    return $scope.currentUsername;
                }
            }
        });

        modalInstance.result.then(function (input) {
            UsersService.updateUser({id: $scope.currentId, username: input.username, email: input.email}).then(function (user) {
                $route.reload();
            }, function (data) {
                console.error("Failed to update user " + $scope.currentUsername);
            });
        });
    };

    $scope.openChangePasswordDialog = function () {
        var modalInstance = $modal.open({
            templateUrl: '/template/modal/ChangePasswordModal.html',
            controller: 'ChangePasswordModalCtrl'
        });

        modalInstance.result.then(function (input) {
            UsersService.changePassword($.param({userId: $scope.currentId, currentPassword: input.currentPassword, newPassword: input.newPassword
                })).then(function (data) {
                    growl.addSuccessMessage("Password successfully changed");
                }, function (data) {
                    growl.addErrorMessage(data.data.message);
                });
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
})
;
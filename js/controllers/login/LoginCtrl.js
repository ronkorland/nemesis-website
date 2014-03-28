'use strict';

reportsApp.controller('LoginController', function ($scope, $rootScope, $location, $cookieStore, UserService) {

    $scope.login = function () {
        UserService.authenticate(({username: $scope.username, password: $scope.password}), function (authenticationResult) {
            var authToken = authenticationResult.token;
            $rootScope.authToken = authToken;
            if ($scope.rememberMe) {
                $cookieStore.put('authToken', authToken);
            }
            UserService.get(function (user) {
                $rootScope.user = user;
                $location.path("/");
            });
        }, function (error) {
            $scope.loginError = true;
        });
    };

});
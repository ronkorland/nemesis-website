'use strict';

reportsApp.controller('LoginController', function ($scope, $rootScope, $location, UserService, ipCookie) {

    $scope.login = function () {
        UserService.authenticate(({username: $scope.username, password: $scope.password}), function (authenticationResult) {
            var authToken = authenticationResult.token;
            $rootScope.authToken = authToken;
            ipCookie('authToken', authToken);
            if ($scope.rememberMe) {
                ipCookie('authToken', authToken, { expires: 7 });
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
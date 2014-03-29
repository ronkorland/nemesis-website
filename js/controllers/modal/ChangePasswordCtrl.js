'use strict';

reportsApp
    .controller('ChangePasswordCtrl',
    function ($scope, $modalInstance) {

        $scope.input = {
            currentPassword: "",
            newPassword: "",
            verifyPassword: ""
        };

        $scope.openStart = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedStart = true;
        };

        $scope.openEnd = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedEnd = true;
        };

        $scope.save = function () {
            $modalInstance.close($scope.input);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.passwordMatch = function () {
            if ($scope.input.newPassword !== undefined && $scope.input.verifyPassword !== undefined
                && $scope.input.newPassword != $scope.input.verifyPassword
                && $scope.input.verifyPassword.length > 0 && $scope.input.newPassword.length > 0) {
                return true;
            }
            return false;
        }

    });
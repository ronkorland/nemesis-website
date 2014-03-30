'use strict';

reportsApp
    .controller('EditUserModalCtrl',
    function ($scope, $modalInstance, email, username) {

        $scope.input = {
            username: username,
            email: email
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

    });
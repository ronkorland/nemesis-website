'use strict';

reportsApp
    .controller('UsersAddNewModalCtrl',
    function ($scope, $modalInstance) {

        $scope.input = {
            username: "",
            email: "",
            password: ""
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
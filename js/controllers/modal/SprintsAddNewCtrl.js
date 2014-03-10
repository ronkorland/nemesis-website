'use strict';

reportsApp
    .controller('SprintsAddNewModalCtrl',
    function ($scope, $modalInstance) {

        $scope.input = {
            name: "",
            date: ""
        };

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.save = function () {
            $modalInstance.close($scope.input);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 5 || date
                .getDay() === 6));
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 0,
            'show-weeks': false
        };

        $scope.format = "dd-MM-yyyy";

        $scope.toggleMin = function () {
            $scope.minDate = ($scope.minDate) ? null : new Date();
        };
        $scope.toggleMin();
    });
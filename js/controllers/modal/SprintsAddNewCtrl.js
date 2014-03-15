'use strict';

reportsApp
    .controller('SprintsAddNewModalCtrl',
    function ($scope, $modalInstance) {

        $scope.input = {
            name: "",
            startDate: "",
            endDate: ""
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
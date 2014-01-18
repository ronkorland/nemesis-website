reportsApp.controller('ModalDpCtrl', function ($scope, $modalInstance) {
    $scope.dt = new Date();

    $scope.maxDate = new Date();

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        $modalInstance.close($scope.dt.value);
    };
});
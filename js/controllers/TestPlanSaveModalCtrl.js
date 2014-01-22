/**
 * Created by Ron on 22/01/14.
 */
reportsApp.controller('TestPlanSaveModalCtrl', function ($scope, $modalInstance) {

    $scope.input = {};

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        $modalInstance.close($scope.input);
    };
});
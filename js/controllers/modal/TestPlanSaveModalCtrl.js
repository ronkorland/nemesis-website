/**
 * Created by Ron on 22/01/14.
 */
reportsApp.controller('TestPlanSaveModalCtrl', function ($scope, $modalInstance, owner, name) {

    $scope.input = {
        name: name,
        owner: owner
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        $modalInstance.close($scope.input);
    };
});
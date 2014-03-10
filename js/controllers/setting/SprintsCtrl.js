/**
 * Created by Ron on 10/03/14.
 */
'use strict';

reportsApp.controller('SprintsController', function ($scope, $modal) {

    $scope.openAddModalDialog = function () {

        var modalInstance = $modal.open({
            templateUrl: '/template/modal/SprintsAddNewModal.html',
            controller: 'SprintsAddNewModalCtrl'
        });

        modalInstance.result.then(function (input) {
            $scope.date = input.date;
            $scope.name = input.name;
        }, function () {
        });
    };
});

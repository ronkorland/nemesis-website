/**
 * Created by Ron on 10/03/14.
 */
'use strict';

reportsApp.controller('SprintsController', function ($scope, $modal, $route, SprintService) {

    $scope.openAddModalDialog = function () {

        var modalInstance = $modal.open({
            templateUrl: '/template/modal/SprintsAddNewModal.html',
            controller: 'SprintsAddNewModalCtrl'
        });

        modalInstance.result.then(function (input) {
            SprintService.createSprint(input).then(function (data) {
                    $route.reload();
                }, function () {
                    console.error(data);
                }
            );
        }, function () {
        });
    };

    $scope.totalPages = 0;
    $scope.testPlansCount = 0;
    $scope.loaded = false;

    $scope.headers = [
        {
            title: 'Sprint Name',
            value: 'name'
        },
        {
            title: 'Start Date',
            value: 'startDate'
        },
        {
            title: 'End Date',
            value: 'endDate'
        }
    ];

    SprintService.getSprints().then(function (data) {
        $scope.sprints = data.sprints;
        $scope.sprintsCount = data.total;
        $scope.loaded = true;
    }, function () {
        $scope.sprints = [];
        $scope.sprintsCount = 0;
        $scope.loaded = false;
    });
});

/**
 * Created by Ron on 10/03/14.
 */
'use strict';

reportsApp.controller('SprintsController', function ($scope, $modal, $route, $moment, SprintService) {

    $scope.totalPages = 0;
    $scope.sprintsCount = 0;
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

    $scope.rightClick = function (id, name, startDate, endDate) {
        $scope.currentId = id;
        $scope.currentName = name;
        $scope.currentStartDate = startDate;
        $scope.currentEndDate = endDate;
    }

    $scope.openEditModalDialog = function () {
        var modalInstance = $modal.open({
            templateUrl: 'template/modal/SprintsModal.html',
            controller: 'SprintsModalCtrl',
            resolve: {
                sprintName: function () {
                    return $scope.currentName;
                },
                startDate: function () {
                    return $moment($scope.currentStartDate, "DD-MM-YYYY").toDate();
                },
                endDate: function () {
                    return $moment($scope.currentEndDate, "DD-MM-YYYY").toDate();
                },
                editModal: function () {
                    return true;
                }
            }
        });

        modalInstance.result.then(function (input) {
            SprintService.updateSprint({id: $scope.currentId, name: input.name, startDate: input.startDate, endDate: input.endDate}).then(function () {
                    $route.reload();
                }, function (data) {
                    console.error(data);
                }
            );
        }, function () {
        });
    };

    $scope.openAddModalDialog = function () {

        var modalInstance = $modal.open({
            templateUrl: 'template/modal/SprintsModal.html',
            controller: 'SprintsModalCtrl',
            resolve: {
                sprintName: function () {
                    return "";
                },
                startDate: function () {
                    return "";
                },
                endDate: function () {
                    return "";
                },
                editModal: function () {
                    return false;
                }
            }
        });

        modalInstance.result.then(function (input) {
            SprintService.createSprint(input).then(function () {
                    $route.reload();
                }, function (data) {
                    console.error(data);
                }
            );
        }, function () {
        });
    };

    SprintService.getSprints().then(function (data) {
        $scope.sprints = data.sprints;
        $scope.sprintsCount = data.total;
        $scope.loaded = true;
    }, function () {
        $scope.sprints = [];
        $scope.sprintsCount = 0;
        $scope.loaded = false;
    });

    $scope.deleteSprint = function () {
        SprintService.deleteSprint({id: $scope.currentId}).then(function () {
            $route.reload();
        }, function (data) {
            console.error(data);
        });
    };
});

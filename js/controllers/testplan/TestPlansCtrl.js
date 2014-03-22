/**
 * Created by Ron on 25/01/14.
 */
'use strict';

reportsApp.controller('TestPlansController', function ($scope, $route, $location, TestPlanService) {
    $scope.totalPages = 0;
    $scope.testPlansCount = 0;
    $scope.loaded = false;
    $scope.currentId = null;

    $scope.headers = [
        {
            title: 'Test Plan Name',
            value: 'name'
        },
        {
            title: 'Owner Name',
            value: 'owner'
        },
        {
            title: 'Creation Date',
            value: 'creationDateTime'
        },
        {
            title: 'Update Date',
            value: 'updateDateTime'
        }
    ];

    $scope.rightClick = function (id) {
        $scope.currentId = id;
    }

    $scope.viewTestPlan = function () {
        $location.path("/testplan/" + $scope.currentId);
    }

    $scope.editTestPlan = function () {
        $location.path("/testplan/" + $scope.currentId + "/edit");
    }

    $scope.deleteTestPlan = function () {
        TestPlanService.deleteTestPlan({id: $scope.currentId}).then(function () {
            $route.reload();
        }, function () {
            console.error("Failed to delete test plan " + $scope.currentId);
        });
    }

    TestPlanService.getTestPlans().then(function (data) {
        $scope.testPlans = data.testPlans;
        $scope.testPlansCount = data.total;
        $scope.loaded = true;
    }, function () {
        $scope.testPlans = [];
        $scope.testPlansCount = 0;
        $scope.loaded = false;
    });
});
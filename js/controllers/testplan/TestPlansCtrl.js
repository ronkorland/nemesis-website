/**
 * Created by Ron on 25/01/14.
 */
'use strict';

reportsApp.controller('TestPlansController', function ($scope, TestPlanService) {
    $scope.totalPages = 0;
    $scope.testPlansCount = 0;
    $scope.loaded = false;

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
        },
        {
            title: '',
            value: 'linkOpen'
        },{
            title: '',
            value: 'linkEdit'
        }
    ];

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
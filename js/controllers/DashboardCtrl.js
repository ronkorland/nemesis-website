'use strict';

reportsApp.controller('DashboardController', function ($scope, LineChartService, SuiteService, TestService) {

    $scope.recentTestsHeader = [
        {
            title: 'Test Name',
            value: 'testName'
        },
        {
            title: 'Status',
            value: 'status'
        }
    ];

    $scope.recentSuitesHeader = [
        {
            title: 'Suite Name',
            value: 'suiteName'
        },
        {
            title: 'Status',
            value: 'status'
        }
    ];

    SuiteService.getAllSuites({pageNumber: 0, pageSize: 10, sortDir: 'desc', sortedBy: 'startTime'}).then(function (data) {
        $scope.suites = data.suites;
    }, function (response) {
        $scope.suiteSummary = {};
        console.error(response);
    });

    SuiteService.getSuiteSummary().then(function (data) {
        $scope.suiteSummary = data;
    }, function (response) {
        $scope.suiteSummary = {};
        console.error(response);
    });

    $scope.suiteSummaryData = {
        failedText: 'Failed Suites',
        failedLink: '/#/suites?minusDays=1&status=FAILURE&pageSize=15&pageNumber=0&sortDir=desc&sortedBy=startTime',
        successText: 'Success Suites',
        successLink: '/#/suites?minusDays=1&status=SUCCESS&pageSize=15&pageNumber=0&sortDir=desc&sortedBy=startTime',
        totalText: 'Suites on the last 24 hours',
        totalLink: '/#/suites?minusDays=1&pageSize=15&pageNumber=0&sortDir=desc&sortedBy=startTime'
    };

    TestService.getTestSummary().then(function (data) {
        $scope.testSummary = data;
    }, function (response) {
        $scope.testSummary = {};
        console.error(response);
    });

    $scope.testSummaryData = {
        failedText: 'Failed Tests',
        failedLink: '/#/tests?minusDays=1&status=FAILURE&pageSize=15&pageNumber=0&sortDir=desc&sortedBy=startTime',
        successText: 'Success Tests',
        successLink: '/#/tests?minusDays=1&status=SUCCESS&pageSize=15&pageNumber=0&sortDir=desc&sortedBy=startTime',
        totalText: 'Tests on the last 24 hours',
        totalLink: '/#/tests?minusDays=1&pageSize=15&pageNumber=0&sortDir=desc&sortedBy=startTime'
    };

    TestService.getTests({pageNumber: 0, pageSize: 10, sortDir: 'desc', sortedBy: 'startTime'}).then(function (data) {
        $scope.tests = data.tests;
    }, function (response) {
        $scope.suiteSummary = {};
        console.error(response);
    });

    LineChartService.getTestLineChart().then(function (activity) {
        $scope.testsLineData = activity;
        $scope.testsLineData.plotOptions.series.point.events.click = function () {
            location.href = this.options.url;
        }
    }, function (response) {
        $scope.testsLineData = {};
        console.error(response);
    });
});
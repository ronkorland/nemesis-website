'use strict';

reportsApp
    .controller('SuiteController',
    function ($scope, $routeParams, $location, SuiteService, TestService) {

        $scope.headers = [
            {
                title: 'Method Name',
                value: 'method'
            },
            {
                title: 'Start Time',
                value: 'startTime'
            },
            {
                title: 'End Time',
                value: 'endTime'
            },
            {
                title: 'Elapsed (HH:MM:SS)',
                value: 'runningTime'
            },
            {
                title: 'Status',
                value: 'htmlStatus'
            },
            {
                title: '',
                value: ''
            }
        ];

        $scope.statuses = [
            {
                name: 'Failed',
                value: 'FAILURE'
            },
            {
                name: 'Success',
                value: 'SUCCESS'
            },
            {
                name: 'Skip',
                value: 'SKIP'
            }
        ];

        $scope.CheckNull = function (value) {
            return (value == null || value == '');
        };

        $scope.tableRowExpanded = false;
        $scope.tableRowIndexCurrExpanded = "";
        $scope.tableRowIndexPrevExpanded = "";
        $scope.storeIdExpanded = "";

        $scope.dayDataCollapseFn = function () {
            $scope.dayDataCollapse = [];
            for (var i = 0; i < $scope.tests.length; i += 1) {
                $scope.dayDataCollapse.push(false);
            }
        };

        $scope.selectTableRow = function (index, storeId) {
            if ($scope.dayDataCollapse === undefined) {
                $scope.dayDataCollapseFn();
            }

            if ($scope.tableRowExpanded === false
                && $scope.tableRowIndexCurrExpanded === ""
                && $scope.storeIdExpanded === "") {
                $scope.tableRowIndexPrevExpanded = "";
                $scope.tableRowExpanded = true;
                $scope.tableRowIndexCurrExpanded = index;
                $scope.storeIdExpanded = storeId;
                $scope.dayDataCollapse[index] = true;
            } else if ($scope.tableRowExpanded === true) {
                if ($scope.tableRowIndexCurrExpanded === index
                    && $scope.storeIdExpanded === storeId) {
                    $scope.tableRowExpanded = false;
                    $scope.tableRowIndexCurrExpanded = "";
                    $scope.storeIdExpanded = "";
                    $scope.dayDataCollapse[index] = false;
                } else {
                    $scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
                    $scope.tableRowIndexCurrExpanded = index;
                    $scope.storeIdExpanded = storeId;
                    $scope.dayDataCollapse[$scope.tableRowIndexPrevExpanded] = false;
                    $scope.dayDataCollapse[$scope.tableRowIndexCurrExpanded] = true;
                }
            }

        };

        $scope.totalPages = 0;
        $scope.testsCount = 0;
        $scope.apiReturn = false;

        $scope.methods = function () {
            return TestService.getTestsMethodBySuite({id: $routeParams.suiteId}).then(
                function (data) {
                    $scope.names = data;
                }, function () {
                    $scope.names = [];
                });
        };

        $scope.methods();

        $scope.getPageSize = function () {
            if ($location.search().pageSize) {
                return $location.search().pageSize;
            } else {
                $location.search('pageSize', 15);
                return 15;
            }
        };

        $scope.getPageNumber = function () {
            if ($location.search().pageNumber) {
                return $location.search().pageNumber;
            } else {
                $location.search('pageNumber', 0);
                return 0;
            }
        };

        $scope.getSortDir = function () {
            if ($location.search().sortDir) {
                return $location.search().sortDir;
            } else {
                $location.search('sortDir', 'desc');
                return 'desc';
            }
        };

        $scope.getSortBy = function () {
            if ($location.search().sortedBy) {
                return $location.search().sortedBy;
            } else {
                $location.search('sortedBy', 'startTime');
                return 'startTime';
            }
        };

        $scope.getMethod = function () {
            if ($location.search().method) {
                return $location.search().method;
            } else {
                $location.search('method', null);
                return null;
            }
        };

        $scope.getStatus = function () {
            if ($location.search().status) {
                return $location.search().status;
            } else {
                $location.search('status', null);
                return null;
            }
        };

        // default criteria that will be sent to the server
        $scope.filterCriteria = {
            id: $routeParams.suiteId,
            pageSize: $scope.getPageSize(),
            pageNumber: $scope.getPageNumber(),
            sortDir: $scope.getSortDir(),
            sortedBy: $scope.getSortBy(),
            status: $scope.getStatus(),
            method: $scope.getMethod()
        };

        // The function that is responsible of fetching the result
        // from the server
        // and setting the grid to the new result
        $scope.fetchResult = function () {
            return TestService.getTestsBySuite($scope.filterCriteria).then(
                function (data) {
                    $scope.tests = data.tests;
                    $scope.totalPages = data.totalPages;
                    $scope.testsCount = data.total;
                    $scope.apiReturn = true;
                }, function () {
                    $scope.apiReturn = false;
                    $scope.tests = [];
                    $scope.totalPages = 0;
                    $scope.testsCount = 0;
                });
        };

        SuiteService.getSuite({id: $routeParams.suiteId}).then(
            function (data) {
                $scope.suite = data;
            }, function () {
                $scope.suites = [];
            });

        // called when navigate to another page in the pagination
        $scope.selectPage = function (page) {
            $scope.filterCriteria.pageNumber = page;
            $scope.fetchResult();
        };

        // Will be called when filtering the grid, will reset the
        // page number to zero
        $scope.filterResult = function () {
            $location.search('pageSize', $scope.filterCriteria.pageSize);
            $location.search('pageNumber', $scope.filterCriteria.pageNumber);
            $location.search('sortDir', $scope.filterCriteria.sortDir);
            $location.search('sortedBy', $scope.filterCriteria.sortedBy);
            $location.search('method', $scope.filterCriteria.method);
            $location.search('status', $scope.filterCriteria.status);
            $scope.filterCriteria.pageNumber = 0;
            $scope.fetchResult().then(function () {
                $scope.filterCriteria.pageNumber = 0;
            });
        };

        // call back function that we passed to our custom directive
        // sortBy, will be
        // called when clicking on any field to sort
        $scope.onSort = function (sortedBy, sortDir) {
            $scope.filterCriteria.sortDir = sortDir;
            $scope.filterCriteria.sortedBy = sortedBy;
            $scope.filterCriteria.pageNumber = 0;
            $scope.fetchResult().then(function () {
                $scope.filterCriteria.pageNumber = 0;
            });
        };

        $scope.selectPage(0);

    });
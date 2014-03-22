'use strict';

reportsApp.controller('SuitesController',
    function ($scope, $location, SuiteService) {

        $scope.totalPages = 0;
        $scope.suitesCount = 0;
        $scope.apiReturn = false;

        $scope.headers = [
            {
                title: 'Suite Name',
                value: 'suiteName'
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
                title: 'Tests',
                value: 'numberOfTests'
            },
            {
                title: 'Status',
                value: 'htmlStatus'
            },
            {
                title: '',
                value: 'link'
            }
        ];

        $scope.dates = [
            {
                name: 'All',
                value: '0'
            },
            {
                name: 'Last day (24h)',
                value: '1'
            },
            {
                name: 'Last 2 days (48h)',
                value: '2'
            },
            {
                name: 'Last week',
                value: '7'
            },
            {
                name: 'Last month',
                value: '30'
            }
        ];

        $scope.rightClick = function (id) {
            $scope.currentId = id;
        }

        $scope.statuses = [
            {
                name: 'Failed',
                value: 'FAILURE'
            },
            {
                name: 'Success',
                value: 'SUCCESS'
            }
        ];

        SuiteService.getSuiteNames().then(
            function (data) {
                $scope.names = data;
            }, function () {
                $scope.names = [];
            });

        $scope.getMinusDays = function () {
            if ($location.search().minusDays) {
                return $location.search().minusDays;
            } else {
                $location.search('minusDays', $scope.dates[2].value);
                return $scope.dates[2].value;
            }
        };

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

        $scope.getSuiteName = function () {
            if ($location.search().suiteName) {
                return $location.search().suiteName;
            } else {
                $location.search('suiteName', null);
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
            pageSize: $scope.getPageSize(),
            pageNumber: $scope.getPageNumber(),
            sortDir: $scope.getSortDir(),
            sortedBy: $scope.getSortBy(),
            minusDays: $scope.getMinusDays(),
            suiteName: $scope.getSuiteName(),
            status: $scope.getStatus()
        };

        // The function that is responsible of fetching the result from the server
        // and setting the grid to the new result
        $scope.fetchResult = function () {
            return SuiteService.getAllSuites($scope.filterCriteria).then(
                function (data) {
                    $scope.suites = data.suites;
                    $scope.totalPages = data.totalPages;
                    $scope.suitesCount = data.total;
                    $scope.apiReturn = true;
                }, function () {
                    $scope.apiReturn = false;
                    $scope.suites = [];
                    $scope.totalPages = 0;
                    $scope.suitesCount = 0;
                });
        };

        // called when navigate to another page in the pagination
        $scope.selectPage = function (page) {
            if (page > 0) {
                $location.search('pageNumber', page - 1);
                $scope.filterCriteria.pageNumber = page - 1;
            } else {
                $location.search('pageNumber', 0);
                $scope.filterCriteria.pageNumber = 0;
            }
            $scope.currentPage = page;
            $scope.fetchResult();
        };

        // Will be called when filtering the grid, will reset the page number to zero
        $scope.filterResult = function () {
            $scope.filterCriteria.pageNumber = 0;
            $location.search('sortedBy', $scope.filterCriteria.startTime);
            $location.search('sortDir', $scope.filterCriteria.sortDir);
            $location.search('pageNumber', $scope.filterCriteria.pageNumber);
            $location.search('pageSize', $scope.filterCriteria.pageSize);
            $location.search('minusDays', $scope.filterCriteria.minusDays);
            $location.search('suiteName', $scope.filterCriteria.suiteName);
            $location.search('status', $scope.filterCriteria.status);
            $scope.fetchResult().then(function () {
                $scope.filterCriteria.pageNumber = 0;
            });
        };

        // call back function that we passed to our custom directive sortBy, will be
        // called when clicking on any field to sort
        $scope.onSort = function (sortedBy, sortDir) {
            $scope.filterCriteria.sortDir = sortDir;
            $scope.filterCriteria.sortedBy = sortedBy;
            $scope.filterCriteria.pageNumber = 1;
            $scope.fetchResult().then(function () {
                // The request fires correctly but sometimes the ui doesn't update,
                // that's a fix
                $scope.filterCriteria.pageNumber = 0;
            });
        };

        // manually select a page to trigger an ajax request to populate the grid on
        // page load
        $scope.selectPage(0);

        $scope.moreInfo = function () {
            $location.path("/suite/" + $scope.currentId);
        }
    });
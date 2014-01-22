'use strict';

reportsApp.controller('TestsController',
    function ($scope, $location, $timeout, $modal, $filter, TestService) {

        $scope.totalPages = 0;
        $scope.testsCount = 0;
        $scope.apiReturn = false;
        $scope.dpModalOpen = false;

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
                value: 'link'
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
            },
            {
                name: 'Exact date',
                value: '-1'
            }
        ];

        TestService.getTestsMethodNames().then(
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

        $scope.getMethod = function () {
            if ($location.search().suiteName) {
                return $location.search().suiteName;
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

        $scope.getStartDate = function () {
            if ($location.search().startDate) {
                return $location.search().startDate;
            } else {
                $location.search('startDate', null);
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
            method: $scope.getMethod(),
            status: $scope.getStatus(),
            startDate: $scope.getStartDate()
        };

        // The function that is responsible of fetching the result from the server
        // and setting the grid to the new result
        $scope.fetchResult = function () {
            return TestService.getTests($scope.filterCriteria).then(
                function (data) {
                    $scope.tests = data.tests;
                    $scope.totalPages = data.totalPages;
                    $scope.testsCount = data.total;
                    $scope.apiReturn = true;
                    if ($scope.getMinusDays() == -1) {
                        $scope.exactStartDate = $scope.getStartDate();
                    } else {
                        $scope.exactStartDate = '';
                        $location.search('startDate', null);
                        $scope.filterCriteria.startDate = null
                    }
                }, function () {
                    $scope.apiReturn = false;
                    $scope.tests = [];
                    $scope.totalPages = 0;
                    $scope.testsCount = 0;
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
            $location.search('sortedBy', $scope.filterCriteria.sortedBy);
            $location.search('sortDir', $scope.filterCriteria.sortDir);
            $location.search('pageNumber', $scope.filterCriteria.pageNumber);
            $location.search('pageSize', $scope.filterCriteria.pageSize);
            $location.search('minusDays', $scope.filterCriteria.minusDays);
            $location.search('method', $scope.filterCriteria.method);
            $location.search('status', $scope.filterCriteria.status);


            if ($scope.filterCriteria.minusDays == '-1' && !$scope.dpModalOpen && !$scope.filterCriteria.startDate) {
                var date = $scope.openDatepicker();
                $scope.dpModalOpen = true;
            }

            if (!$scope.dpModalOpen) {
                $scope.fetchResult().then(function () {
                    $scope.filterCriteria.pageNumber = 0;
                });
            }
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


        // Open datepicker calender ui
        $scope.openDatepicker = function () {
            var currentMinusDays = $scope.filterCriteria.minusDays;
            var modalInstance = $modal.open({
                templateUrl: '/template/modal/dpModal.html',
                controller: 'ModalDpCtrl'
            });
            modalInstance.result.then(function (selectedDate) {
                $scope.filterCriteria.startDate = $filter('date')(selectedDate, "dd-MM-yyyy");
                $location.search('startDate', $scope.filterCriteria.startDate);

                $scope.dpModalOpen = false;
                $scope.filterResult();

            }, function () {
                $scope.filterCriteria.startDate = null;
                $location.search('startDate', null);
                $scope.filterCriteria.minusDays = '1';
                $location.search('minusDays', '1');
                $scope.dpModalOpen = false;
                $scope.filterResult();
            });
        };
    });
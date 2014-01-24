/**
 * Created by Ron on 17/01/14.
 */
reportsApp.controller('TestController',
    function ($scope, $location, $routeParams, TestService) {
        $scope.CheckNull = function (value) {
            return (value == null || value == '');
        };

        TestService.getTests({id: $routeParams.testId}).then(function (data) {
            $scope.test = data;
        }, function (response) {
            $scope.test = {};
            console.error(response);
        });

        TestService.getTestHistory({id: $routeParams.testId}).then(function (data) {
            $scope.testsHistory = data.tests;
            $scope.dataArray = [];
            $scope.catArray = [];
            angular.forEach(data.tests, function (test) {
                $scope.dataArray.push(test.durationSec);
            });
            angular.forEach(data.tests, function (test) {
                $scope.catArray.push(test.startTime);
            });
            $scope.testHistoryElapsedChart();
        }, function (response) {
            $scope.testsHistory = [];
            $scope.dataArray = [];
            $scope.catArray = [];
            console.log(response);
        });

        $scope.testHistoryElapsedChart = function () {
            $scope.testHistoryElapsed = {
                chart: {
                    type: 'column',
                    margin: [ 50, 50, 150, 80]
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: $scope.catArray,
                    labels: {
                        rotation: -55,
                        align: 'right',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Elapsed (seconds)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Elapsed: <b>{point.y:.1f} seconds</b>',
                },
                series: [
                    {
                        name: 'Elapsed',
                        data: $scope.dataArray,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#FFFFFF',
                            align: 'right',
                            x: 4,
                            y: 10,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif',
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                ]
            };
        };


    });
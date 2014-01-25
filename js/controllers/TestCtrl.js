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
            var dataArray = [];
            var catArray = [];
            for (var i = $scope.testsHistory.length - 1; i >= 0; i--) {
                var status;
                if ($scope.testsHistory[i].testStatus === 'SUCCESS') {
                    status = '#d0e9c6';
                } else {
                    status = '#ebcccc';
                }
                dataArray.push({y: $scope.testsHistory[i].durationSec, color: status});
            }

            for (var i = $scope.testsHistory.length - 1; i >= 0; i--) {
                catArray.push($scope.testsHistory[i].startTime);
            }

            $scope.testHistoryElapsedChart(dataArray, catArray);
        }, function (response) {
            $scope.testsHistory = [];
            $scope.dataArray = [];
            $scope.catArray = [];
            console.log(response);
        });

        $scope.testHistoryElapsedChart = function (dataArray, catArray) {
            $scope.testHistoryElapsed = {
                chart: {
                    type: 'column',
                    margin: [ 50, 50, 150, 80]
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: catArray,
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
                        data: dataArray,
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
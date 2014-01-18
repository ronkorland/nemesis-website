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
    });
/**
 * Created by Ron on 16/03/14.
 */
reportsApp.controller('SummaryEmailController', function ($scope) {

    $scope.tests = [{
        value: '1'
    },{
        value: '2'
    }]

    $scope.dd = function(){
        console.log($scope.currentId);
    }

    $scope.rightClick = function(value){
        console.log(value);
        $scope.currentId = value;
    }
});
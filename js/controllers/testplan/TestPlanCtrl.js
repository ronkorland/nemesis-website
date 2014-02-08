/**
 * Created by Ron on 26/01/14.
 */
reportsApp.controller('TestPlanController', function ($scope, $routeParams, TestPlanService) {
    $scope.testplanId = $routeParams.testplanId;

    TestPlanService.getTestPlans({id: $routeParams.testplanId}).then(function (data) {
        $scope.content = data.content;
        $scope.owner = data.owner;
        $scope.name = data.name;
        $scope.loaded = true;
    }, function () {
        $scope.loaded = false;
        $scope.content = null;
        $scope.owner = null;
        $scope.name = null;
    });

    $scope.uiTinymceConfig = {
        selector: "textarea",
        readonly : true,
        toolbar : false,
        menubar: false,
        statusbar: false,
        resize: false,
        height: 500
    };

});
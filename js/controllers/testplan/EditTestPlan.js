/**
 * Created by Ron on 08/02/14.
 */
reportsApp.controller('EditTestPlanController', function ($scope, $modal, $location, $routeParams, TestPlanService) {
    $scope.testplanId = $routeParams.testplanId;
    $scope.content = null;

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
        plugins: [
            "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table contextmenu directionality emoticons template textcolor paste fullpage textcolor save"
        ],

        toolbar1: "save | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
        toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | inserttime preview | forecolor backcolor",
        toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

        menubar: false,
        toolbar_items_size: 'small',

        templates: [
            {title: 'Test template 1', content: 'Test 1'},
            {title: 'Test template 2', content: 'Test 2'}
        ],
        height: 500,
        resize: false,
        browser_spellcheck: true,
        save_enablewhendirty: 0,
        save_oncancelcallback: function (e) {
            console.log(e);
        },
        save_onsavecallback: function (e) {
            $scope.openSaveDocModal();
        }
    };

    $scope.openSaveDocModal = function () {
        var modalInstance = $modal.open({
            templateUrl: '/template/modal/testPlanSaveModal.html',
            controller: 'TestPlanSaveModalCtrl',
            resolve: {
                owner: function () {
                    return $scope.owner;
                },
                name: function () {
                    return $scope.name;
                }
            }
        });
        modalInstance.result.then(function (input) {
            TestPlanService.updateTestPlan({id: $scope.testplanId, content: $scope.content, name: input.name, owner: input.owner}).then(function (data) {
                $location.path("/testplan/" + data.id);
            }, function () {

            });
            $scope.owner = input.owner;
            $scope.name = input.name;
        }, function () {

        });
    };

});
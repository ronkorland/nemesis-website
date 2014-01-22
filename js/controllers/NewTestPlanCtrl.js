/**
 * Created by Ron on 19/01/14.
 */

reportsApp.controller('NewTestPlanController', function ($scope, $modal) {

    $scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
    $scope.htmlcontent = $scope.orightml;

    $scope.ckEditors = [];
    $scope.addEditor = function () {
        var rand = "" + (Math.random() * 10000);
        $scope.ckEditors.push({value: rand});
    };

    $scope.uiTinymceConfig = {
        mode : "textareas",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code",
            "insertdatetime media table contextmenu paste pagebreak textcolor wordcount save"
        ],
        toolbar: "save cancel | insertfile undo redo | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        height: 500,
        resize: false,
        browser_spellcheck : true,
        save_enablewhendirty : 0,
        save_oncancelcallback : function(e){
            console.log(e);
            console.log($scope.htmlcontent);
            $scope.htmlcontent = e.startContent;
        },
        save_onsavecallback: function(e){
            $scope.openSaveDocModal();
        }
    };

    $scope.openSaveDocModal = function () {
        var modalInstance = $modal.open({
            templateUrl: '/template/modal/testPlanSaveModal.html',
            controller: 'TestPlanSaveModalCtrl'
        });
        modalInstance.result.then(function (input) {
            console.log(input);

        }, function () {

        });
    };

});
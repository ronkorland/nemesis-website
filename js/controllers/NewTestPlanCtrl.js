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
        selector: "textarea",
        plugins: [
            "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table contextmenu directionality emoticons template textcolor paste fullpage textcolor save"
        ],

        toolbar1: "save | newdocument | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
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
            console.log($scope.htmlcontent);
            $scope.htmlcontent = e.startContent;
        },
        save_onsavecallback: function (e) {
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
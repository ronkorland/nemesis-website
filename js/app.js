var reportsApp = angular.module('reportsApp', [ 'ngResource', 'ngSanitize',
    'highcart.charts.directives', 'ui.bootstrap', 'ngRoute', 'ui.tinymce', 'ng-context-menu' ]);

reportsApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        redirectTo: '/dashboard'
    });
    $routeProvider.when('/dashboard', {
        templateUrl: '/template/dashboard/Dashboard.html',
        controller: 'DashboardController',
        reloadOnSearch: false
    });
    $routeProvider.when('/suites', {
        templateUrl: '/template/suite/Suites.html',
        controller: 'SuitesController',
        reloadOnSearch: false
    });
    $routeProvider.when('/suite/:suiteId', {
        templateUrl: '/template/suite/Suite.html',
        controller: 'SuiteController',
        reloadOnSearch: false
    });
    $routeProvider.when('/tests', {
        templateUrl: '/template/test/Tests.html',
        controller: 'TestsController',
        reloadOnSearch: false
    });
    $routeProvider.when('/test/:testId', {
        templateUrl: '/template/test/Test.html',
        controller: 'TestController',
        reloadOnSearch: false
    });
    $routeProvider.when('/testplan/new', {
        templateUrl: '/template/testplan/NewTestPlan.html',
        controller: 'NewTestPlanController',
        reloadOnSearch: false
    });
    $routeProvider.when('/testplan/:testplanId', {
        templateUrl: '/template/testplan/TestPlan.html',
        controller: 'TestPlanController',
        reloadOnSearch: false
    });
    $routeProvider.when('/testplan/:testplanId/edit', {
        templateUrl: '/template/testplan/EditTestPlan.html',
        controller: 'EditTestPlanController',
        reloadOnSearch: false
    });
    $routeProvider.when('/testplans', {
        templateUrl: '/template/testplan/TestPlans.html',
        controller: 'TestPlansController',
        reloadOnSearch: false
    });
    $routeProvider.when('/sprints', {
        templateUrl: '/template/setting/Sprints.html',
        controller: 'SprintsController',
        reloadOnSearch: false
    });
    $routeProvider.when('/users', {
        templateUrl: '/template/setting/Users.html',
        controller: 'SprintsController',
        reloadOnSearch: false
    });
    $routeProvider.when('/summary-email', {
        templateUrl: '/template/setting/SummaryEmail.html',
        controller: 'SummaryEmailController',
        reloadOnSearch: false
    });
    $routeProvider.when('/grid', {
        templateUrl: '/template/grid/SeleniumGrid.html',
        controller: 'SprintsController',
        reloadOnSearch: false
    });
    $routeProvider.otherwise({
        templateUrl: '/template/404.html'
    });
    $locationProvider.html5Mode(false);
});

reportsApp.run([ '$rootScope', '$location', function ($rootScope, $location) {
    var path = function () {
        return $location.path();
    };
    $rootScope.$watch(path, function (newVal, oldVal) {
        $rootScope.activetab = newVal;
    });
} ]);
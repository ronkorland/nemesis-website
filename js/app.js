var reportsApp = angular.module('reportsApp', [ 'ngResource', 'ngSanitize',
    'highcart.charts.directives', 'ui.bootstrap', 'ngRoute' ]);

reportsApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        redirectTo: '/dashboard'
    });
    $routeProvider.when('/dashboard', {
        templateUrl: '/template/Dashboard.html',
        controller: 'DashboardController',
        reloadOnSearch: false
    });
    $routeProvider.when('/suites', {
        templateUrl: '/template/Suites.html',
        controller: 'SuitesController',
        reloadOnSearch: false
    });
    $routeProvider.when('/suite/:suiteId', {
        templateUrl: '/template/Suite.html',
        controller: 'SuiteController',
        reloadOnSearch: false
    });
    $routeProvider.when('/tests', {
        templateUrl: '/template/Tests.html',
        controller: 'TestsController',
        reloadOnSearch: false
    });
    $routeProvider.when('/test/:testId', {
        templateUrl: '/template/Test.html',
        controller: 'TestController',
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
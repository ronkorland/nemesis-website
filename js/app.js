var reportsApp = angular.module('reportsApp', [ 'ngResource', 'ngSanitize', 'ivpusic.cookie',
    'highcart.charts.directives', 'ui.bootstrap', 'ngRoute', 'ui.tinymce', 'ng-context-menu', 'angular-growl', 'angular-momentjs' ]);

reportsApp.config(function ($routeProvider, $locationProvider, $httpProvider, growlProvider) {
    growlProvider.globalTimeToLive(15000);

    $routeProvider.when('/', {
        redirectTo: '/dashboard'
    });
    $routeProvider.when('/login', {
        templateUrl: 'template/login/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/dashboard', {
        templateUrl: 'template/dashboard/Dashboard.html',
        controller: 'DashboardController',
        reloadOnSearch: false
    });
    $routeProvider.when('/suites', {
        templateUrl: 'template/suite/Suites.html',
        controller: 'SuitesController',
        reloadOnSearch: false
    });
    $routeProvider.when('/suite/:suiteId', {
        templateUrl: 'template/suite/Suite.html',
        controller: 'SuiteController',
        reloadOnSearch: false
    });
    $routeProvider.when('/tests', {
        templateUrl: 'template/test/Tests.html',
        controller: 'TestsController',
        reloadOnSearch: false
    });
    $routeProvider.when('/test/:testId', {
        templateUrl: 'template/test/Test.html',
        controller: 'TestController',
        reloadOnSearch: false
    });
    $routeProvider.when('/testplan/new', {
        templateUrl: 'template/testplan/NewTestPlan.html',
        controller: 'NewTestPlanController',
        reloadOnSearch: false
    });
    $routeProvider.when('/testplan/:testplanId', {
        templateUrl: 'template/testplan/TestPlan.html',
        controller: 'TestPlanController',
        reloadOnSearch: false
    });
    $routeProvider.when('/testplan/:testplanId/edit', {
        templateUrl: 'template/testplan/EditTestPlan.html',
        controller: 'EditTestPlanController',
        reloadOnSearch: false
    });
    $routeProvider.when('/testplans', {
        templateUrl: 'template/testplan/TestPlans.html',
        controller: 'TestPlansController',
        reloadOnSearch: false
    });
    $routeProvider.when('/sprints', {
        templateUrl: 'template/setting/Sprints.html',
        controller: 'SprintsController',
        reloadOnSearch: false
    });
    $routeProvider.when('/users', {
        templateUrl: 'template/setting/Users.html',
        controller: 'UsersController',
        reloadOnSearch: false
    });
    $routeProvider.when('/summary-email', {
        templateUrl: 'template/setting/SummaryEmail.html',
        controller: 'SummaryEmailController',
        reloadOnSearch: false
    });
    $routeProvider.when('/grid', {
        templateUrl: 'template/grid/SeleniumGrid.html',
        controller: 'GridController',
        reloadOnSearch: false
    });
    $routeProvider.otherwise({
        templateUrl: 'template/404.html'
    });
    $locationProvider.html5Mode(false);

    /* Register error provider that shows message on failed requests or redirects to login page on
     * unauthenticated requests */
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
            return {
                'responseError': function (rejection) {
                    var status = rejection.status;
                    var config = rejection.config;
                    var method = config.method;
                    var url = config.url;

                    if (status == 401) {
                        $location.path("/login");
                    } else {
                        $rootScope.error = method + " on " + url + " failed with status " + status;
                    }

                    return $q.reject(rejection);
                }
            };
        }
    );

    /* Registers auth token interceptor, auth token is either passed by header or by query parameter
     * as soon as there is an authenticated user */
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
            return {
                'request': function (config) {
                    var isRestCall = config.url.indexOf('/api/') != -1;
                    if (isRestCall && angular.isDefined($rootScope.authToken)) {
                        var authToken = $rootScope.authToken;
                        if (appConfig.useAuthTokenHeader) {
                            config.headers['X-Auth-Token'] = authToken;
                        } else {
                            config.url = config.url + "?token=" + authToken;
                        }
                    }
                    return config || $q.when(config);
                }
            };
        }
    );
});

reportsApp.run(function ($rootScope, $location, ipCookie, LoginService) {

    var path = function () {
        return $location.path();
    };
    $rootScope.$watch(path, function (newVal, oldVal) {
        $rootScope.activetab = newVal;
    });

    /* Reset error when a new view is loaded */
    $rootScope.$on('$viewContentLoaded', function () {
        delete $rootScope.error;
    });

    $rootScope.hasPermission = function (permission) {

        if ($rootScope.user === undefined) {
            return false;
        }

        if ($rootScope.user.mapPermissions[permission] === undefined) {
            return false;
        }

        return $rootScope.user.mapPermissions[permission];
    };

    $rootScope.logout = function () {
        delete $rootScope.user;
        delete $rootScope.authToken;
        ipCookie.remove('authToken');
        $location.path("/login");
    };

    /* Try getting valid user from cookie or go to login page */
    var originalPath = $location.path();
    $location.path("/login");
    var authToken = ipCookie('authToken');
    if (authToken !== undefined) {
        $rootScope.authToken = authToken;
        LoginService.current(function (user) {
            $rootScope.user = user;
            $location.path(originalPath);
        });
    }
});

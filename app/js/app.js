(function () {
    'use strict';

    var _appConfigs = {
        appName: 'ITracker',
        service: {
            baseUrl: 'http://softuni-issue-tracker.azurewebsites.net/'
        }
    };

    /**
     *  @name run
     *  @desc tasks on app run
     *  @param $rootScope
     *  @param $location
     *  @param identityService
     */
    function run($rootScope, $location, identityService) {
        $rootScope.$on('$routeChangeStart', function() {
            if (!identityService.isLoggedIn()) {
                $location.path('/');
            }
        });
    }

    /**
     *  @name appConfig
     *  @desc Config Routes
     *
     *  @param $routeProvider
     *  @param $locationProvider
     *  @param $httpProvider
     *  @param ngToastProvider
     *
     *  @return void
     */
    function appConfig($routeProvider, $locationProvider, $httpProvider, ngToastProvider) {
        ngToastProvider.configure({
            animation: 'fade',
            dismissButton: true,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
        });

        /**
         *  @param $q
         *  @param ngToast
         *  @returns {Object}
         */
        function httpNotificationInterceptor($q, ngToast) {
            var interceptor = {};

            interceptor.responseError = function(rejection) {
                if (rejection.data && rejection.data.error_description) {
                    var errorMessage = rejection.data.error_description;

                    ngToast.danger(errorMessage);
                }

                if (rejection.data && rejection.data.ModelState) {
                    var errors = Object.keys(rejection.data.ModelState);

                    errors.forEach(function(error) {
                        var errorMessages = rejection.data.ModelState[error];

                        errorMessages.forEach(function(message) {
                            ngToast.danger(message);
                        });
                    });
                }

                return $q.reject(rejection);
            };

            return interceptor;
        }

        /**
         *  @name httpHeadersInterceptor
         *  @desc Edit request config on each http request
         *  @param credentialService
         *  @returns {{}}
         */
        function httpHeadersInterceptor(credentialService) {
            var interceptor = {};

            interceptor.request = function(requestConfig) {
                var credentials = credentialService.getCredentials();

                if (credentials) {
                    var isExternalRequest = requestConfig.url.indexOf('http') > -1 || requestConfig.url.indexOf('https') > -1;

                    if (isExternalRequest)
                    {
                        requestConfig.headers['Authorization'] = 'Bearer ' + credentials.access_token;
                    }
                }

                return requestConfig;
            };

            return interceptor;
        }

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: '/app/views/home.html',
                controllerAs: 'home'
            })
            .when('/projects', {
                controller: 'ProjectsController',
                templateUrl: '/app/views/projects.html',
                controllerAs: 'projects'
            })
            .otherwise({
                redirectTo: '/'
            });

        // Global Error Notifications
        $httpProvider.interceptors.push(['$q', 'ngToast', httpNotificationInterceptor]);

        // Global Http Request Headers
        $httpProvider.interceptors.push(['credentialService', httpHeadersInterceptor]);
    }

    angular
        .module('ITracker', ['ngRoute', 'ngCookies', 'ngToast', 'ui.bootstrap'])
        .constant('APP_CONFIGS', _appConfigs)
        .config(['$routeProvider', '$locationProvider', '$httpProvider', 'ngToastProvider', appConfig])
        .run(['$rootScope', '$location', 'identityService', run]);
}());

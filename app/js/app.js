(function () {
    'use strict';

    /**
     *  @name routeConfig
     *  @desc Config Routes
     *
     *  @param $routeProvider
     *  @param $locationProvider
     *  @param $httpProvider
     *  @param $q
     *
     *  @return void
     */
    function routeConfig($routeProvider, $locationProvider, $httpProvider) {
        /**
         *  @param $q
         *  @returns {Object}
         */
        function httpNotificationInterceptor($q) {
            var interceptor = {};

            interceptor.response = function(response) {
                return response;
            };

            interceptor.responseError = function(rejection) {
                if (rejection.data && rejection.data.error_description) {
                    var errorMessage = rejection.data.error_description;
                    console.log(errorMessage);
                }

                if (rejection.data && rejection.data.ModelState) {
                    var errors = Object.keys(rejection.data.ModelState);

                    errors.forEach(function(error) {
                        console.log(rejection.data.ModelState[error]);
                    });
                }

                return $q.reject(rejection);
            };

            return interceptor;
        }

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'app/views/home.html',
                controllerAs: 'home'
            })
            .otherwise({
                redirectTo: '/'
            });

        // TODO: Create interceptor in better way and notify errors
        $httpProvider.interceptors.push(['$q', httpNotificationInterceptor]);
    }

    /**
     * @type {{appName: string, service: {baseUrl: string}}}
     * @private
     */
    var _appConfigs = {
        appName: 'ITracker',
        service: {
            baseUrl: 'http://softuni-issue-tracker.azurewebsites.net/api/'
        }
    };

    angular
        .module('ITracker', ['ngRoute', 'ngCookies'])
        .constant('APP_CONFIGS', _appConfigs)
        .config(['$routeProvider', '$locationProvider', '$httpProvider', routeConfig])
        .run();
}());

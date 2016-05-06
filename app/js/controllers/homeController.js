(function () {
    'use strict';

    function HomeController(identityService, credentialService) {
        var controller = this,
            _defaultAction = 'login';

        controller.action = _defaultAction;

        controller.show = function(action) {
            controller.action = action || _defaultAction;
        };

        //controller.isLoggedIn = identityService.isLoggedIn();

        // Login
        controller.login = function(loginData) {
            function successHandler(successData) {
                console.log('Welcome ' + successData.userName);

                credentialService.saveCredentials(successData);
            }

            function errorHandler(errorData) {
                //console.log(errorData);
            }

            identityService.login(loginData)
                .then(successHandler, errorHandler);
        };

        // Register
        controller.register = function(registerData) {
            var self = this;

            function successHandler() {
                self.login(registerData);
            }

            function errorHandler(errorData) {
                //console.log(errorData);
            }

            identityService.register(registerData)
                .then(successHandler, errorHandler);
        };
    }

    angular
        .module('ITracker')
        .controller('HomeController', ['identityService', 'credentialService', HomeController]);
} ());
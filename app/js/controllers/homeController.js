(function () {
    'use strict';

    function HomeController(identityService, credentialService) {
        var controller = this,
            _defaultActiveForm = 'login';

        controller.activeForm = _defaultActiveForm;
        controller.toggleActiveForm = function(formName) {
            controller.activeForm = formName || _defaultActiveForm;
        };

        controller.isActiveForm = function(formName) {
            return formName === controller.activeForm;
        };

        // IsLoggedIn
        controller.isLoggedIn = identityService.isLoggedIn;

        // Login
        controller.login = function(loginData) {
            function successHandler(successData) {
                console.log('Welcome ' + successData.userName);

                credentialService.saveCredentials(successData);
            }

            identityService.login(loginData)
                .then(successHandler);
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
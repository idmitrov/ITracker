(function () {
    'use strict';

    function HomeController(identityService, credentialService, ngToast) {
        var controller = this,
            _defaultActiveForm = 'login';

        controller.activeForm = _defaultActiveForm;

        controller.toggleActiveForm = function(formName) {
            controller.activeForm = formName || _defaultActiveForm;
        };

        controller.isActiveForm = function(formName) {
            return formName === controller.activeForm;
        };

        controller.isLoggedIn = identityService.isLoggedIn;

        controller.login = function(loginData) {
            function successHandler(successData) {
                ngToast.success('Welcome ' + successData.userName);

                credentialService.saveCredentials(successData);
            }

            identityService.login(loginData)
                .then(successHandler);
        };

        controller.register = function(registerData) {
            var self = this;

            function successHandler() {
                self.login(registerData);
            }

            identityService.register(registerData)
                .then(successHandler);
        };
    }

    angular
        .module('ITracker')
        .controller('HomeController', ['identityService', 'credentialService', 'ngToast', HomeController]);
} ());
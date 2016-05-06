(function () {
    'use strict';

    function IdentityService(credentialService, requestService, APP_CONFIGS) {
        var service = {},
            _serviceEndPont = APP_CONFIGS.service.baseUrl + 'account/';

        service.isLoggedIn = function() {
            return !!credentialService.getCredentials();
        };

        /**
         *  @name login
         *  @desc login an existing user
         *  @param loginCredentials
         *  @returns {*|HttpPromise}
         */
        service.login = function(loginCredentials) {
            var headers = { 'Content-Type': 'application/x-www-form-urlencoded' },
                credentials =  'grant_type=password&username=' + loginCredentials.email +'&password=' + loginCredentials.password;

            return requestService.post(APP_CONFIGS.service.baseUrl + 'token', credentials, headers);
        };

        service.register = function(registerCredentials) {
            return requestService.post(_serviceEndPont + 'register', registerCredentials, null);
        };

        service.logout = function() {
            credentialService.destroyCredentials();
        };

        return service;
    }

    angular
        .module('ITracker')
        .service('identityService', ['credentialService', 'requestService', 'APP_CONFIGS', IdentityService]);
}());
(function () {
    'use strict';

    function IdentityService(credentialService, requestService, APP_CONFIGS) {
        var service = {},
            _serviceEndpoint = APP_CONFIGS.service.baseUrl + 'account/';

        /**
         *  @name isLoggedIn
         *  @desc Return true/false if user is logged in
         *
         *  @returns {boolean}
         */
        service.isLoggedIn = function() {
            return !!credentialService.getCredentials();
        };

        /**
         *  @name login
         *  @desc login an existing user
         *  @param {Object} loginCredentials
         *
         *  @returns {*|HttpPromise}
         */
        service.login = function(loginCredentials) {
            var headers = { 'Content-Type': 'application/x-www-form-urlencoded' },
                credentials =  'grant_type=password&username=' + loginCredentials.email +'&password=' + loginCredentials.password;

            return requestService.post(APP_CONFIGS.service.baseUrl + 'token', credentials, headers);
        };

        /**
         *  @name register
         *  @desc Register new user
         *  @param {Object} registerCredentials
         *
         *  @returns {*|HttpPromise}
         */
        service.register = function(registerCredentials) {
            return requestService.post(_serviceEndpoint + 'register', registerCredentials, null);
        };

        /**
         *  @name logout
         *  @desc Logout an existing user
         *
         *  @return void
         */
        service.logout = function() {
            credentialService.destroyCredentials();
        };

        return service;
    }

    angular
        .module('ITracker')
        .factory('identityService', ['credentialService', 'requestService', 'APP_CONFIGS', IdentityService]);
}());
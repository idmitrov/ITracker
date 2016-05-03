(function () {
    "use strict";

    function credentialService($cookies) {
        var service = {};

        /**
         *  @name getCredentials
         *  @desc Get credentials from cookies and return JSON Object
         *
         *  @returns {*}
         */
        service.getCredentials = function() {
            var credentials = $cookies.get('_ITracker');

            console.log(credentials);
            if (credentials) {
                credentials = JSON.parse(credentials);
            }

            return credentials;
        };

        /**
         *  @name saveCredentials
         *  @desc Save credentials object in cokkies as JSON String
         *  @param credentialsObject
         */
        service.saveCredentials = function(credentialsObject) {
            $cookies.set('_ITracker', JSON.stringify(credentialsObject));
        };

        /**
         *  @name deleteCredentials
         *  @desc Cleanup cookies
         */
        service.deleteCredentials = function() {
            $cookies.remove('_ITracker');
        };

        return service;
    }

    angular
        .module('ITracker')
        .factory('credentialService', ['$cookies' ,credentialService]);
} ());
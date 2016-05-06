(function() {
    "use strict";

    function requestService($q, $http) {
        var service = {};

        function _makeHttpRequest(method, url, data, headers) {
            var deferred = $q.defer();

            $http({
                method: method,
                url: url,
                headers: headers,
                data: data
            })
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        /**
         *  @name get
         *  @desc Make http GET request
         *  @param {String} url
         *  @param {Object} data
         *  @param {Object} headers
         *  @returns {Function}
         */
        service.get = function(url, data, headers) {
            return _makeHttpRequest('GET', url, data, headers);
        };

        /**
         *  @name post
         *  @desc Make http POST request
         *  @param {String} url
         *  @param {Object} data
         *  @param {Object} headers
         *  @returns {Function}
         */
        service.post = function(url, data, headers) {
            return _makeHttpRequest('POST', url, data, headers);
        };

        return service;
    }

    angular
        .module('ITracker')
        .factory('requestService', ['$q', '$http', requestService]);
} ());
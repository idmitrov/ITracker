(function () {
    "use strict";

    function issuesService() {
        var service = {},
            _serviceEndpoint;

        service.getAll = function() {
            return {test: "TEST"};
        };

        return service;
    }

    angular
        .module('ITracker')
        .factory('issuesService', [issuesService]);
} ());
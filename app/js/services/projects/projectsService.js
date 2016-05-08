(function () {
    "use strict";

    function projectsService(requestService, APP_CONFIGS) {
        var service = {},
            _serviceEndpoint = APP_CONFIGS.service.baseUrl+ 'projects/';

        service.getProjectById = function(id) {
            return requestService.get(_serviceEndpoint + id);
        };

        return service;
    }

    angular
        .module('ITracker')
        .factory('projectsService', ['requestService', 'APP_CONFIGS', projectsService]);
} ());
(function () {
    "use strict";

    function projectsService(requestService, APP_CONFIGS) {
        var service = {},
            _defaultPageSize = 4,
            _serviceEndpoint = APP_CONFIGS.service.baseUrl+ 'projects';

        service.getProjectById = function(id) {
            var query = '/' + id;

            return requestService.get(_serviceEndpoint + query);
        };

        service.getAll = function(pageNumber) {
            var query = '?filter=';
            pageNumber = pageNumber || 1;

            query += '&pageSize=' + _defaultPageSize;
            query += '&pageNumber=' + pageNumber;

            return requestService.get(_serviceEndpoint  + query);
        };

        return service;
    }

    angular
        .module('ITracker')
        .factory('projectsService', ['requestService', 'APP_CONFIGS', projectsService]);
} ());
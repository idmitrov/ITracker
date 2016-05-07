(function () {
    "use strict";

    function issuesService(APP_CONFIGS, requestService) {
        var service = {},
            _serviceEndpoint = APP_CONFIGS.service.baseUrl + 'issues/',
            _defaultOrderType = 'DueDate';

        service.orderType = _defaultOrderType;

        /**
         *  @name changeOrderType
         *  @desc   Change orderType by given type
         *  @param {String} type
         *
         *  @returns void
         */
        service.changeOrderType = function(type) {
            service.orderType = type || _defaultOrderType;
        };

        /**
         *  @name getMyIssues
         *  @desc Get all issues belong to logged user
         *
         * @returns {*|HttpPromise}
         */
        service.getMyIssues = function(pageNumber, pageSize) {
            var query = _serviceEndpoint + 'me?';

            pageSize = pageSize || 5;
            query += 'orderBy=' + service.orderType;
            query += '&pageSize=' + pageSize;
            query += '&pageNumber=' + pageNumber;

            return requestService.get(query);
        };

        service.getIssueById = function(id) {
            return requestService.get(_serviceEndpoint + id);
        };

        return service;
    }

    angular
        .module('ITracker')
        .factory('issuesService', ['APP_CONFIGS', 'requestService', issuesService]);
} ());
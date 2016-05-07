(function () {
    "use strict";

    function IssueController(issuesService, $routeParams) {
        var controller = this;

        function getIssueSuccessData(successData) {
            controller.issueDetails = successData;
        }

        controller.getIssueDetails = issuesService.getIssueById($routeParams.id)
            .then(getIssueSuccessData);
    }

    angular
        .module('ITracker')
        .controller('IssueController', ['issuesService', '$routeParams', IssueController]);
} ());
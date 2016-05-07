(function () {
    "use strict";

    function issuesBoard(credentialService, issuesService, $http) {
        var directive = {};

        directive.restrict = 'AE';
        directive.replace = true;
        directive.templateUrl = '/app/views/partials/issues/issues-board.html';
        directive.link = function(scope) {
            function getIssuesSuccessHandler(successData) {
                scope.myIssues = successData;
                scope.totalPages = successData.TotalPages;
                console.log(scope.myIssues);
            }

            function getMyIssues() {
                //var token = credentialService.getCredentials().access_token;


                return issuesService.getMyIssues(1);
            }

            scope.myIssues = getMyIssues()
                .then(getIssuesSuccessHandler);
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('issuesBoard', ['credentialService', 'issuesService', '$http', issuesBoard]);
} ());
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
                console.log(scope.myIssues);
            }

            function getMyIssues() {
                var token = credentialService.getCredentials().access_token;

                $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                return issuesService.getMyIssues();
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
(function () {
    "use strict";

    function issuesBoard(issuesService) {
        var directive = {};

        directive.restrict = 'AE';
        directive.replace = true;
        directive.templateUrl = '/app/views/partials/issues/issues-board.html';
        directive.link = function(scope) {
            function getIssuesSuccessHandler(successData) {
                scope.myIssues = successData;
                scope.totalPages = successData.TotalPages;
            }

            scope.currentPage = 1;
            issuesService.getMyIssues(scope.currentPage)
                .then(getIssuesSuccessHandler);
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('issuesBoard', ['issuesService', issuesBoard]);
} ());
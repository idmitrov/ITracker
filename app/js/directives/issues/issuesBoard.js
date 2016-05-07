(function () {
    "use strict";

    function issuesBoard(issuesService) {
        var directive = {},
            _defaultPage = 1;

        directive.restrict = 'AE';
        directive.replace = true;
        directive.templateUrl = '/app/views/partials/issues/issues-board.html';
        directive.link = function(scope) {
            function getIssuesSuccessHandler(successData) {
                scope.myIssues = successData;
                scope.totalPages = successData.TotalPages;
                scope.totalItems = successData.TotalCount;
            }

            scope.getIssues = function(currentPage) {
                console.log(currentPage);
                currentPage = currentPage || _defaultPage;
                issuesService.getMyIssues(currentPage)
                    .then(getIssuesSuccessHandler);
            };

            scope.myIssues = issuesService.getMyIssues(_defaultPage)
                .then(getIssuesSuccessHandler);
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('issuesBoard', ['issuesService', issuesBoard]);
} ());
(function () {
    "use strict";

    function issuesBoard(issuesService) {
        var directive = {};

        directive.restrict = 'AE';
        directive.replace = true;
        directive.templateUrl = '/app/views/partials/issues/issues-board.html';
        directive.link = function(scope) {
            function getIssuesSuccessHandler(successData) {
                console.log(successData);
            }

            scope.myIssues = issuesService.getMyIssues()
                .then(getIssuesSuccessHandler);
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('issuesBoard', ['issuesService', issuesBoard]);
} ());
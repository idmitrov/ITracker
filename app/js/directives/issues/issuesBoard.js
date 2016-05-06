(function () {
    "use strict";

    function issuesBoard(issuesService) {
        var directive = {};

        directive.restrict = 'AE';
        directive.replace = true;
        directive.templateUrl = '/app/views/partials/issues/issues-board.html';
        directive.link = function(scope) {
            scope.getAll = issuesService.getAll;
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('issuesBoard', ['issuesService', issuesBoard]);
} ());
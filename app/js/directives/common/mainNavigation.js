(function () {
    "use strict";

    function mainNavigation(identityService) {
        var directive = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/app/views/partials/common/main-navigation.html';
        directive.replace = true;
        directive.link = function(scope) {
            scope.isLoggedIn = identityService.isLoggedIn();
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('mainNavigation', ['identityService', mainNavigation]);
} ());
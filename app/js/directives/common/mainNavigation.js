(function () {
    "use strict";

    function mainNavigation(identityService, ngToast) {
        var directive = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/app/views/partials/common/main-navigation.html';
        directive.replace = true;
        directive.link = function(scope) {
            scope.isLoggedIn = identityService.isLoggedIn;


            scope.logout = function() {
                identityService.logout();
                ngToast.success('Logout Success');
            };
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('mainNavigation', ['identityService', 'ngToast', mainNavigation]);
} ());
(function () {
    "use strict";

    function changePasswordForm(identityService, ngToast, $route) {
        var directive = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/app/views/partials/identity/change-password-form.html';
        directive.replace = true;
        directive.link = function(scope) {
            function changePasswordSuccessHandler() {
                ngToast.success('Password successful changed');
                $route.reload();
            }

            scope.changePassword = function(changedCredentials, changePasswordForm) {
                if (changePasswordForm.$valid) {
                    identityService.changePassword(changedCredentials)
                        .then(changePasswordSuccessHandler);
                } else {
                    ngToast.danger('There is something wrong with your request');
                }
            };
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('changePasswordForm', ['identityService', 'ngToast', '$route', changePasswordForm]);
} ());
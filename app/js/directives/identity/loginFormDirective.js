(function () {
    "use strict";

    function loginForm(ngToast) {
        var directive = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/app/views/partials/identity/login-form.html';
        directive.replace = true;
        directive.controller = 'IdentityController';
        directive.link = function(scope, element, attributes, controller) {
            scope.login = function(loginData, loginForm) {
                if (loginForm.$valid) {
                    controller.login(loginData);
                } else {
                    ngToast.danger('There is something wrong with your request');
                }
            };
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('loginForm', ['ngToast', loginForm]);
} ());
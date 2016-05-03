(function () {
    "use strict";

    function loginForm() {
        var directive = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/app/views/partials/identity/login-form.html';
        directive.replace = true;
        directive.controller = 'HomeController';
        directive.link = function(scope, element, attributes, controller) {
            scope.login = function(loginData, loginForm) {
                if (loginForm.$valid) {
                    controller.login(loginData);
                } else {
                    // TODO: Notification
                }
            };
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('loginForm', [loginForm]);
} ());
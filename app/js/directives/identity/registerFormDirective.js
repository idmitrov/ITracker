(function () {
    "use strict";

    function registerForm() {
        var directive = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/app/views/partials/identity/register-form.html';
        directive.replace = true;
        directive.controller = 'HomeController';
        directive.link = function(scope, element, attributes, controller) {
            scope.register = function(registerData, registerForm) {
                if (registerForm.$valid) {
                    controller.register(registerData);
                } else {
                    // TODO: Notification
                }
            };
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('registerForm', [registerForm]);
} ());
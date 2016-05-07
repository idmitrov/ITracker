(function () {
    "use strict";

    function registerForm(ngToast) {
        var directive = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/app/views/partials/identity/register-form.html';
        directive.replace = true;
        directive.controller = 'IdentityController';
        directive.link = function(scope, element, attributes, controller) {
            scope.register = function(registerData, registerForm) {
                if (registerForm.$valid) {
                    controller.register(registerData);
                } else {
                    ngToast.error('There is something wrong with your request');
                }
            };
        };

        return directive;
    }

    angular
        .module('ITracker')
        .directive('registerForm', ['ngToast', registerForm]);
} ());
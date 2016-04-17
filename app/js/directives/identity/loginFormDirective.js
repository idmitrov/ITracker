(function() {
	function loginFormDirective() {
		var directive = {};

		directive.restrict = 'AE';
		directive.templateUrl = '/app/views/partials/identity/loginForm.html',
		directive.repace = true;

		return directive;
	}

	angular
		.module('ITracker')
		.directive('loginForm', [loginFormDirective]);
} ());
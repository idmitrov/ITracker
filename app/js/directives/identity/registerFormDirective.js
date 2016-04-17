(function () {
	'use strict';
	function registerForm() {
		var directive = {};

		directive.restrict = 'AE';
		directive.templateUrl = 'app/views/partials/identity/registerForm.html';
		directive.replace = true;

		return directive;
	}

	angular
		.module('ITracker')
		.directive('registerForm', [registerForm]);
} ());
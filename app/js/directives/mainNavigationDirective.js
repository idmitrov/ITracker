(function() {
	function mainNavigationDirective() {
		var directive = {};

		directive.restrict = 'AE';
		directive.templateUrl = '/app/views/partials/mainNavigation.html',
		directive.replace = true;

		return directive;
	}

	angular
		.module('ITracker')
		.directive('mainNavigation', [mainNavigationDirective]);
} ());
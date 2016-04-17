(function() {
	function mainNavigationDirective() {
		var directive = {};

		directive.restrict = 'AE';
		directive.templateUrl = '/app/views/partials/common/mainNavigation.html',
		directive.replace = true;

		return directive;
	}

	angular
		.module('ITracker')
		.directive('mainNavigation', [mainNavigationDirective]);
} ());
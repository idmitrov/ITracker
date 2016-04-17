(function() {
	'use strict';

	function config($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
				'templateUrl': '/app/views/home.html',
				'controller': 'IdentityController'
			})
			.otherwise({
				'redirectTo': '/'
			});
	}

	/**
	*	@name ITracker
	*	@desc Issue Tracking System
	*/
	angular
		.module('ITracker', ['ngRoute'])
		.config(['$routeProvider', '$locationProvider', config]);
} ());
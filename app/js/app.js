(function() {
	'use strict';

	function config($routeProvider, $locationProvider) {
		// Enable HTML5 Routing
		$locationProvider.html5Mode(true);

		// Routes
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
		.module('ITracker', ['ngRoute', 'ngCookies'])
		.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/')
		.config(['$routeProvider', '$locationProvider', config]);
} ());
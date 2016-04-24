(function() {
	'use strict';

	function config($routeProvider, $locationProvider) {
		// Enable HTML5 Routing
		$locationProvider.html5Mode(true);

		// Routes
		$routeProvider
			.when('/', {
				'templateUrl': '/app/views/home.html',
				'controller': 'IdentityController',
				'controllerAs': 'identity'
			})
			.otherwise({
				'redirectTo': '/'
			});
	}

	function run($rootScope, identityService) {
		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			console.log(identityService.isLoggedIn());
		})
	}

	/**
	*	@name ITracker
	*	@desc Issue Tracking System
	*/
	angular
		.module('ITracker', ['ngRoute', 'ngCookies'])
		.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/')
		.config(['$routeProvider', '$locationProvider', config])
		.run(['$rootScope', 'identityService', run]);
} ());
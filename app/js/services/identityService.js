(function() {
	'use strict';

	function identityService(requestingService, baseUrl, $cookies) {
		var _serviceUrl = baseUrl + 'account/',
			service = {},
			_saveCookies = function(cookiesObj) {
				$cookies.put('itracker', JSON.stringify(cookiesObj));
			},
			_getCookies = function(propName) {
				var cookies = JSON.parse($cookies.get('itracker'));

				if (!propName) {
					return cookies;
				} else {
					return cookies[propName];
				}
			};

		/**
		*	@name Login
		*	@desc Login an existing user
		*	@param {Object} loginData
		*	@return {Function} requestingService
		*/
		service.login = function(loginData) {
			var headers = { 'Content-Type': 'application/x-www-form-urlencoded' },
				credentials = 'grant_type=password&username=' + loginData.username +'&password=' + loginData.password;

			return requestingService('POST', baseUrl + 'token', headers, credentials);
		};

		/**
		*	@name Register
		*	@desc Register a new user
		*	@param {Object} registerData
		*	@return {Function} requestingService
		*/
		service.register = function(registerData) {
			return requestingService('POST', _serviceUrl + 'register', null, registerData);
		};

		/**
		*	@name saveCredentials
		*	@desc save logged user Token and Username
		*	in JSON string
		*	@param {Object} credentials
		*
		*	@return void
		*/
		service.saveCredentials = function(credentials) {
			_saveCookies(credentials);
		};

		/**
		*	getCredentials
		*	@desc get cookies itracker object
		*
		*	@return {Object} credentials
		*/
		service.getCredentials = function() {
			var credentials = _getCookies();
			
			return credentials;
		};

		/**
		*	@name isLoggedIn
		*	@desc Check if given user is logged
		*
		*	@return void
		*/
		service.isLoggedIn = function() {
			var isLogged = _getCookies() === undefined ? false : true;

			return isLogged;
		};

		return service;
	}

	angular
		.module('ITracker')
		.factory('identityService', ['requestingService', 'BASE_URL', '$cookies', identityService]);
} ());
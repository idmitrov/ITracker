(function() {
	'use strict';

	function identityService(requestingService, baseUrl, $cookies) {
		var _serviceUrl = baseUrl + 'account/',
			service = {},
			_credentialsCache,
			_saveCookies = function(cookiesObj) {
				$cookies.put('itracker', JSON.stringify(cookiesObj));
			},
			_getCookies = function(propName) {
				var cookies = $cookies.get('itracker');

				if (cookies) {
					JSON.parse(cookies);

					if (!propName) {
						return cookies;
					} else {
						return cookies[propName];
					}
				} else {
					// TODO Throw no cookies found
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
			this._credentialsCache = credentials;
		};

		/**
		*	getCredentials
		*	@desc get cookies itracker object
		*
		*	@return {Object} credentials
		*/
		service.getCredentials = function() {
			var credentials;

			if (this._credentialsCache) {
				credentials = this._credentialsCache;
			} else {
				credentials = _getCookies();
				this._credentialsCache = credentials;
			}
			
			return credentials;
		};

		/**
		*	@name isLoggedIn
		*	@desc Check if given user is logged
		*
		*	@return {Boolean} isLogged
		*/
		service.isLoggedIn = function() {
			var isLogged = this.getCredentials() === undefined ? false : true;

			return isLogged;
		};

		return service;
	}

	angular
		.module('ITracker')
		.factory('identityService', ['requestingService', 'BASE_URL', '$cookies', identityService]);
} ());
(function() {
	function identityService(requestingService, baseUrl) {
		var _serviceUrl = baseUrl + 'account/',
			service = {};

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
		}

		/**
		*	@name Register
		*	@desc Register a new user
		*	@param {Object} registerData
		*	@return {Function} requestingService
		*/
		service.register = function(registerData) {
			return requestingService('POST', _serviceUrl + 'register', null, registerData);
		}

		return service;
	}

	angular
		.module('ITracker')
		.factory('identityService', ['requestingService', 'BASE_URL', identityService]);
} ());
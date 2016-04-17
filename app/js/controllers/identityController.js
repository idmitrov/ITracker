(function() {
	'use strict';

	function IdentityController($cookies, identityService, notifyingService) {
		var controller = this,
			defaultAction = 'login',
			_saveCookies = function(obj) {
				$cookies.put('itracker', JSON.stringify(obj));
			},
			_getCookies = function() {
				return JSON.parse($cookies.get('itracker'));
			},
			_makeLoginRequest = function(data) {
				function successHandler(successData) {			
					var cookies = {
						token: successData.access_token,
						username: successData.userName
					}

					_saveCookies(cookies);
					notifyingService.success('Welcome ' + data.username)
				}

				function errorHandler(errorData) {
					notifyingService.error(errorData.error_description);
				}

				identityService.login(data)
					.then(successHandler, errorHandler);
			},
			/**
			*	@name Show
			*	@desc Show Register/Login form depends of the action
			*	@param {String} action
			*/
			show = function(action) {
				controller.action = action || defaultAction;		
			},
			/**
			*	@name Login
			*	@desc Call identity Login
			*	@param {Object} loginData
			*	@param {Object} loginForm
			*/
			login = function(loginData, loginForm) {
				if (loginForm.$valid) {
					_makeLoginRequest(loginData);
				}
			},
			/**
			*	@name Register
			*	@desc Call identity Register and if register success
			*	then call identity Login to login user
			*	@param {Object} registerData
			*	@param {Object} registerForm
			*/
			register = function(registerData, registerForm) {
				if (registerForm.$valid) {
					function successHandler(successData) {
						var credentials = {
							username: registerData.email,
							password: registerData.password
						}

						_makeLoginRequest(credentials);
					}

					function errorHandler(errorData) {
						console.log(errorData);
						notifyingService.error(errorData);
					}

					identityService.register(registerData)
						.then(successHandler, errorHandler);
				}
			};

		controller.action = defaultAction;
		controller.show = show;
		controller.login = login;
		controller.register = register;
	}

	angular
		.module('ITracker')
		.controller('IdentityController', ['$cookies', 'identityService', 'notifyingService', IdentityController]);
} ());


(function() {
	'use strict';

	function IdentityController(identityService, notifyingService) {
		var controller = this,
			_defaultAction = 'login',
			_makeLoginRequest = function(data) {
				function successHandler(successData) {			
					identityService.saveCredentials({
						token: successData.access_token,
						username: successData.userName
					});

					notifyingService.success('Welcome ' + successData.userName);
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
			*	
			*	@return void
			*/
			show = function(action) {
				controller.action = action || _defaultAction;		
			},
			/**
			*	@name IsLoggedIn
			*	@desc Check for logged user
			*	
			*	@return void
			*/
			isLoggedIn = function() {
				identityService.isLoggedIn();
			},
			/**
			*	@name Login
			*	@desc Call identity Login
			*	@param {Object} loginData
			*	@param {Object} loginForm
			*	
			*	@return void
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
			*	
			*	@return void
			*/
			register = function(registerData, registerForm) {
				if (registerForm.$valid) {
					function successHandler(successData) {
						_makeLoginRequest({
							username: registerData.email,
							password: registerData.password
						});
					}

					function errorHandler(errorData) {
						// TODO: Implement ModelState Error(s) Parse
						console.log(errorData);
						notifyingService.error(errorData);
					}

					identityService.register(registerData)
						.then(successHandler, errorHandler);
				}
			};

		controller.action = _defaultAction;
		controller.show = show;
		controller.login = login;
		controller.register = register;
		controller.isLoggedIn = isLoggedIn;
	}

	angular
		.module('ITracker')
		.controller('IdentityController', ['identityService', 'notifyingService', IdentityController]);
} ());


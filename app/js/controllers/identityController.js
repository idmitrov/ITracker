(function() {
	'use strict';

	function IdentityController($cookies, identityService, notifyingService) {
		var controller = this,
			defaultAction = 'login',
			_createLoginRequest = function(data) {
				function successHandler(successData) {
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
					_createLoginRequest(loginData);
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


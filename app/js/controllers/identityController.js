(function() {
	'use strict';

	function IdentityController($scope, $cookies) {
		var vm = this,
			defaultAction = 'login',
			show = function(action) {
				vm.action = action || defaultAction;		
			},
			login = function(loginData, loginForm) {
				console.log(loginData, loginForm);
			};

		vm.action = defaultAction;
		vm.show = show;
		vm.login = login;
	}

	angular
		.module('ITracker')
		.controller('IdentityController', ['$scope', '$cookies', IdentityController]);
} ());


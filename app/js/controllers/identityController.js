(function() {
	'use strict';

	function IdentityController($scope, $cookies) {
		var vm = this;
	}

	angular
		.module('ITracker')
		.controller('IdentityController', ['$scope', '$cookies', IdentityController]);
} ());


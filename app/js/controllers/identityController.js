(function() {
	'use strict';

	function IdentityController($scope) {
		var vm = this;
	}

	angular
		.module('ITracker')
		.controller('IdentityController', ['$scope', IdentityController]);
} ());


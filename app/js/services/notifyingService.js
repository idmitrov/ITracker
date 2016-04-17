(function() {
	'use strict';

	function notifyingService() {
		/**
		*	@name notify
		*	@desc notify message
		*	@param {String} message
		*	@param {String} type
		*	@param {Number} delay
		*/
		function notify(message, type, delay) {
			var defaultType = 'info',
				defaultDelay = 3000;
				
				noty({
					text: message,
					type: type || defaultType,
					dismissQueue: true,
					layout: 'bottomCenter',
					theme: 'defaultTheme',
					maxVisible: 10,
					timeout: delay || defaultDelay
				});
		}

		var service = {};
		
		/**
		*	@name info
		*	@desc Notify info message
		*	@param {String} message
		*/
		service.info = function(message) {
			notify(message);
		}

		/**
		*	@name success
		*	@desc Notify success message
		*	@param {String} message
		*/
		service.success = function(message) {
			notify(message, 'success');
		}


		/**
		*	@name error
		*	@desc Notify error message
		*	@param {String} message
		*/
		service.error = function(message) {
			notify(message, 'error');
		}

		return service;
	}

	angular
		.module('ITracker')
		.service('notifyingService', [notifyingService]);
} ());
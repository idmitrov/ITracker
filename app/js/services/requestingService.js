(function() {
	function requestingService($q, $http) {
		return function(method, url, headers, data) {
			var deferred = $q.defer();

			$http({
				method: method,
				url: url,
				headers: headers,
				data: data
			})
				.success(deferred.resolve)
				.error(deferred.reject);
			
			return deferred.promise;
		}
	}

	angular
		.module('ITracker')
		.factory('requestingService', ['$q', '$http', requestingService]);
} ());
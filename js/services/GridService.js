'use strict';

reportsApp.factory('GridService', function($resource, $q) {
	var resource = $resource(appConfig.hubApiUrl);
	var nodeActionResource = $resource(appConfig.apiUrl + '/grid/node/action');
	return {
		getSeleniumGrid : function() {
			var deferred = $q.defer();
			resource.get(function(activity) {
				deferred.resolve(activity);
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		},
		sendNodeAction : function(params) {
			var deferred = $q.defer();
			nodeActionResource.get(params, function(data) {
				deferred.resolve(data);
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		}
	};
});
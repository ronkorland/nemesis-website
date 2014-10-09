'use strict';

reportsApp.factory('GridService', function($resource, $q) {
	var resourceHubInfo = $resource(appConfig.apiUrl + '/grid/hub');
	var nodeActionResource = $resource(appConfig.apiUrl + '/grid/node/action');
	var nodeInfoResource = $resource(appConfig.apiUrl + '/grid/node/info');
	return {
		getSeleniumGrid : function() {
			var deferred = $q.defer();
			resourceHubInfo.get(function(activity) {
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
		},
		getNodeInfo : function(params) {
			var deferred = $q.defer();
			nodeInfoResource.get(params, function(data) {
				deferred.resolve(data);
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		}
	};
});
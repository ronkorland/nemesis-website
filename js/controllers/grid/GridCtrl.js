/**
 * Created by Ron on 26/09/14.
 */
reportsApp.controller('GridController', function($scope, $location,
		$routeParams, GridService, growl) {

	GridService.getSeleniumGrid().then(function(data) {
		$scope.grid = data;
		$scope.apiReturn = true;
	}, function(response) {
		$scope.grid = {};
		$scope.apiReturn = false;
		console.error(response);
	});

	$scope.sendNodeAction = function(action, nodeRemoteHost, nodeHost) {
		return GridService.sendNodeAction({
			actionType : action,
			remoteHost : nodeRemoteHost
		}).then(function(data) {
			growl.addSuccessMessage("Success send command to node: " + nodeHost);
			console.log(data);
		}, function(response) {
			growl.addErrorMessage("Failed to send command to node: " + nodeHost);
			console.log(response);
		});
	};

	$scope.range = function(n) {
		return new Array(n);
	};

});
/**
 * Created by Ron on 26/09/14.
 */
reportsApp.controller('GridController', function($scope, $location,
		$routeParams, GridService, growl) {

	$scope.headers = [ {
		title : '',
		value : 'icon'
	}, {
		title : 'Browser',
		value : 'browser'
	}, {
		title : 'Version',
		value : 'version'
	}, {
		title : 'Driver Version',
		value : 'driverVersion'
	}, {
		title : 'Capability Version',
		value : 'capVersion'
	}, {
		title : 'Max Instances',
		value : 'maxInstances'
	}, {
		title : 'Used Instances',
		value : 'busyInstances'
	}, {
		title : 'Running Processes',
		value : 'numOfProc'
	} ];

	GridService.getSeleniumGrid().then(function(data) {
		$scope.grid = data;
		$scope.apiReturn = true;
		// $scope.nodesInfo();
	}, function(response) {
		$scope.grid = {};
		$scope.apiReturn = false;
		console.error(response);
	});

	$scope.sendNodeAction = function(action, nodeRemoteHost, nodeHost) {
		return GridService.sendNodeAction({
			actionType : action,
			remoteHost : nodeRemoteHost
		}).then(
				function(data) {
					growl.addSuccessMessage("Success send command to node: "
							+ nodeHost);
					console.log(data);
				},
				function(response) {
					growl.addErrorMessage("Failed to send command to node: "
							+ nodeHost);
					console.log(response);
				});
	};

	$scope.range = function(n) {
		return new Array(n);
	};

	$scope.browserMaxInstances = function(bs, bn) {
		for (i = 0; i < bs.length; i++) {
			if (bs[i].browser === bn) {
				if (bs[i].maxInstances > 0) {
					return true;
				}
			}
		}
		return false;
	};
	
	$scope.browserNumOfProc = function(bs, bn) {
		for (i = 0; i < bs.length; i++) {
			if (bs[i].browser === bn) {
				if (bs[i].numOfProc > 0) {
					return false;
				}
			}
		}
		return true;
	};

});
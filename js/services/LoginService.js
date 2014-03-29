'use strict';

reportsApp.factory('LoginService', function ($resource) {
    return $resource(appConfig.apiUrl + '/users/:action', {},
        {
            authenticate: {
                method: 'POST',
                params: {'action': 'login'}
            },
            current: {
                method: 'GET',
                params: {'action': 'current'}
            }
        }
    );
});
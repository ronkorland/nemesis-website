'use strict';

reportsApp.factory('UserService', function ($resource) {
    return $resource(appConfig.apiUrl + '/users/:action', {},
        {
            authenticate: {
                method: 'POST',
                params: {'action': 'login'}
            }
        }
    );
});
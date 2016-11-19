define('interceptors/errorHttpInterceptor', ['interceptors', 'services', 'services/userService'], function(interceptors) {
    'use strict';

    interceptors.factory('errorHttpInterceptor', function($log, $q) {
        return {

            'response': function(response) {
                $log.warn('in response interceptor');
                return response;
            },

            'responseError': function(rejection) {
                // do something on error
                $log.warn('in response error interceptor');
                return rejection;
            }
        };
    });
});

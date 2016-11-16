define('interceptors/tokenHttpInterceptor', ['interceptors', 'services', 'services/userService'], function(interceptors) {
    'use strict';

    interceptors.factory('tokenHttpInterceptor', function($log) {
        return {
            // optional method
            'request': function(config) {
                // do something on success
                $log.warn('in request interceptor');
                return config;
            },

            // optional method
            'requestError': function(rejection) {
                // do something on error
                $log.warn('in request error interceptor');

                if (canRecover(rejection)) {
                    return;
                }
                return $q.reject(rejection);
            },



            // optional method
            'response': function(response) {
                $log.warn('in resposne interceptor');
                return response;
            },

            // optional method
            'responseError': function(rejection) {
                // do something on error
                $log.warn('in response error interceptor');
                if (canRecover(rejection)) {
                    return;
                }
                return $q.reject(rejection);
            }
        };

    });
});

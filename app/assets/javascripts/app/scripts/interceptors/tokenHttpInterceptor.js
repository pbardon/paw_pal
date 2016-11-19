define('interceptors/tokenHttpInterceptor', ['interceptors', 'services', 'services/userService'], function(interceptors) {
    'use strict';

    interceptors.factory('tokenHttpInterceptor', [ '$log', '$q', '$cookies', '$injector',
        function($log, $q, $cookies, $injector) {


            function isTemplateUrl(url) {
                if (url.slice(0,10) == '/templates') {
                    return true;
                }else if (url.slice(0, 9) === 'templates') {
                    return true;
                }else if (url.slice(0,12) === 'uib/template') {
                    return true;
                }
                return false;
            }
            function getToken(UserSvc) {
                return UserSvc.user.token || $cookies.get('X-PP-TOKEN');
            }
            return {
                // optional method
                'request': function(config) {
                    // Inject User Service manually to get around circular dependency issue
                    var UserSvc = $injector.get('UserService');

                    // Skip attaching the token if it is a login request, template request, or is explicitly skipped.
                    if (config.login || isTemplateUrl(config.url) || config.skipToken) {
                        return config
                    }
                    //Otherwise, attach the token to the outgoing request.
                    var userToken = getToken(UserSvc);

                    if (!userToken) {
                        $log.warn('token is not set on request.');
                        throw new Error('token is not set on request.')
                    }

                    if (!config.headers) {
                        config.headers = {
                            'X-PP-TOKEN' : userToken
                        };
                    }else {
                        config.headers['X-PP-TOKEN'] = userToken;
                    }

                    $log.warn('in request interceptor');
                    return config;
                },

                // optional method
                'requestError': function(rejection) {
                    // do something on error
                    $log.warn('in request error interceptor');
                    return rejection;
                },

                // optional method
                'response': function(response) {
                    $log.warn('in response interceptor');
                    return response;
                },

                // optional method
                'responseError': function(rejection) {
                    // do something on error
                    $log.warn('in response error interceptor');
                    return rejection;
                }
            };
        }
    ]);
});

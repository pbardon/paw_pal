define('services/userService', ['services/services', 'angular-cookies'], function(services){
    'use strict';

    return services.factory('UserService', [ '$q', '$http', '$cookies', '$log', function($q, $http, $cookies, $log) {

        function UserService() {
            this.isUserLoggedIn = function() {
                var cookies = $cookies.getAll();
                if (typeof cookies._dog_sitting_app_token === 'undefined') {
                    return false;
                }

                $log.info("cookie is : ", JSON.stringify(cookies));
                return true;
            };

            this.createUser = function (email, password) {
                var deferred = $q.defer();
                var loginInfo = {
                    user: {
                        email: email,
                        password: password
                    }
                };

                $log.info('Attempting to create user with info: ', JSON.stringify(loginInfo));

                $http.post('/users', JSON.stringify(loginInfo))
                    .then(function (result) {
                        $log.info('success response from server:\n',
                            JSON.stringify(result));
                        $cookies.put('_dog_sitting_app_token', result.data.token);
                        $log.info(JSON.stringify($cookies.getAll()));
                        deferred.resolve();
                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;

            };

            this.loginUser = function(email, password) {
                var deferred = $q.defer();

                var loginInfo = {
                    user: {
                        email: email,
                        password: password
                    }
                };

                $http.post('/session', JSON.stringify(loginInfo))
                .then(function(results) {
                    $log.info('success response from server:\n',
                        JSON.stringify(results));
                    $cookies.put('_dog_sitting_app_token', results.data.token);
                    $log.info(JSON.stringify($cookies.getAll()));
                    deferred.resolve(results)
                }, function(err) {
                    $log.error('error response from new session was ', JSON.stringify(err));
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            this.logoutCurrentUser = function() {
                var deferred = $q.defer();

                $http.delete('/session')
                .then(function(result) {
                    $log.info('deleted session with response: ', JSON.stringify(result));
                    $cookies.remove('_dog_sitting_app_token');
                    deferred.resolve(result);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        }
        return new UserService();
    }]);

});

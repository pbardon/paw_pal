define('services/userService', ['services/services', 'angular-cookies'], function(services){
    'use strict';

    return services.factory('UserService', [ '$q', '$http', '$cookies', '$log', '$state', function($q, $http, $cookies, $log, $state) {

        function UserService() {
            this.user = {
                email: '',
                token: ''
            };

            this.isUserLoggedIn = function() {
                if (typeof $cookies.get('X-PP-TOKEN') === 'undefined') {
                    return false;
                }

                return true;
            };

            this.createUser = function (email, password) {
                var oThis = this,
                    deferred = $q.defer(),
                    loginInfo = {
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
                    $cookies.put('X-PP-TOKEN', result.headers()['x-pp-token']);
                    oThis.user.token = result.data.token;
                    oThis.user.email = result.data.email;
                    $log.info(JSON.stringify($cookies.getAll()));
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;

            };

            this.loginUser = function(email, password) {
                var deferred = $q.defer(),
                    oThis = this;

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
                    $cookies.put('X-PP-TOKEN', results.headers()['x-pp-token']);
                    oThis.user.email = results.data.email;
                    $log.info(JSON.stringify($cookies.getAll()));
                    deferred.resolve(results)
                }, function(err) {
                    $log.error('error response from new session was ', JSON.stringify(err));
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            this.logoutCurrentUser = function() {
                var deferred = $q.defer(),
                    oThis = this;

                var config = {
                    headers:  {
                        'X-PP-TOKEN': $cookies.get('X-PP-TOKEN'),
                        'Accept': 'application/json'
                    }
                };

                $http.delete('/session', config)
                .then(function(result) {
                    $log.info('deleted session with response: ', JSON.stringify(result));
                    oThis.user.email = '';
                    $cookies.remove('X-PP-TOKEN');
                    $state.transitionTo('home');
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

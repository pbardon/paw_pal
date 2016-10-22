define('services/userService', ['services/services', 'angular-cookies'], function(services){
    'use strict';

    return services.factory('UserService', [ '$q', '$http', '$cookies', '$log', function($q, $http, $cookies, $log) {

        function UserService() {
            this.user = {
                email: '',
                token: ''
            };

            this.isUserLoggedIn = function() {
                if (typeof $cookies.get('X-PP-TOKEN') === 'undefined') {
                    return false;
                }

                this.user.token = $cookies.get('X-PP-TOKEN');

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
                    var responseToken = results.headers()['x-pp-token'];
                    $cookies.put('X-PP-TOKEN', responseToken);
                    oThis.user.token = responseToken;
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
                    var responseToken = results.headers()['x-pp-token'];
                    $cookies.put('X-PP-TOKEN', responseToken);
                    oThis.user.email = results.data.email;
                    oThis.user.token = responseToken;
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
                    oThis.user.token = '';
                    $cookies.remove('X-PP-TOKEN');
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

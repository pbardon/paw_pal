define('services/dogService', ['services', 'services/userService'], function(services, $log) {
    'use strict';

    return services.factory('DogService', [ '$q', '$http', 'UserService', '$log', '$cookies', function($q, $http, userSvc, $log, $cookies) {

        function DogService() {
            this.dogUrl = '/api/dogs';

            this.getDogPage = function(page) {
                var deferred = $q.defer(),
                    oThis = this;

                var userToken = userSvc.user.token || $cookies.get('X-PP-TOKEN');


                var config = {
                    headers: {
                        'X-PP-TOKEN' : userToken
                    },
                    params : {
                        'search' : 'all',
                        'page' : page
                    }
                };

                $http.get(this.dogUrl, config)
                    .then(function(result) {
                        if (result.data) {
                            $log.info(JSON.stringify(result));
                            oThis.dogs = result.data;
                            deferred.resolve(result.data);
                        }
                    }, function(err) {
                        $log.error(err);
                        deferred.reject(err);
                    });

                return deferred.promise;


            };


            this.getCurrentUserDogs = function() {
                var deferred = $q.defer(),
                    oThis = this;

                var userToken = userSvc.user.token || $cookies.get('X-PP-TOKEN');

                var config = {
                    headers: {
                        'X-PP-TOKEN' : userToken
                    }
                };

                $http.get('/api/dogs', config)
                .then(function(result) {
                    if (result.data) {
                        $log.info(JSON.stringify(result));
                        oThis.dogs = result.data;
                        deferred.resolve(result.data);
                    }
                }, function(err) {
                    $log.error(err);
                    deferred.reject(err);
                });

                return deferred.promise;

            };

            this.createDog = function(formData) {
                var deferred = $q.defer();
                var userToken = userSvc.user.token;

                var config = {
                    headers: {
                        'X-PP-TOKEN' : userToken
                    }
                };

                $http.post('/api/dogs', formData, config)
                    .then(function(result) {
                        $log.info(JSON.stringify(result));
                        deferred.resolve(result);
                    }, function(err) {
                        $log.error(err);
                        deferred.reject(err);
                    });

                return deferred.promise;

            }
        }

        return new DogService();
    }]);
});
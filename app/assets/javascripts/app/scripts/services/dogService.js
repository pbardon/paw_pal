define('services/dogService', ['services/services', 'services/userService'], function(services, $log) {
    'use strict';

    return services.factory('DogService', [ '$q', '$http', 'UserService', '$log', function($q, $http, userSvc, $log) {

        function DogService() {
            this.dogs = ['Jim', 'Randy', 'Bob'];


            this.getCurrentUserDogs = function() {
                var deferred = $q.defer();

                var userToken = userSvc.user.token;

                var config = {
                    headers: {
                        'X-PP-TOKEN' : userToken
                    }
                };

                $http.get('/api/dogs', config)
                .then(function(result) {
                    $log.info(JSON.stringify(result));
                    deferred.resolve(result);
                }, function(err) {
                    $log.error(err);
                    deferred.reject(err);
                });

                return deferred.promise;

            };
        }

        return new DogService();
    }]);
});
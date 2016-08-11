define('services/userService', ['services/services'], function(services){
    'use strict';

    function UserService() {
        this.createUser = function(email, password) {
            var deferred = $q.defer();
            var loginInfo = {
                email: email,
                password: password
            };

            $http.post('/user/new', JSON.stringify(loginInfo))
            .then(function(result) {
                $log.info('success response from server:\n',
                    JSON.stringify(results));
                    deferred.resolve();
                $rootScope.loggedIn = true;
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;

        };
    }

    return services.factory('UserService', [ '$q', '$http', function($q, $http) {
        return new UserService();
    }]);

});

define('services/tokenService', ['services'], function(services){
    'use strict';

    return services.factory('TokenService', [ '$q', '$http', '$cookies', '$log', function($q, $http, $cookies, $log) {


        function TokenService() {

            this.validateToken = function () {
                var deferred = $q.defer;
                var cookieToken = $cookies.get('_dog_sitting_app_token');
                ensureTokenIsValid(cookieToken).then(function() {

                })

            };

            this.getNewToken = function () {
                var deferred = $q.defer();
                return deferred.promise;

            };

            this.deleteToken = function () {

            };

        }

        return new TokenService();
    }]);


});

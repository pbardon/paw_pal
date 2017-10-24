(function() {
    define("services/tokenService", ["services"], function(services){
        "use strict";

        return services.factory("TokenService", [ "$q", '$http', '$cookies', '$log', function($q, $http, $cookies, $log) {
            function TokenService() {
                this.validateToken = function () {
                    var deferred = $q.defer;
                    var cookieToken = $cookies.get("_dog_sitting_app_token");
                    this.ensureTokenIsValid(cookieToken).then(function() {
                        deferred.resolve();
                    }, function(err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                };

                this.getNewToken = function () {
                    var deferred = $q.defer();
                    return deferred.promise;
                };

                this.deleteToken = function () {
                    $cookies.delete("_dog_sitting_app_token");
                };

            }
            return new TokenService();
        }]);


    });
}());

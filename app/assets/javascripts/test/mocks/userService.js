define('mocks/userService', ['mocks'], function(mocks) {
    'use strict';
    mocks.service('mock.UserService', ['$q', function($q) {
        this.createUser = function() {
            console.log('creating user...');
        };

        this.loginUser = function() {
            var deferred = $q.defer();
            console.log('user logging in...');
            deferred.resolve({ status: 200 });
            return deferred.promise;
        };

        this.createUser = function() {
            var deferred = $q.defer();
            console.log('creating user...');
            deferred.resolve({ status: 200 });
            return deferred.promise;
        };
    }]);
});

define('mocks/userService', ['services'], function(services) {
    'use strict';
    services.service('UserService', function() {
        this.createUser = function() {
            console.log('creating user...');
        }
    });
});
define('mocks/userService', ['mocks/mockServices'], function(services) {
    'use strict';
    services.service('UserService', function() {
        this.createDog = function() {
            console.log('creating dog...');
        }
    });
});
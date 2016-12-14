define('mocks/userService', ['mocks'], function(mocks) {
    'use strict';
    mocks.service('UserService', function() {
        this.createUser = function() {
            console.log('creating user...');
        }
    });
});
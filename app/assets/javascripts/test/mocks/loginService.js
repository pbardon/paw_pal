define('mocks/loginService', ['mocks'], function(mocks) {
    'use strict';
    mocks.service('mock.LoginService', ['$q', function($q) {
        this.login = jasmine.createSpy('login').and.callFake(function() {
            console.log('mock login...');
        });

        this.enroll = jasmine.createSpy('enroll').and.callFake(function() {
            console.log('mock enroll...');
        });


        this.cancel = jasmine.createSpy('cancel').and.callFake(function() {
            console.log('closed modal.');
        });

        function successResponse() {
            var deferred = $q.defer();
            deferred.resolve({statusCode: 200});
            return deferred.promise;
        }
    }]);
});

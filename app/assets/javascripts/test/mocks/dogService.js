define('mocks/dogService', ['mocks'], function(mocks) {
    'use strict';
    mocks.service('DogService', ['$q', function($q) {
        var dogService = this;

        this.createDog = jasmine.createSpy('createDog').and.callFake(function(){
            var deferred = $q.defer();
            if (dogService.rejectPromise) {
                deferred.reject('testError');
            }else {
                deferred.resolve(dogService.returnData);
            }
            return deferred.promise;
        });

        this.rejectPromise = false;

        this.returnData = { data: 'fakeResult' };
    }]);
});

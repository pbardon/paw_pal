define('mocks/dogService', ['mocks'], function(mocks) {
    'use strict';
    mocks.service('DogService', ['$q', function($q) {
        this.createDog = jasmine.createSpy('createDog').and.callFake(function(){
            var deferred = $q.defer();
            console.log('creating dog...@@@@@@@@@@@@@@@@@@');
            return deferred.promise;
        });
    }]);
});
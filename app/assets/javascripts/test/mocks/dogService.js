define('mocks/dogService', ['services'], function(angular, services) {
    'use strict';
    services.service('DogService', ['$q', function($q) {
        this.createDog = jasmine.createSpy('createDog').andCallFake(function(){
            var deferred = $q.defer();
            console.log('creating dog...@@@@@@@@@@@@@@@@@@');
            return deferred.promise;
        });
    }]);
});
(function() {
    'use strict';
    define(['angular', 'angularMocks', 'services'],
        function() {
            var dogService,
            mockUserService,
            $httpBackend,
            dogData,
            failRequest = false,
            getDogsResponseHandler,
            postDogResponseHandler,
            mockLogSvc;

            describe('Starting dog service test', function() {
                beforeEach(function() {
                    module('services', function($provide) {
                        $provide.factory('UserService', function($q) {
                            mockUserService = {
                            };

                            return mockUserService;
                        });

                        mockLogSvc = {
                            error: jasmine.createSpy('error'),
                            info: jasmine.createSpy('info')
                        };

                        $provide.value('$log', mockLogSvc);
                    });
                });

                beforeEach(inject(function(_DogService_, _$httpBackend_) {
                    dogService = _DogService_;
                    $httpBackend = _$httpBackend_;

                    dogData = "testString";

                    $httpBackend.when('GET', '/api/dogs?search=all')
                        .respond({
                            data: dogData
                        });

                    getDogsResponseHandler = $httpBackend.when('GET', '/api/dogs')
                            .respond({
                                data: dogData
                            });

                    postDogResponseHandler = $httpBackend.when('POST', '/api/dogs')
                        .respond(200, {
                            data: dogData
                        });
                }));

                it('is able to retrieve dog list from dog service', function() {
                    $httpBackend.expectGET();
                    dogService.getDogPage();
                    expect(dogService.dogs == dogData);

                });

                it('is able to retrieve a specific user\'s dogs', function() {
                    $httpBackend.expectGET();
                    dogService.getCurrentUserDogs();
                    expect(dogService.dogs == dogData);
                });

                it('is able to create a dog.', function(done) {
                    console.log('starting dog creation test');
                    $httpBackend.expectPOST();
                    dogService.createDog().then(function(result) {
                        expect(result == dogData);
                        done();
                    });
                    $httpBackend.flush();
                });

                it('should handle dog creation error', function() {
                    postDogResponseHandler.respond(500,
                        { message: 'failed to create dog...'});
                    dogService.createDog();
                    $httpBackend.flush();
                    expect(mockLogSvc.error).toHaveBeenCalled();
                });
            });
        });
}());

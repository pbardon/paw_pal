define(['angular', 'angularMocks', 'services/services', 'services/dogService'],
        function() {
            var doggService;

            describe('Starting login service test', function() {
                beforeEach(module('services/services'));

                var loginService;
                beforeEach(inject(function(_DogService_) {
                    dogService = _DogService_;
                }));

                it('is able to retrieve dog list from dog service', function() {
                    console.log('starting dog service get dogs test');
                    dogService.getDogPage();
                });

                it('is able to retrieve a specific user\'s dogs', function() {
                    console.log('start get user\'s dogs test');
                    doggService.getCurrentUserDogs()
                });

                it('is able to create a dog.', function() {
                    console.log('starting dog creation test');
                    var testFormData = {};
                    dogService.createDog(testFormData);
                });
            });
        });
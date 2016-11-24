define(['angular', 'angularMocks', 'services/services', 'services/dogService'],
        function() {

            describe('Starting login service test', function() {
                beforeEach(module('services/services'));

                var loginService;
                beforeEach(inject(function(_DogService_) {
                    loginService = _DogService_;
                }));

                it('works is able to retrieve dog list from dog service', function() {
                    console.log('starting dog service test');
                   
                });

            });
        });
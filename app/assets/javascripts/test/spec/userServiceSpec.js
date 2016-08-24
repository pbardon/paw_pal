define(['angular', 'angularMocks', 'angular-cookies', 'services/services', 'services/userService'], function() {

    describe('Starting user service test', function() {
        beforeEach(module('services/services'));
        beforeEach(module('ngCookies'));


        var userService;
        beforeEach(inject(function($cookies, _UserService_) {
            console.log('injecting user service');
            console.log(JSON.stringify(_UserService_));
            userService = _UserService_;
        }));

        it('should be able to instantiate a user service', function() {
            expect(typeof userService.createUser !== 'undefined');
        });

        it('is able to login', function() {
            console.log('starting user service test');

        });

        it('is able to enroll a user', function() {
            console.log('starting user service test');

        });

    });
});

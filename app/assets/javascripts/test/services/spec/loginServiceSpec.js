define(['angular', 'angularMocks', 'services', 'services/loginService'], function() {

    describe('Starting login service test', function() {
        beforeEach(module('services'));

        var loginService;
        beforeEach(inject(function(_LoginService_) {
            loginService = _LoginService_;
        }));

        it('works is able to retrieve users list from login service', function() {
            console.log('starting login service test');
            expect(loginService.users[0] === 'Jim').toBe(true);
            expect(loginService.users[1] === 'Randy').toBe(true);
            expect(loginService.users[2] === 'Bob').toBe(true);
        });

    });
});

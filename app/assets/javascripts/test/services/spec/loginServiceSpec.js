var $rootScope;

define(['angular', 'angularMocks', 'mocks', 'mocks/userService', 'services', 'services/loginService'], function() {
    describe('Starting login service test', function() {
        beforeEach(module('pawPalApp'));
        beforeEach(module('mocks'));
        beforeEach(module('services'));

        var loginService,
            uibModalInstance;
        beforeEach(inject(function(_LoginService_, _$rootScope_) {
            loginService = _LoginService_;
            $rootScope = _$rootScope_;
            uibModalInstance = {
                close: jasmine.createSpy('modalInstance.close'),
                dismiss: jasmine.createSpy('modalInstance.dismiss')
            };
        }));

        it('is able to enroll a new user', function() {
            loginService.login({ formData: {
                 email: "jim@sunnyvale.com",
                 password: "hello123",
                 passwordConfirm: "hello123"}});
            $rootScope.apply();
            expect(uibModalInstance.close).toHaveBeenCalled();

        });

        it('is able to login', function() {

        });
    });
});

var $rootScope;
var uibModalInstance;

define(['angular', 'angularMocks', 'mocks', 'mocks/userService', 'mocks/uibModalInstance', 'services', 'services/loginService'], function() {
    describe('Starting login service test', function() {
        beforeEach(module('pawPalApp'));
        beforeEach(module('mocks'));
        beforeEach(module('services'));

        var loginService,
            uibModalInstance;
        beforeEach(inject(function(_LoginService_, _$rootScope_, _uibModalInstance_) {
            loginService = _LoginService_;
            $rootScope = _$rootScope_;
            uibModalInstance = _uibModalInstance_;
        }));

        it('is able to enroll a new user', function() {
            loginService.login({ formData: {
                 email: "jim@sunnyvale.com",
                 password: "hello123",
                 passwordConfirm: "hello123"}},
             uibModalInstance);
            $rootScope.$digest();
            expect(uibModalInstance.close).toHaveBeenCalled();

        });

        it('is able to login', function() {

        });
    });
});

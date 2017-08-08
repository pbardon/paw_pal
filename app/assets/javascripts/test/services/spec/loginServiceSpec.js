var $rootScope;
var uibModalInstance;

define(['angular',
        'angularMocks',
        'mocks',
        'mocks/userService',
        'mocks/uibModalInstance',
        'services',
        'services/loginService'], function() {
    describe('Starting login service test', function() {
        beforeEach(module('services'));
        beforeEach(module('mocks'));

        var loginService,
            uibModalInstance;
        beforeEach(inject(function(_LoginService_, _$rootScope_, _uibModalInstance_) {
            loginService = _LoginService_;
            $rootScope = _$rootScope_;
            uibModalInstance = _uibModalInstance_;
        }));

        it('is able to enroll a new user', function() {
            loginService.enroll({ formData: {
                 email: "jim@sunnyvale.com",
                 password: "hello123",
                 passwordConfirm: "hello123"}},
             uibModalInstance);
            $rootScope.$digest();
            expect(uibModalInstance.close).toHaveBeenCalled();
        });

        it('is able to login', function() {
            loginService.login({ formData: {
                 email: "jim@sunnyvale.com",
                 password: "hello123",
                 passwordConfirm: "hello123"}},
             uibModalInstance);
            $rootScope.$digest();
            expect(uibModalInstance.close).toHaveBeenCalled();
        });




        // it('should respond with an error when the email is invalid', function() {
        //     console.log('running email validation test...');
        //     scope.formData.email = 'testuser';
        //     scope.formData.password = 'testPassword';
        //     scope.login();
        //     expect(scope.error).not.toBeUndefined();
        //     expect('Login info was not entered correctly').toMatch(scope.error);
        // });
        //
        // it('should respond with an error when the password is invalid', function() {
        //     console.log('running password validation test...');
        //     scope.formData.email = 'testuser@test.com';
        //     scope.formData.password = 'test';
        //     scope.login();
        //     expect(scope.error).not.toBeUndefined();
        //     console.log(JSON.stringify(scope.error));
        //     expect('Login info was not entered correctly').toMatch(scope.error);
        // });
        //
        // it('should respond with an error when the confirmation password is invalid', function() {
        //     console.log('running password confirmation validation test...');
        //     scope.formData.email = 'testuser';
        //     scope.formData.password = 'test';
        //     scope.formData.passwordConfirm = 'test123';
        //     scope.enroll();
        //     expect(mockLoginService.enroll).toHaveBeenCalled();
        //     expect('Enrollment info was not entered correctly').toMatch(scope.error);
        // });
    });
});

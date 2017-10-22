var $rootScope;
var loginService;
var mockUserService;
var mockModalInstance;
var $q;

define(['angular',
        'angularMocks',
        'mocks',
        'services',
        'services/loginService'], function() {
    describe('Starting login service test', function() {
        beforeEach(function() {
            mockModalInstance = {
                close : jasmine.createSpy('close')
            };

            module('pawPalApp');
            module('services', function($provide) {
                $provide.value('uibModalInstance', mockModalInstance);
                $provide.factory('UserService', function($q) {
                    mockUserService = {
                        loginUser : function() {
                            var deferred = $q.defer();
                            console.log('user logging in...');
                            deferred.resolve({ status: 200 });
                            return deferred.promise;
                        },

                        createUser : function() {
                            var deferred = $q.defer();
                            console.log('creating user...');
                            deferred.resolve({ status: 200 });
                            return deferred.promise;
                        }
                    };

                    return mockUserService;
                });
            });

            inject(function(_LoginService_, _$rootScope_) {
                loginService = _LoginService_;
                $rootScope = _$rootScope_;
            });
        });

        it('is able to enroll a new user', function() {
            console.log('starting enroll test');
            loginService.enroll({ formData: {
                 email: "jim@sunnyvale.com",
                 password: "hello123",
                 passwordConfirm: "hello123"}});
            $rootScope.$digest();
            expect(mockModalInstance.close).toHaveBeenCalled();
        });

        it('is able to login', function() {
            loginService.login({ formData: {
                 email: "jim@sunnyvale.com",
                 password: "hello123",
                 passwordConfirm: "hello123"}});
            $rootScope.$digest();
            expect(mockModalInstance.close).toHaveBeenCalled();
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

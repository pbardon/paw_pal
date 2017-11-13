(function() {
    "use strict";
    var $rootScope,
    loginService,
    mockUserService,
    mockModalInstance,
    mockErrorService,
    mockValidationService,
    $q,
    failRequest;

    define(['angular',
            'angularMocks',
            'mocks',
            'mocks/userService',
            'services',
            'services/loginService'], function() {
        describe('Starting login service test', function() {
            beforeEach(function() {
                mockModalInstance = {
                    close : jasmine.createSpy('close')
                };

                module('services', function($provide) {
                    $provide.value('uibModalInstance', mockModalInstance);
                    $provide.factory('UserService',
                       function($q) {
                            mockUserService = {
                                loginUser : function() {
                                    var statusCode = failRequest ? 500 : 200;
                                    var deferred = $q.defer();
                                    deferred.resolve({ status: statusCode });
                                    return deferred.promise;
                                },

                                createUser : function() {
                                    var statusCode = failRequest ? 500 : 200;
                                    var deferred = $q.defer();
                                    deferred.resolve({ status: statusCode });
                                    return deferred.promise;
                                },

                            };

                            return mockUserService;
                        });

                    mockErrorService = {
                        handleLoginError: jasmine.createSpy('handleLoginError'),
                        handleRegistrationError: jasmine.createSpy('handleRegistrationError')
                    };

                    $provide.value('ErrorService', mockErrorService);

                    mockValidationService = {
                        validateLoginInfo: jasmine.createSpy('validateLoginInfo').and.callFake(function() {
                            return true;
                        })
                    };

                    $provide.value("ValidationService", mockValidationService);

                });

                inject(function($injector) {
                    loginService = $injector.get("LoginService");
                    $rootScope = $injector.get("$rootScope");
                });


                failRequest = false;
            });

            it("is able to close the modal on successful login", function() {
                loginService.login({ formData: {
                     email: "jim@sunnyvale.com",
                     password: "hello123",
                     passwordConfirm: "hello123"}});
                $rootScope.$digest();
                expect(mockModalInstance.close).toHaveBeenCalled();
            });

            it("should call the error service when it gets a bad response from the user service", function() {
                failRequest = true;
                loginService.login({ formData: {
                     email: "jim@sunnyvale.com",
                     password: "hello123",
                     passwordConfirm: "hello123"}
                 });
                $rootScope.$digest();
                expect(mockErrorService.handleLoginError).toHaveBeenCalled();
                expect(mockModalInstance.close).not.toHaveBeenCalled();
            });


            it("is able to close the modal after enrollment", function() {
                loginService.enroll({ formData: {
                     email: "jim@sunnyvale.com",
                     password: "hello123",
                     passwordConfirm: "hello123"}});
                $rootScope.$digest();
                expect(mockModalInstance.close).toHaveBeenCalled();
            });

            it("is able to handle an enrollment error", function() {
                failRequest = true;
                loginService.enroll({ formData: {
                     email: "jim@sunnyvale.com",
                     password: "hello123",
                     passwordConfirm: "hello123"}});
                $rootScope.$digest();
                expect(mockErrorService.handleRegistrationError).toHaveBeenCalled();
                expect(mockModalInstance.close).not.toHaveBeenCalled();

            });

            it("is able to close the modal using cancel", function() {
                loginService.cancel();
                expect(mockModalInstance.close).toHaveBeenCalled();
            });
        });
    });
}());

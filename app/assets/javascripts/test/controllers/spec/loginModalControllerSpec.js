var $controller,
    $httpBackend,
    $rootScope,
    scope,
    loginModalCtrl,
    mockLoginService,
    createController;

define(['angular',
        'angularMocks',
        'uiBootstrap',
        'pawPalApp',
        'controllers',
        'controllers/loginModalController',
        'services',
        'services/validationService',
        'mocks',
        'mocks/loginService'],
        function() {
            describe('Starting login modal controller test', function () {
                beforeEach(module('pawPalApp'));
                beforeEach(module('controllers'));
                beforeEach(module('mocks'));

                beforeEach(inject(function ($injector) {
                    $controller = $injector.get('$controller');
                    $httpBackend = $injector.get('$httpBackend');
                    $rootScope = $injector.get('$rootScope');
                    mockLoginService = $injector.get('mock.LoginService');

                    scope = $rootScope.$new;
                    createController = function () {
                        return $controller('LoginModalCtrl', {
                            '$scope': scope,
                            'LoginService': mockLoginService
                        });
                    };

                    loginModalCtrl = createController();
                }));

                describe('login modal controller test', function() {
                    console.log('starting login modal controller test');
                    it('should be able to instantiate a login modal controller', function() {
                        expect(loginModalCtrl).not.toBeUndefined();
                    });

                    it('should have a login method on the $scope', function() {
                        expect(scope.login).not.toBeUndefined();
                    });

                    it('should have a enroll method on the $scope', function() {
                        expect(scope.enroll).not.toBeUndefined();
                    });

                    it('should be able to send an login request', function(){
                        console.log('running login request test...');
                        scope.formData.email = 'testuser@test.com';
                        scope.formData.password = 'testPassword';
                        scope.login();
                        expect(mockLoginService.login).toHaveBeenCalled();
                    });


                    it('should be able to send an enrollment request', function(){
                        console.log('running enrollment request test...');
                        scope.formData.email = 'testuser@test.com';
                        scope.formData.password = 'testPassword';
                        scope.formData.passwordConfirm = 'testPassword';
                        scope.enroll();
                        expect(mockLoginService.enroll).toHaveBeenCalled();
                    });


                    it('should be able to close the modal', function() {
                        console.log('starting modal close test');
                        expect(mockLoginService.cancel).not.toHaveBeenCalled();
                        scope.cancel();
                        expect(mockLoginService.cancel).toHaveBeenCalled();
                    });

                    it('should be able to detect is the passwords match', function() {
                        console.log('starting modal password match test');
                        scope.formData.password = 'test';
                        scope.formData.passwordConfirm = 'test123';
                        expect(scope.passwordsMatch()).toBe(false);
                        scope.formData.password = 'test123';
                        scope.formData.passwordConfirm = 'test123';
                        expect(scope.passwordsMatch()).toBe(true);
                    });
                });
            });
});

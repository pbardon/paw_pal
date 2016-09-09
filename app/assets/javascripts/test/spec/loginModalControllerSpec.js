var $controller,
    $httpBackend,
    $rootScope,
    scope,
    loginModalCtrl,
    $uibModalInstance,
    authRequestHandler,
    createController,
    noOpFunction = function() {};

define(['angular', 'angularMocks', 'uiBootstrap', 'pawPalApp','controllers/controllers', 'controllers/loginModalController'], function() {
    describe('Starting login modal controller test', function () {
        beforeEach(module('pawPalApp'));
        beforeEach(module('controllers/controllers'));

        beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_) {

            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;

            var uibModalInstance = {
                close: jasmine.createSpy('modalInstance.close'),
                dismiss: jasmine.createSpy('modalInstance.dismiss'),
                result: {
                    then: jasmine.createSpy('modalInstance.result.then')
                }
            };

            $httpBackend.when('POST', '/session')
            .respond({
                'email': 'testUser',
                'token': 'AA55443333A'
            });

            $httpBackend.when('POST', '/users')
                .respond({
                    'email': 'testUser',
                    'token': 'AA55443333A'
                });

            scope = $rootScope.$new;
            createController = function () {
                return $controller('LoginModalCtrl', {
                    '$scope': scope,
                    '$uibModalInstance' : uibModalInstance
                });
            };

            loginModalCtrl = createController();
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

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
                $httpBackend.expectPOST('/session');
                scope.login();
                expect(scope.error).toBeUndefined();
                $httpBackend.flush();
            });


            it('should be able to send an enrollment request', function(){
                console.log('running enrollment request test...');
                scope.formData.email = 'testuser@test.com';
                scope.formData.password = 'testPassword';
                scope.formData.passwordConfirm = 'testPassword';
                $httpBackend.expectPOST('/users');
                scope.enroll();
                $httpBackend.flush();
            });

            it('should respond with an error when the email is invalid', function() {
                console.log('running email validation test...');
                scope.formData.email = 'testuser';
                scope.formData.password = 'testPassword';
                scope.login();
                expect(scope.error).not.toBeUndefined();
                expect('Login info was not entered correctly').toMatch(scope.error);
            });

            it('should respond with an error when the password is invalid', function() {
                console.log('running password validation test...');
                scope.formData.email = 'testuser@test.com';
                scope.formData.password = 'test';
                scope.login();
                expect(scope.error).not.toBeUndefined();
                console.log(JSON.stringify(scope.error));
                expect('Login info was not entered correctly').toMatch(scope.error);
            });

            it('should respond with an error when the confirmation password is invalid', function() {
                console.log('running password confirmation validation test...');
                scope.formData.email = 'testuser';
                scope.formData.password = 'test';
                scope.formData.passwordConfirm = 'test123';
                scope.enroll();
                expect(scope.error).not.toBeUndefined();
                expect('Enrollment info was not entered correctly').toMatch(scope.error);
            });
        });
    });
});
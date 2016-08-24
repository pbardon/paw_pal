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

            authRequestHandler = $httpBackend.when('POST', '/api/login')
            .respond({
                'userId': 'testUser',
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
            it('should be able to instantiate a login modal controller', function() {
                expect(loginModalCtrl).not.toBeUndefined();
            });
        });
    });
});
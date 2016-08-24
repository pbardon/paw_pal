var $controller,
    $httpBackend,
    $rootScope,
    authRequestHandler,
    createController,
    noOpFunction = function() {};

define(['angular', 'angularMocks', 'pawPalApp', 'controllers/controllers', 'controllers/navbarController'], function() {
    describe('Starting navbar controller test', function () {
        beforeEach(module('pawPalApp'));
        beforeEach(module('controllers/controllers'));

        beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_) {
            console.log('controller is: ');
            console.log(JSON.stringify(_$controller_));
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;

            authRequestHandler = $httpBackend.when('POST', '/api/login')
                .respond({
                    'userId': 'testUser',
                    'token': 'AA55443333A'
                });
            createController = function () {
                return $controller('NavbarCtrl', {'$scope': $rootScope});
            };
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('navbar controller test', function() {
            console.log('starting navbar controller test...');
            it('should be able to instantiate a navbar controller', function() {
                var $scope = { $on: noOpFunction };
                expect(typeof $scope.formData).toEqual('undefined');
                var controller = $controller('NavbarCtrl', { $scope: $scope });
                console.log(JSON.stringify(controller));
                expect(typeof $scope.logout !== 'undefined');
            });

        });


    });
});
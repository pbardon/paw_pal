var $controller,
    $httpBackend,
    $rootScope,
    createController,
    dogFormCtrl;

define(['angular',
        'controllers/dogFormController',
        'mocks',
        'mocks/dogService'],
    function(angular) {
        describe('Starting dog form controller test', function () {
            beforeEach(module('controllers'));
            beforeEach(module('pawPalApp'));
            beforeEach(module('mock'));


            beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, DogService) {
                $controller = _$controller_;
                $httpBackend = _$httpBackend_;
                $rootScope = _$rootScope_;

                createController = function () {
                    return $controller('DogFormCtrl', {'$scope': $rootScope });
                };
                dogFormCtrl = createController();
            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            describe('dog form controller test', function() {
                console.log('starting dog form controller test...');

                it('should be able to instantiate a dog form controller', function() {
                    expect(dogFormCtrl).not.toBeUndefined();
                });

                it('should have a form data object on the scope', function() {
                    var formData = {
                        name: '',
                        age: '',
                        description: '',
                        size: '',
                        picture: {}
                    };
                    expect($rootScope.formData).not.toBeUndefined();
                    expect(angular.equals($rootScope.formData, formData)).toBe(true);
                });

                it('should be able to create a new dog', function() {
                    $rootScope.submit();
                });
            });
        });
    }
);
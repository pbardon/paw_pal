var $controller,
    $httpBackend,
    $rootScope,
    createController,
    dogFormCtrl;

define(['angular',
        'mocks/mockServices',
        'controllers/dogFormController'],
    function() {
        describe('Starting dog form controller test', function () {
            beforeEach(module('pawPalApp'));
            beforeEach(module('controllers'));

            beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_) {
                $controller = _$controller_;
                $httpBackend = _$httpBackend_;
                $rootScope = _$rootScope_;

                createController = function () {
                    return $controller('DogFormCtrl', {'$scope': $rootScope});
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
                    expect(_.toEqual($rootScope.formData, formData)).toBe(true);
                });
            });
        });
    }
);
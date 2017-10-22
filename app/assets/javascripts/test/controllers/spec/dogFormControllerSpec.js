var $controller,
    $httpBackend,
    $rootScope,
    $state,
    $log,
    dogSvc,
    createController,
    dogFormCtrl;

define(['angular',
        'angularMocks',
        'pawPalApp',
        'controllers',
        'controllers/dogFormController',
        'mocks',
        'mocks/dogService'],
    function(angular) {
        describe('Starting dog form controller test', function () {
            beforeEach(module('pawPalApp'));
            beforeEach(module('controllers'));
            beforeEach(module('mocks'));

            beforeEach(inject(function ($injector) {
                $controller = $injector.get('$controller');
                $rootScope = $injector.get('$rootScope');
                $state = {};
                $state.go = jasmine.createSpy('go');
                $log = {};
                $log.error = jasmine.createSpy('error');
                $log.info = jasmine.createSpy('info');
                dogSvc = $injector.get('mock.DogService');

                createController = function () {
                    return $controller('DogFormCtrl', {'$scope': $rootScope,
                    '$state' : $state ,
                    $log: $log,
                    'DogService' : dogSvc
                });
                };
                dogFormCtrl = createController();
            }));

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

                it('should be able to create a new dog and redirect to profile', function() {
                    $rootScope.submit();
                    $rootScope.$apply();
                    expect($log.info).toHaveBeenCalledWith('fakeResult');
                    expect($state.go).toHaveBeenCalledWith('profile');
                });

                it('should log an error if one occurs', function() {
                    dogSvc.rejectPromise = true;
                    $rootScope.submit();
                    $rootScope.$apply();
                    expect($log.error).toHaveBeenCalledWith('testError');
                });

                it('should throw an error if data returned from the server is not formatted correctly', function() {
                    dogSvc.returnData = {};
                    $rootScope.submit();
                    expect(function() { $rootScope.$apply(); }).toThrow('Did not receive correct result from server..');
                });
            });
        });
    }
);

var $controller,
$httpBackend,
$rootScope,
authRequestHandler,
createController,
noOpFunction = function() {};

define(['angular', 'angularMocks', 'pawPalApp','controllers/controllers', 'controllers/loginController'], function() {

    describe('Starting login controller test', function() {
        beforeEach(module('pawPalApp'));
        beforeEach(module('controllers/controllers'));

         beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_){
            //  console.log(JSON.stringify(_$controller_));
            //  console.log(JSON.stringify(_$rootScope_));
            //  console.log(JSON.stringify(_$httpBackend_));

             $controller = _$controller_;
             $httpBackend = _$httpBackend_;
             $rootScope = _$rootScope_;

             authRequestHandler = $httpBackend.when('POST', '/api/login')
                                              .respond({'userId': 'testUser',
                                                       'token': 'AA55443333A'});
            createController = function() {
                return $controller('LoginCtrl', {'$scope' : $rootScope });
            };
         }));

         afterEach(function() {
             $httpBackend.verifyNoOutstandingExpectation();
             $httpBackend.verifyNoOutstandingRequest();
         });

         describe('login controller test', function() {
            console.log('starting login controller test');
            it('should have a username and password field on the $scope', function() {
              var $scope = { $on: noOpFunction };
              expect(typeof $scope.formData).toEqual("undefined");
              var controller = $controller('LoginCtrl', { $scope: $scope });
              expect($scope.formData.username).toEqual('');
              expect($scope.formData.password).toEqual('');
            });

            it('should be able to send a login request', function() {
                console.log('running login request test...');
                var $scope = {};
                var controller = $controller('LoginCtrl', { $scope: $scope });
                console.log(JSON.stringify(typeof $scope.login));
                var result = $scope.login();
                console.log(JSON.stringify(result));
                $scope.formData.username = 'testUser';
                $scope.formData.password = 'testPassword';
                $httpBackend.expectPOST('/api/login');
                result = $scope.login();
                console.log(JSON.stringify(result));
                $httpBackend.flush();
            });
          });
    });
});

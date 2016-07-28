define(['angular', 'angularMocks', 'pawPalApp','controllers/controllers', 'controllers/loginController'], function() {

    describe('Starting login controller test', function() {
        beforeEach(module('pawPalApp'));
        beforeEach(module('controllers/controllers'));

        var $controller,
        noOpFunction = function() {};

         beforeEach(inject(function(_$controller_){
           $controller = _$controller_;
         }));

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
                var $scope = { $on: noOpFunction };
                var controller = $controller('LoginCtrl', { $scope: $scope });
                console.log(JSON.stringify($scope));
                console.log(JSON.stringify(typeof $scope.login));
                var result = $scope.login();
                console.log(JSON.stringify(result));

            });
          });
    });
});

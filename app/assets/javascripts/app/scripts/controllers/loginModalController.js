define('controllers/loginModalController', ['controllers',
        'uiBootstrap',
        'constants/formConstants',
        'services/loginService'],
    function(controllers) {
        'use strict';
        controllers.controller('LoginModalCtrl', ['$scope',
            '$rootScope',
            '$http',
            '$log',
            'LoginService',
            'formConstants',
            function ($scope,
                      $rootScope,
                      $http,
                      $log,
                      LoginService,
                      formConstants) {

                var loginSvc = LoginService;

                $scope.formData = { email: '', password: '', passwordConfirm: ''};
                $scope.minPasswordLength = 6;

                $scope.loginSelected = true;

                $scope.toggleLoginSelected = function() {
                    $scope.loginSelected = !$scope.loginSelected;
                };

                $scope.login = function() {
                    loginSvc.login($scope);
                };

                $scope.hasError = function() {
                    if (typeof  $scope.error == 'undefined') {
                        return false;
                    }
                    return ($scope.error !== '');
                };

                $scope.enroll = function() {
                    loginSvc.enroll($scope);
                };

                $scope.passwordsMatch = function() {
                    if ( $scope.formData.password === '' || $scope.formData.passwordConfirm === '' ) {
                        return true;
                    }
                    return ($scope.formData.password === $scope.formData.passwordConfirm);
                };

                $scope.formData.states = formConstants.states;

                $scope.cancel = function () {
                    loginSvc.cancel();
                };
            }]);
    });

define('services/loginService', ['services',
    'services/userService',
    'services/errorService',
    'services/validationService'],
    function(services){
        'use strict';
        return services.factory('LoginService', [ '$log',
        '$rootScope',
        'UserService',
        'ValidationService',
        'ErrorService',
        function($log, $rootScope, usrSvc, validateSvc, errorSvc) {
            function LoginService() {
                this.login = function ($scope, $uibModalInstance) {
                    if (validateSvc.validateLoginInfo($scope)) {
                        console.log('valid login info...');
                        usrSvc.loginUser(getLoginInfo($scope))
                        .then(function (result) {
                            console.log('promise resolved');
                            if (result.status && result.status != 200) {
                                errorSvc.handleLoginError($scope,
                                    result.statusText);
                                return;
                            }
                            $uibModalInstance.close();
                        }, function (err) {
                            errorSvc.handleLoginError($scope, err);
                        });
                    }
                };

                this.enroll = function ($scope, $uibModalInstance) {
                    if (validateSvc.validateLoginInfo($scope)) {
                        console.log('validated enrollment');
                        usrSvc.createUser(getLoginInfo($scope))
                        .then(function (result) {
                            if (result.status && result.status != 200 ) {
                                console.log('in callback');
                                errorSvc.handleRegistrationError($scope,
                                    result.statusText);
                                return;
                            }
                            $uibModalInstance.close();
                        }, function (err) {
                            console.log('in error response...');
                            errorSvc.handleRegistrationError($scope, err);
                        });
                    }
                };

                function getLoginInfo($scope) {
                    return {
                        email: $scope.formData.email,
                        password: $scope.formData.password,
                        passwordConfirm: $scope.formData.passwordConfirm
                    };
                }
            }

            return new LoginService();
        }]);
    });

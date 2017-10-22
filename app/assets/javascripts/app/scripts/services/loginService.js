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
        'uibModalInstance',
        function($log, $rootScope, usrSvc, validateSvc, errorSvc, $uibModalInstance) {
            function LoginService() {
                this.login = function ($scope) {
                    if (validateSvc.validateLoginInfo($scope)) {
                        usrSvc.loginUser(getLoginInfo($scope))
                        .then(function (result) {
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

                this.enroll = function ($scope) {
                    if (validateSvc.validateLoginInfo($scope)) {
                        usrSvc.createUser(getLoginInfo($scope))
                        .then(function (result) {
                            console.log("user created by service...");
                            if (result.status && result.status != 200 ) {
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

                this.cancel = function() {
                    $uibModalInstance.close();
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

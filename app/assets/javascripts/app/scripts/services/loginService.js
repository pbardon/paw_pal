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
                    var userData = getLoginInfo($scope);
                    if (validateSvc.validateLoginInfo(userData)) {
                        usrSvc.loginUser(userData)
                        .then(function (result) {
                            if (result.status && result.status != 200) {
                                errorSvc.handleLoginError(result.statusText);
                                return;
                            }
                            $uibModalInstance.close();
                        }, function (err) {
                            errorSvc.handleLoginError($scope, err);
                        });
                    }
                };

                this.enroll = function ($scope) {
                    var userData = getLoginInfo($scope);
                    if (validateSvc.validateLoginInfo(userData)) {
                        usrSvc.createUser(userData)
                        .then(function (result) {
                            if (result.status && result.status != 200) {
                                errorSvc.handleRegistrationError(result.statusText);
                                return;
                            }
                            $uibModalInstance.close();
                        }, function (err) {
                            errorSvc.handleRegistrationError(err);
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

define('services/loginService', ['services',
    'services/userService',
    'services/validationService'],
    function(services){
        'use strict';
        return services.factory('LoginService', [ '$log', 'UserService', 'ValidationService',
            function($log, usrSvc, validateSvc) {

                function LoginService() {
                    this.login = function ($scope, $uibModalInstance) {
                        var loginInfo = getLoginInfo($scope);
                        loginInfo.passwordConfirm = loginInfo.password;

                        if (validateLoginInfo(loginInfo, true)) {
                            usrSvc.loginUser(loginInfo.email, loginInfo.password)
                                .then(function (result) {
                                    if (result.status && result.status != 200) {
                                        handleLoginError($scope, result.statusText);
                                        return;
                                    }
                                    $log.info('logged in user: ', JSON.stringify(loginInfo));
                                    $log.info('with result: ', JSON.stringify(result));
                                    $uibModalInstance.close();
                                }, function (err) {
                                    handleLoginError($scope, err);
                                });
                        }
                    };

                    this.enroll = function ($scope, $uibModalInstance) {
                        var loginInfo = getLoginInfo($scope);
                        if (validateLoginInfo(loginInfo, false)) {
                            usrSvc.createUser(loginInfo.email, loginInfo.password)
                                .then(function (result) {
                                    if (result.status && result.status != 200 ) {
                                        handleRegistrationError($scope, result.statusText);
                                        return;
                                    }
                                    $log.info('created user : ', JSON.stringify(loginInfo));
                                    $log.info('with result: ', JSON.stringify(result));
                                    $uibModalInstance.close();
                                }, function (err) {
                                    handleRegistrationError($scope, err);
                                });
                        }
                    };

                    function validateLoginInfo(loginInfo, isLogin) {
                        if (!(validateSvc.validateEmailAddress(loginInfo.email) &&
                            validateSvc.validatePassword(loginInfo.password) &&
                            (isLogin || validateSvc.validatePassword(loginInfo.passwordConfirm)))) {
                            var errMsg = 'Enrollment info was not entered correctly';
                            if (isLogin) {
                                errMsg = 'Login info was not entered correctly';
                            }
                            $log.error(errMsg);
                            addError(errMsg);
                            return false;
                        }
                        return true;
                    }

                    function handleRegistrationError($scope, err) {
                        handleErrorRequest($scope, err, 'Registration Failed, try again...');
                    }

                    function handleLoginError($scope, err) {
                        handleErrorRequest($scope, err, 'Login Failed, try again...');
                    }

                    function handleErrorRequest($scope, err, msg) {
                        addError($scope, msg);
                        $scope.formData.password = '';
                        $scope.formData.passwordConfirm = '';
                        $scope.formData.email = '';
                        $log.error(err);
                    }

                    function getLoginInfo($scope) {
                        return {
                            email: $scope.formData.email,
                            password: $scope.formData.password,
                            passwordConfirm: $scope.formData.passwordConfirm
                        };
                    }

                    function addError($scope, message) {
                        $scope.error = message;
                    }
                }

                return new LoginService();
        }]);
    });

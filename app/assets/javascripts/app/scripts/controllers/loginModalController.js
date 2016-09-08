define('controllers/loginModalController', ['controllers/controllers',
    'uiBootstrap',
    'constants/formConstants',
    'services/validationService',
    'services/userService'],
    function(controllers) {
        'use strict';
        controllers.controller('LoginModalCtrl', ['$scope',
             '$rootScope',
             '$http',
             '$log',
             '$uibModalInstance',
             'UserService',
             'ValidationService',
             'formConstants',
             function ($scope,
                       $rootScope,
                       $http,
                       $log,
                       $uibModalInstance,
                       UserService,
                       ValidationService,
                       formConstants,
                       formData) {

                var validateSvc = ValidationService;
                 var usrSvc = UserService;

                $scope.formData = formData || { email: '', password: '', passwordConfirm: ''};
                $scope.minPasswordLength = 6;

                var getLoginInfo = function() {
                    return {
                        email: $scope.formData.email,
                        password: $scope.formData.password,
                        confirmPassword: $scope.formData.confirmPassword
                    }
                };

                var addError = function(errMsg) {
                    $scope.error = errMsg;
                };

                var validateLoginInfo = function(loginInfo) {
                    if (!(validateSvc.validateEmailAddress(loginInfo.email) &&
                        validateSvc.validatePassword(loginInfo.password) &&
                        validateSvc.validatePassword(loginInfo.passwordConfirm))) {
                        var errMsg = 'Login info was not entered correctly';
                        $log.error(errMsg);
                        addError(errMsg);
                        return false;
                    }
                    return true;
                };

                $scope.loginSelected = true;

                $scope.toggleLoginSelected = function() {
                    $scope.loginSelected = !$scope.loginSelected;
                };

                $scope.login = function() {
                    var loginInfo = getLoginInfo();
                    loginInfo.passwordConfirm = loginInfo.password;

                    if (validateLoginInfo(loginInfo)) {
                        usrSvc.loginUser(loginInfo.email, loginInfo.password)
                        .then(function(result) {
                            $log.info('logged in user: ', JSON.stringify(loginInfo));
                            $log.info('with result: ', JSON.stringify(result));
                            $rootScope.loggedIn = true;
                            $uibModalInstance.close();
                        }, function(err) {
                            addError('Login Failed, try again...');
                            $scope.formData.password = '';
                            $scope.formData.passwordConfirm = '';
                            $scope.formData.email = '';
                            $log.error(err);
                        });
                    }
                };

                $scope.hasError = function() {
                    if (typeof  $scope.error == 'undefined') {
                        return false;
                    }
                    return ($scope.error !== '');
                };

                $scope.enroll = function() {
                    var loginInfo = getLoginInfo();
                    if (validateLoginInfo(loginInfo)) {
                        usrSvc.createUser(loginInfo.email, loginInfo.password)
                        .then(function (result) {
                            $log.info('created user : ', JSON.stringify(loginInfo));
                            $log.info('with result: ', JSON.stringify(result));
                            $rootScope.loggedIn = true;
                            $uibModalInstance.close();
                        }, function (err) {
                            addError('Registration Failed, try again...');
                            $scope.formData.password = '';
                            $scope.formData.user.email = '';
                            $log.error(err);
                        });
                    }
                };

                $scope.passwordsMatch = function() {
                    if ( $scope.formData.password === '' || $scope.formData.passwordConfirm === '' ) {
                        return true;
                    }
                    return ($scope.formData.password === $scope.formData.passwordConfirm)
                };

                $scope.formData.states = formConstants.states;

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
        }]);
});

define('controllers/loginModalController', ['controllers/controllers',
    'constants/formConstants',
    'directives/enrollDirective',
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

                $scope.formData = formData || { email: '', password: '', passwordConfirm: ''};

                var getLoginInfo = function() {
                    return {
                        email: $scope.formData.email,
                        password: $scope.formData.password,
                        confirmPassword: $scope.formData.confirmPassword
                    }
                };

                $scope.loginSelected = true;

                $scope.toggleLoginSelected = function() {
                    $scope.loginSelected = !$scope.loginSelected;
                };

                $scope.login = function() {
                    var loginInfo = getLoginInfo();

                    if ($scope.formData.email === '' || $scope.password === '') {
                        $log.error('user name or password as not provided.');
                    }

                    UserService.loginUser(loginInfo.email, loginInfo.password)
                    .then(function(result) {
                        $log.info('logged in user: ', JSON.stringify(loginInfo));
                        $log.info('with result: ', JSON.stringify(result));
                        $rootScope.loggedIn = true;
                        $uibModalInstance.close();
                    }, function(err) {
                        $log.error(err);
                    });
                };

                $scope.enroll = function() {
                    var loginInfo = getLoginInfo();
                    if (!(validateSvc.validateEmailAddress(loginInfo.email) &&
                        validateSvc.validatePassword(loginInfo.password) &&
                        validateSvc.validatePassword(loginInfo.passwordConfirm))) {
                            $log.error('login info was not entered correctly');
                    }

                    UserService.createUser(loginInfo.email, loginInfo.password)
                    .then(function(result) {
                        $log.info('created user : ', JSON.stringify(loginInfo));
                        $log.info('with result: ', JSON.stringify(result));
                        $rootScope.loggedIn = true;
                        $uibModalInstance.close();
                    }, function(err){
                        $log.error(err);
                    });
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

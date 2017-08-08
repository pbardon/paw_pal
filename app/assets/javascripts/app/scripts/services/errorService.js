define('services/errorService', ['services'],
    function(services) {
        'use strict';
        return services.factory('ErrorService', [ '$log', '$rootScope',
        function($log, $rootScope) {
            function ErrorService() {
                this.handleEmailEntryError = function($scope) {
                    this.handleErrorRequest($scope, err, 'Email address is invalid');
                };

                this.handleInvalidPasswordError = function($scope) {
                    this.handleErrorRequest($scope, '', 'Password is invalid or confirmation does not match password.');
                };

                this.handleRegistrationError = function($scope, err) {
                    handleErrorRequest($scope, err, 'Registration Failed, try again...');
                };

                this.handleLoginError = function($scope, err) {
                    handleErrorRequest($scope, err, 'Login Failed, try again...');
                };

                this.handleErrorRequest = function($scope, err, msg) {
                    this.addError(msg);
                    $log.error(err);
                    this.clearLoginInfo($scope);
                };

                this.addError = function(msg) {
                    $rootScope.error = msg;
                };

                this.clearLoginInfo = function($scope) {
                    $scope.formData.password = '';
                    $scope.formData.passwordConfirm = '';
                    $scope.formData.email = '';
                };
            }

            return new ErrorService();
        }]);
    });

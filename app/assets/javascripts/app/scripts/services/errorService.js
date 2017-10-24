define('services/errorService', ['services'],
    function(services) {
        'use strict';
        return services.factory('ErrorService', [ '$log', '$rootScope',
        function($log, $rootScope) {
            function ErrorService() {
                this.handleEmailEntryError = function(err) {
                    this.handleErrorRequest(err, 'Email address is invalid');
                };

                this.handleInvalidPasswordError = function(err) {
                    this.handleErrorRequest(err, 'Password is invalid or confirmation does not match password.');
                };

                this.handleRegistrationError = function(err) {
                    handleErrorRequest(err, 'Registration Failed, try again...');
                };

                this.handleLoginError = function(err) {
                    handleErrorRequest(err, 'Login Failed, try again...');
                };

                this.handleErrorRequest = function(err, msg) {
                    this.addError(msg);
                    $log.error(err);
                };

                this.addError = function(msg) {
                    $rootScope.error = msg;
                };
            }

            return new ErrorService();
        }]);
    });

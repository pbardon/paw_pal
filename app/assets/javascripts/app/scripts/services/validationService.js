define('services/validationService',
    ['services',
    'services/errorService'],
    function(services) {
        'use strict';
        return services.factory('ValidationService', ['$log',
        'ErrorService',
        function($log, errSvc) {
            var validateEmail = function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            };

            function ValidationService() {
                this.validateEmailAddress = function(emailString) {
                    if (typeof emailString === 'undefined') {
                        return false;
                    }else if (emailString === '') {
                        return false;
                    }else if (!validateEmail(emailString)) {
                        return false;
                    }
                    return true;

                };

                this.validatePassword = function(loginInfo) {
                    if (typeof loginInfo.password === 'undefined') {
                        return false;
                    } else if (loginInfo.password === '') {
                        return false;
                    } else if (loginInfo.password.length < 6) {
                        return false;
                    }

                    if (loginInfo.passwordConfirm && loginInfo.password != loginInfo.passwordConfirm) {
                        return false;
                    }

                    return true;
                };

                this.validateLoginInfo = function($scope) {
                    if (!this.validateEmailAddress($scope.formData.email)) {
                        errSvc.handleEmailEntryError($scope);
                        return false;
                    }

                    if (!this.validatePassword($scope.formData)){
                        errSvc.handleInvalidPasswordError($scope);
                        return false;
                    }

                    return true;
                };
            }
            return new ValidationService();
        }
    ]);
});

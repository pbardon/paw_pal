define('services/validationService', ['services/services'], function(services){
    'use strict';

    function ValidationService() {
        this.validateEmailAddress = function(emailString) {
            if (typeof emailString === 'undefined') {
                return false;
            }

            if (emailString === '') {
                return false;
            }

            return true;

        };

        this.validatePassword = function(password) {
            if (typeof password === 'undefined') {
                return false;
            }

            if (password === '') {
                return false;
            }

            return true;
        };

        this.validatePasswordConfirmation = function(passwordConfirm) {
            if (typeof passwordConfirm === 'undefined') {
                return false;
            }

            if (passwordConfirm === '') {
                return false;
            }

            return true;
        };
    }

    return services.service('ValidationService', ValidationService);

});

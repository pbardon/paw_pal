define('services/validationService', ['services'], function(services){
    'use strict';

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

        this.validatePassword = function(password) {
            if (typeof password === 'undefined') {
                return false;
            } else if (password === '') {
                return false;
            } else if (password.length < 6) {
                return false;
            }

            return true;
        };
    }

    return services.service('ValidationService', ValidationService);

});

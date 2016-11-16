define('services/loginService', ['services'], function(services){
    'use strict';

    function LoginService() {
        this.users = ['Jim', 'Randy', 'Bob'];
    }

    return services.service('LoginService', LoginService);

});

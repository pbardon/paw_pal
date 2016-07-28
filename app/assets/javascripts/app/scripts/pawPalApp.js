define('pawPalApp', ['angular',
                      'uiRouter',
                      'uiBootstrap',
                      'controllers/controllers',
                      'constants/constants',
                      'services/services'], function(angular) {


    var app = angular.module('pawPalApp', ['ui.router',
        'ui.bootstrap',
        'controllers/controllers',
        'services/services',
        'constants/constants'
    ]);

    return app;
});

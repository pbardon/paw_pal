define('pawPalApp', ['angular',
                      'uiRouter',
                      'Devise',
                      'controllers/controllers',
                      'constants/constants',
                      'services/services'], function(angular) {


    var app = angular.module('pawPalApp', ['ui.router', 'Devise', 'controllers/controllers', 'services/services', 'constants/constants']);

    return app;
});

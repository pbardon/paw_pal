define('pawPalApp', ['angular',
                      'uiRouter',
                      'controllers/controllers',
                      'constants/constants',
                      'services/services'], function(angular) {


    var app = angular.module('pawPalApp', ['ui.router', 'controllers/controllers', 'services/services', 'constants/constants']);

    return app;
});

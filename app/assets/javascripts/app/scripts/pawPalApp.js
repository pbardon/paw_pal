define('pawPalApp', ['angular',
                      'uiRouter',
                      'uiBootstrap',
                      'controllers/controllers',
                      'constants/constants',
                      'services/services'],
       function(angular) {
            'use strict';

            var app = angular.module('pawPalApp', ['ui.router',
                'ui.bootstrap',
                'ngCookies',
                'controllers/controllers',
                'services/services',
                'constants/constants',
                'directives/directives'
            ]);

            return app;
        });

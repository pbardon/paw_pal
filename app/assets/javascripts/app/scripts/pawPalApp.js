define('pawPalApp', ['angular',
                      'angular-cookies',
                      'uiRouter',
                      'uiBootstrap',
                      'controllers/controllers',
                      'constants/constants',
                      'services/services',
                      'directives/directives'],
       function(angular) {
            'use strict';

            return angular.module('pawPalApp', ['ui.router',
                'ui.bootstrap',
                'ngCookies',
                'controllers/controllers',
                'services/services',
                'constants/constants',
                'directives/directives'
            ]);
        });

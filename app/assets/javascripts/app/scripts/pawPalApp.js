define('pawPalApp', ['angular',
                      'angular-cookies',
                      'uiRouter',
                      'uiBootstrap',
                      'controllers',
                      'constants',
                      'services',
                      'directives',
                      'interceptors'],
       function(angular) {
            'use strict';

            return angular.module('pawPalApp', ['ui.router',
                'ui.bootstrap',
                'ngCookies',
                'controllers',
                'services',
                'constants',
                'directives',
                'interceptors'
            ]);
        });

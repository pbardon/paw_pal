require.config({
    baseUrl : '/assets',
    paths: {
        'angular': 'vendor/bower_components/angular/angular.min',
        'jquery': 'vendor/bower_components/jquery/dist/jquery.min',
        'domReady': 'vendor/bower_components/domReady/domReady',
        'uiRouter' : 'vendor/bower_components/angular-ui-router/release/angular-ui-router.min',
        'pawPalApp' : 'app/scripts/pawPalApp',
        'services/services' : 'app/scripts/constants/constants',
        'constants/constants' : 'app/scripts/constants/constants',
        'constants/formConstants' : 'app/scripts/constants/formConstants',
        'controllers/controllers' : 'app/scripts/controllers/controllers',
        'controllers/mainController': 'app/scripts/controllers/mainController',
        'controllers/aboutContentController' : 'app/scripts/controllers/aboutContentController',
        'controllers/contactContentController' : 'app/scripts/controllers/contactContentController',
        'controllers/contentController' : 'app/scripts/controllers/contentController',
        'controllers/enrollmentController' : 'app/scripts/controllers/enrollmentController',
        'controllers/footerController' : 'app/scripts/controllers/footerController',
        'controllers/homeController' : 'app/scripts/controllers/homeController',
        'controllers/loginController' : 'app/scripts/controllers/loginController',
        'controllers/navbarController' : 'app/scripts/controllers/navbarController'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'uiRouter' : {
            deps: ['angular'],
            exports: 'uiRouter'
        }
    }
});

require([
    'angular',
    'pawPalApp',
    'domReady',
    'uiRouter',
    'constants/formConstants',
    'controllers/mainController',
    'controllers/aboutContentController',
    'controllers/contactContentController',
    'controllers/contentController',
    'controllers/enrollmentController',
    'controllers/footerController',
    'controllers/homeController',
    'controllers/loginController',
    'controllers/navbarController'
    ],
    function (angular, app, domReady) {
        'use strict';

        app.config(
        ['$stateProvider', '$locationProvider',
            function($stateProvider, $locationProvider) {

                var timestamp = new Date().getTime();

                $stateProvider
                    .state('home', {
                        url : '/',
                        views : {
                            'main' : {
                                controller: 'HomeCtrl',
                                templateUrl: 'templates/ ' + timestamp.toString() + '/home.html',
                            }
                        }
                    });

                $locationProvider.html5Mode(true);
            }]
        );

        domReady(function() {
            angular.bootstrap(document, ['pawPalApp']);
        });
});

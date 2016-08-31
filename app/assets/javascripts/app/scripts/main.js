require.config({
    baseUrl : '/assets',
    paths: {
        'angular': 'vendor/bower_components/angular/angular.min',
        'angular-cookies': 'vendor/bower_components/angular-cookies/angular-cookies.min',
        'jquery': 'vendor/bower_components/jquery/dist/jquery.min',
        'domReady': 'vendor/bower_components/domReady/domReady',
        'uiRouter' : 'vendor/bower_components/angular-ui-router/release/angular-ui-router.min',
        'uiBootstrap' : 'vendor/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'pawPalApp' : 'app/scripts/pawPalApp',
        'services/services' : 'app/scripts/services/services',
        'constants/constants' : 'app/scripts/constants/constants',
        'controllers/controllers' : 'app/scripts/controllers/controllers',
        'directives/directives' : 'app/scripts/directives/directives',
        'services/validationService' : 'app/scripts/services/validationService',
        'services/userService' : 'app/scripts/services/userService',
        'constants/formConstants' : 'app/scripts/constants/formConstants',
        'controllers/mainController': 'app/scripts/controllers/mainController',
        'controllers/aboutContentController' : 'app/scripts/controllers/aboutContentController',
        'controllers/contactContentController' : 'app/scripts/controllers/contactContentController',
        'controllers/contentController' : 'app/scripts/controllers/contentController',
        'controllers/enrollmentController' : 'app/scripts/controllers/enrollmentController',
        'controllers/footerController' : 'app/scripts/controllers/footerController',
        'controllers/homeController' : 'app/scripts/controllers/homeController',
        'controllers/loginModalController' : 'app/scripts/controllers/loginModalController',
        'controllers/loginController' : 'app/scripts/controllers/loginController',
        'controllers/navbarController' : 'app/scripts/controllers/navbarController'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'uiRouter' : {
            deps: ['angular']
        },
        'uiBootstrap' : {
            deps: ['angular']
        },
        'angular-cookies' : {
            deps: ['angular']
        }
    }
});

require([
    'angular',
    'pawPalApp',
    'domReady',
    'angular-cookies',
    'uiRouter',
    'uiBootstrap',
    'constants/constants',
    'services/services',
    'controllers/controllers',
    'directives/directives',
    'services/validationService',
    'services/userService',
    'constants/formConstants',
    'controllers/mainController',
    'controllers/aboutContentController',
    'controllers/contactContentController',
    'controllers/contentController',
    'controllers/enrollmentController',
    'controllers/footerController',
    'controllers/homeController',
    'controllers/loginModalController',
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
                            'navbar' : {
                                templateUrl: '/templates/' + timestamp.toString() + '/navbar.html',
                                controller: 'NavbarCtrl'
                            },
                            'main' : {
                                controller: 'HomeCtrl',
                                templateUrl: 'templates/' + timestamp.toString() + '/home.html'
                            },
                            'footer' : {
                                templateUrl: 'templates/' + timestamp.toString() + '/footer.html',
                                controller: 'FooterCtrl'
                            }
                        }
                    })

                        // define modal route "/modal"
                     .state('login', {
                        url: '/login',
                        views: {
                           'navbar' : {
                               templateUrl: '/templates/' + timestamp.toString() + '/navbar.html',
                               controller: 'NavbarCtrl'
                           },
                           'main' : {
                               controller: 'HomeCtrl',
                               templateUrl: 'templates/' + timestamp.toString() + '/home.html'
                           },
                           'footer' : {
                               templateUrl: 'templates/' + timestamp.toString() + '/footer.html',
                               controller: 'FooterCtrl'
                           }
                        },
                        onEnter: ['$stateParams', '$state', '$uibModal',
                             function($stateParams, $state, $uibModal) {
                                 $uibModal.open({
                                    templateUrl: 'templates/' + timestamp.toString() + '/loginModal.html',
                                    controller: 'LoginModalCtrl'
                                 })
                                 // change route after modal result
                                 .result.then(function() {
                                   // change route after clicking OK button
                                   $state.transitionTo('home');
                                 }, function() {
                                   // change route after clicking Cancel button or clicking background
                                   $state.transitionTo('home');
                                 });
                             }]
                    }).state('/profile', {
                        url: '/profile',
                        views: {
                            'navbar' : {
                                templateUrl: '/templates/' + timestamp.toString() + '/navbar.html',
                                controller: 'NavbarCtrl'
                            },
                            'main' : {
                                controller: 'ProfileCtrl',
                                templateUrl: 'templates/' + timestamp.toString() + '/profile.html'
                            },
                            'footer' : {
                                templateUrl: 'templates/' + timestamp.toString() + '/footer.html',
                                controller: 'FooterCtrl'
                            }
                        }
                    }).state('/dogs', {
                        url: '/dogs',
                        views: {
                            'navbar' : {
                                templateUrl: '/templates/' + timestamp.toString() + '/navbar.html',
                                controller: 'NavbarCtrl'
                            },
                            'main' : {
                                controller: 'ProfileCtrl',
                                templateUrl: 'templates/' + timestamp.toString() + '/profile.html'
                            },
                            'footer' : {
                                templateUrl: 'templates/' + timestamp.toString() + '/footer.html',
                                controller: 'FooterCtrl'
                            }
                        }
                    }).state('/settings', {
                        url: '/login',
                        views: {
                            'navbar' : {
                                templateUrl: '/templates/' + timestamp.toString() + '/navbar.html',
                                controller: 'NavbarCtrl'
                            },
                            'main' : {
                                controller: 'ProfileCtrl',
                                templateUrl: 'templates/' + timestamp.toString() + '/settings.html'
                            },
                            'footer' : {
                                templateUrl: 'templates/' + timestamp.toString() + '/footer.html',
                                controller: 'FooterCtrl'
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

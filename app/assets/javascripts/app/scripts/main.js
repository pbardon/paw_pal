require.config({
    baseUrl : '/assets',
    paths: {
        'angular': 'vendor/bower_components/angular/angular.min',
        'jquery': 'vendor/bower_components/jquery/dist/jquery.min',
        'domReady': 'vendor/bower_components/domReady/domReady',
        'uiRouter' : 'vendor/bower_components/angular-ui-router/release/angular-ui-router.min',
        'Devise': 'vendor/bower_components/AngularDevise/lib/devise',
        'pawPalApp' : 'app/scripts/pawPalApp',
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
            exports: 'ui.router'
        },
        'Devise' : {
            deps: ['angular'],
            exports: 'Devise'
        }
    }
});

require([
    'angular',
    'pawPalApp',
    'domReady',
    'uiRouter',
    'Devise',
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
                            'navbar' : {
                                templateUrl: '/templates/' + timestamp + '/navbar.html',
                                controller: 'NavbarCtrl'
                            },

                            'main' : {
                                controller: 'HomeCtrl',
                                templateUrl: 'templates/' + timestamp + '/home.html',
                            },
                            'footer' : {
                                templateUrl: 'templates/' + timestamp + '/footer.html',
                                controller : 'FooterCtrl'
                            }
                        }
                    })
                    .state('about', {
                        url : '/about',
                        views : {
                            'navbar' : {
                                templateUrl: '/templates/' + timestamp + '/navbar.html',
                                controller: 'NavbarCtrl'
                            },

                            'main' : {
                                controller: 'AboutContentCtrl',
                                templateUrl: 'templates/' + timestamp + '/about.html',
                            },
                            'footer' : {
                                templateUrl: 'templates/' + timestamp + '/footer.html',
                                controller : 'FooterCtrl'
                            }
                        }
                    })
                    .state('contact', {
                        url : '/contact',
                        views : {
                            'navbar' : {
                                templateUrl: '/templates/' + timestamp + '/navbar.html',
                                controller: 'NavbarCtrl'
                            },

                            'main' : {
                                controller: 'ContactContentCtrl',
                                templateUrl: 'templates/' + timestamp + '/contact.html',
                            },
                            'footer' : {
                                templateUrl: 'templates/' + timestamp + '/footer.html',
                                controller : 'FooterCtrl'
                            }
                        }
                    }).state('login', {
                        url : '/login',
                        views : {
                            'navbar' : {
                                templateUrl: '/templates/' + timestamp + '/navbar.html',
                                controller: 'NavbarCtrl'
                            },

                            'main' : {
                                controller: 'LoginCtrl',
                                templateUrl: 'templates/' + timestamp + '/login.html',
                            },
                            'footer' : {
                                templateUrl: 'templates/' + timestamp + '/footer.html',
                                controller : 'FooterCtrl'
                            }
                        }
                    })
                    .state('enroll', {
                        url : '/enroll',
                        views : {
                            'navbar' : {
                                templateUrl: '/templates/' + timestamp + '/navbar.html',
                                controller: 'NavbarCtrl'
                            },

                            'main' : {
                                templateUrl:  '/templates/' + timestamp + '/enroll.html',
                                controller: 'EnrollmentCtrl'
                            },
                            'footer' : {
                                templateUrl: 'templates/' + timestamp + '/footer.html',
                                controller : 'FooterCtrl'
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

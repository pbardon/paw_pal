var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
    // Karma serves files from '/base'

    baseUrl: '/base',

    paths: {
        'domReady': '/base/vendor/bower_components/domReady/domReady',
        'underscore': '/base/vendor/bower_components/underscore/underscore-min',
        'jquery': '/base/vendor/bower_components/jquery/dist/jquery.min',
        'angular': '/base/vendor/bower_components/angular/angular.min',
        'angularMocks': '/base/vendor/bower_components/angular-mocks/angular-mocks',
        'uiRouter' : '/base/vendor/bower_components/angular-ui-router/release/angular-ui-router',
        'Devise': '/base/vendor/bower_components/AngularDevise/lib/devise',
        'services/services' : '/base/app/scripts/services/services',
        'controllers/controllers' : '/base/app/scripts/controllers/controllers',
        'services/loginService' : '/base/app/scripts/services/loginService',
        'controllers/mainController': '/base/app/scripts/controllers/mainController',
        'controllers/aboutContentController' : '/base/app/scripts/controllers/aboutContentController',
        'controllers/contactContentController' : '/base/app/scripts/controllers/contactContentController',
        'controllers/contentController' : '/base/app/scripts/controllers/contentController',
        'controllers/enrollmentController' : '/base/app/scripts/controllers/enrollmentController',
        'controllers/footerController' : '/base/app/scripts/controllers/footerController',
        'controllers/homeController' : '/base/app/scripts/controllers/homeController',
        'controllers/loginController' : '/base/app/scripts/controllers/loginController',
        'controllers/navbarController' : '/base/app/scripts/controllers/navbarController',
        'constants/constants' : '/base/app/scripts/constants/constants',
        'constants/formConstants' : '/base/app/scripts/constants/formConstants',
        'pawPalApp': '/base/app/scripts/pawPalApp',
        'mainSpec' : '/base/test/spec/mainSpec'
    },

    shim: {

        'jquery' : {
         exports: 'jquery'
        },

        'angular': {
          exports: 'angular',
          deps: ['jquery']
        },

        'uiRouter' : {
            deps: ['angular']
        }

        'angularMocks' : {
            deps: ['angular'],
            exports: 'angularMocks'
        }

    },


    // ask Require.js to load these files (all our tests)
    deps: tests,

    callback: window.__karma__.start
});

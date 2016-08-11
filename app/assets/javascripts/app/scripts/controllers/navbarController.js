define('controllers/navbarController', ['controllers/controllers'],
    function(controllers) {
        'use strict';
        controllers.controller('NavbarCtrl', ['$rootScope',
                                              '$scope',
                                              '$location',
                                              '$uibModal',
                                              '$log',
            function($rootScope, $scope, $location, $uibModal, $log){

                $scope.animationsEnabled = true;

                $scope.isLoggedIn = function() {
                    return !!$rootScope.loggedIn;
                };
            }
        ]);
    }
);

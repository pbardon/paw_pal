define('controllers/navbarController',
    ['controllers/controllers', 'services/userService'],
    function(controllers) {
        'use strict';
        controllers.controller('NavbarCtrl', ['$rootScope',
                                              '$scope',
                                              '$location',
                                              '$uibModal',
                                              '$log',
                                              '$state',
                                              'UserService',
            function($rootScope, $scope, $location, $uibModal, $log, $state, UserService){

                var usrSvc = UserService;

                $scope.animationsEnabled = true;

                $scope.isLoggedIn = function() {
                    return !!usrSvc.isUserLoggedIn();
                };

                $scope.logout = function() {
                    return usrSvc.logoutCurrentUser()
                    .then(function(){
                        $state.transitionTo('home');
                    }, function(err){
                        $log.error(err)
                    });
                };
            }
        ]);
    }
);

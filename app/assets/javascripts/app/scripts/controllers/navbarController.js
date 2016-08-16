define('controllers/navbarController',
    ['controllers/controllers', 'services/userService'],
    function(controllers) {
        'use strict';
        controllers.controller('NavbarCtrl', ['$rootScope',
                                              '$scope',
                                              '$location',
                                              '$uibModal',
                                              '$log',
                                              'UserService',
            function($rootScope, $scope, $location, $uibModal, $log, UserService){

                var usrSvc = UserService;

                $scope.animationsEnabled = true;

                $scope.isLoggedIn = function() {
                    return !!usrSvc.isUserLoggedIn();
                };

                $scope.logout = function() {
                    return usrSvc.logoutCurrentUser()
                    .then(function(){
                        $rootScope.loggedIn = false
                    }, function(err){
                        $log.error(err)
                    });
                };
            }
        ]);
    }
);

define('controllers/navbarController', ['controllers/controllers'],
    function(controllers) {
        controllers.controller('NavbarCtrl', ['$rootScope',
                                              '$scope',
                                              '$log',
                                              'Auth',
            function($rootScope, $scope, $log, Auth){

                $scope.init = function() {
                        Auth.currentUser().then(function(currentUser) {
                            $rootScope.loggedIn = true;
                        }, function(err) {
                            $log.error(err);
                        });
                };

                $scope.isLoggedIn = function() {
                    return !!$rootScope.loggedIn;
                };

            }
        ]);
    }
);

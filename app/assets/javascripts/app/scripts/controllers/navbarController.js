define('controllers/navbarController', ['controllers/controllers'],
    function(controllers) {
        'use strict';
        controllers.controller('NavbarCtrl', ['$rootScope',
                                              '$scope',
                                              '$uibModal',
                                              '$log',
            function($rootScope, $scope, $uibModal, $log){

                $scope.animationsEnabled = true;

                $scope.isLoggedIn = function() {
                    return !!$rootScope.loggedIn;
                };


                $scope.open = function(size) {
                    var timestamp = new Date().getTime();

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: '/templates/' + timestamp.toString() + '/loginModal.html',
                        controller: 'LoginModalCtrl',
                        size: size,
                        resolve: {
                            formData: function() {
                                return $scope.formData;
                            }
                        }
                    });

                    modalInstance.result.then(function(){
                        $log.info('login modal closed');
                    },function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };

            }
        ]);
    }
);

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


                $scope.open = function(size) {
                    var timestamp = new Date().getTime();

                    $location.url('login');

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
                        $location.url('home');
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

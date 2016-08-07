define('controllers/loginController', ['controllers/controllers', 'controllers/loginModalController'],
    function(controllers) {
        controllers.controller('LoginCtrl', ['$rootScope',
                                             '$scope',
                                             '$state',
                                             '$http',
                                             '$uibModal',
                                             '$log',
           function($rootScope, $scope, $state, $http, $uibModal, $log){

                $scope.formData = {
                    username: '',
                    password: ''
                };

                $scope.animationsEnabled = true;

                var timestamp = new Date();

                $scope.open = function(size) {
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

                    modalInstance.result.then(function(selectedItem){
                        $scope.selected = selectedItem;
                    },function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };


                $scope.login = function() {
                    if ($scope.formData.username === "" || $scope.formData.password === "" ) {
                        console.log('no username or password was supplied');
                        return false;
                    }

                    $http.post("/api/login", JSON.stringify($scope.formData))
                         .then(function(response, err) {
                            if (err) {
                                console.log(JSON.stringify(err));
                                throw err;
                            }
                            console.log("received response from post request...");
                            console.log(response);

                    });
                };
            }
        ]);
    }
);

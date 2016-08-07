define('controllers/loginController', ['controllers/controllers'],
    function(controllers) {
        controllers.controller('LoginCtrl', ['$rootScope',
                                             '$scope',
                                             '$state',
                                             '$http',
                                             '$log',
           function($rootScope, $scope, $state, $http, $log){

                $scope.formData = {
                    username: '',
                    password: ''
                };

                var timestamp = new Date();

                $scope.login = function() {
                    if ($scope.formData.username === "" || $scope.formData.password === "" ) {
                        $log.error('no username or password was supplied');
                        return false;
                    }

                    $http.post("/api/login", JSON.stringify($scope.formData))
                         .then(function(response, err) {
                            if (err) {
                                console.log(JSON.stringify(err));
                                throw err;
                            }
                            $log.info("received response from post request...");
                            $log.info(response);

                    });
                };
            }
        ]);
    }
);

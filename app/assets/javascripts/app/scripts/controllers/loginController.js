define('controllers/loginController', ['controllers/controllers'],
    function(controllers) {
        controllers.controller('LoginCtrl', ['$rootScope',
                                             '$scope',
                                             '$state',
                                             '$http',
           function($rootScope, $scope, $state, $http){

                $scope.formData = {
                    username: '',
                    password: ''
                };


                $scope.login = function() {
                    if ($scope.formData.username === "" || $scope.formData.password === "" ) {
                        console.log('no username or password was supplied');
                        return false;
                    }

                    $http.post("/api/login", JSON.stringify($scope.formData),
                    function(err, response) {
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

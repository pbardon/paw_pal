define('controllers/loginController', ['controllers/controllers'],
    function(controllers) {
        controllers.controller('LoginCtrl', ['$rootScope',
                                             '$scope',
                                             '$state',
                                             'Auth',
           function($rootScope, $scope, $state, Auth){

                $scope.formData = {
                    username: '',
                    password: ''
                };

                $scope.submit = function(data) {
                    var credentials = {
                        email: $scope.formData.username,
                        password: $scope.formData.password,
                    };

                    Auth.login(credentials, {}).then(function(loggedInUser) {
                        console.log(loggedInUser);
                        $rootScope.loggedIn = true;
                    }, function(err) {
                        //Login failure..
                        console.log('login failed with error: ');
                        console.log(err);
                    });
                };

                $scope.$on('devise:new-session', function(event, user) {
                    console.log('login complete, with user:');
                    console.log(user);

                    $state.go('home');

                    Auth.currentUser().then(function(user) {
                        console.log(user);
                    });
                });
            }
        ]);
    }
);

define('controllers/enrollmentController', ['controllers/controllers'], function(controllers) {
    'use strict';
    controllers.controller('EnrollmentCtrl', ['$rootScope',
                                              '$scope',
                                              'Auth',
                                              'formConstants',
        function($rootScope, $scope, Auth, formConstants){

            $scope.formData = {
                'username': '',
                'firstName': '',
                'lastName': '',
                'address' : '',
                'city' : '',
                'state' : '',
                'zipcode' : '',
                'password' : '',
                'passwordConfirm' : ''
            };

            $scope.formData.states = formConstants.states;

            $scope.init = function() {
                console.log('started enrollmentController');
            };


            $scope.submit = function() {

                //do enrollment stuff here...

                var credentials = {
                    email: $scope.formData.username,
                    password: $scope.formData.password,
                    password_confirmation: $scope.formData.passwordConfirm
                };

                Auth.register(credentials).then(function(registeredUser) {
                            console.log(registeredUser); // => {id: 1, ect: '...'}
                            $rootScope.loggedIn = true;
                }, function(error) {
                    // Registration failed...
                });

                $scope.$on('devise:new-registration', function(event, user) {
                    console.log(user);


                    Auth.currentUser().then(function(user) {
                        console.log(user);
                    });
                });

            };

        }]);
});

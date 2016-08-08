define('controllers/enrollmentController', ['controllers/controllers'], function(controllers) {
    'use strict';
    controllers.controller('EnrollmentCtrl', ['$rootScope',
                                              '$scope',
                                              'formConstants',
        function($rootScope, $scope, formConstants){

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

        }]);
});

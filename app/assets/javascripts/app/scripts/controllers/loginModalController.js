define('controllers/loginModalController', ['controllers/controllers', 'directives/enrollDirective'],
    function(controllers) {
        'use strict';
        controllers.controller('LoginModalCtrl', ['$scope',
             '$rootScope',
             '$http',
             '$log',
             '$uibModalInstance',
             'formConstants',
             function ($scope, $rootScope, $http,
                       $log, $uibModalInstance, formConstants,
                       formData) {

                $scope.formData = formData || {};

                $scope.loginSelected = true;

                $scope.toggleLoginSelected = function() {
                    $scope.loginSelected = !$scope.loginSelected;
                };

                $scope.ok = function () {
                    $uibModalInstance.close();
                };

                $scope.login = function() {
                    if ($scope.formData.email === '' || $scope.password === '') {
                        $log.error('user name or password as not provided.');
                    }
                    var loginInfo = {
                        email: $scope.formData.email,
                        password: $scope.formData.password
                    };

                    $http.post('/session',
                        JSON.stringify(loginInfo))
                    .then(function(results) {
                        $log.info('success response from server:\n',
                            JSON.stringify(results));
                        $rootScope.loggedIn = true;

                    }, function(err) {
                        $log.error('error response from new session was ', JSON.stringify(err));

                    });
                };

                $scope.formData.states = formConstants.states;

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
        }]);
});

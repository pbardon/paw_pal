define('controllers/dogFormController', ['controllers', 'services/dogService'], function(controllers) {
    controllers.controller('DogFormCtrl', ['$scope', 'DogService', '$log', '$state', function($scope, dogService, $log, $state){


        $scope.formData = {
            name: '',
            age: '',
            description: '',
            size: '',
            picture: {}
        };

        $scope.submit = function () {
            dogService.createDog($scope.formData).then(function(result) {
                if (result && result.data) {
                    $log.info(result.data);
                    $state.go('profile');
                    return;
                }
                throw 'Did not receive correct result from server..';
            }, function(err) {
                $log.error(err);
            });
        }
    }]);
});

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
            $log.info($scope.model);
            dogService.createDog($scope.formData).then(function(result) {
                if (result.data) {
                    $log.info(result.data);
                }
                $state.go('profile');
            }, function(err) {
                $log.error(err);
            });
        }
    }]);
});

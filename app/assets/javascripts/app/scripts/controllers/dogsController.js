define('controllers/dogsController', ['controllers/controllers', 'services/dogService'], function(controllers) {
    controllers.controller('DogsCtrl', ['$scope', 'DogService', '$log', function($scope, dogService, $log){
        $scope.index = function() {

            dogService.getCurrentUserDogs().then(function(result) {
                $log.info(result);
            });
        }
    }]);
});

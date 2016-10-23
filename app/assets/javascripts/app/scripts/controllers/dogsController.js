define('controllers/dogsController', ['controllers/controllers', 'services/dogService'], function(controllers) {
    controllers.controller('DogsCtrl', ['$scope', 'DogService', '$log', function($scope, dogService, $log){
        $scope.index = function() {
            dogService.getCurrentUserDogs().then(function(result) {
                $log.info(result);
                $scope.dogs = result;
            });
        };

        $scope.nextPage = function() {
            if ($scope.dogs.length - 1 > $scope.maxPageIdx) {
                $scope.minPageIdx += 4;
                $scope.maxPageIdx += 4;
            }
        };

        $scope.previousPage = function () {
            if ($scope.minPageIdx > 3) {
                $scope.minPageIdx -= 4;
                $scope.maxPageIdx -= 4;
            }
        };

        $scope.isOnPage = function(index) {
            return (index >= $scope.minPageIdx && index <= $scope.maxPageIdx);
        };

        $scope.dogs = [];

        $scope.minPageIdx = 0;
        $scope.maxPageIdx = 3;
    }]);
});

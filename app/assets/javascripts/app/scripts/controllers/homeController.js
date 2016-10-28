define('controllers/homeController', ['controllers', 'services/dogService'], function(controllers) {
    controllers.controller('HomeCtrl', ['$scope', '$log', 'DogService', function($scope, $log, dogService){
        $scope.dogs = [];
        $scope.dogRows = [];

        $scope.page = 1;

        $scope.refreshList = function() {
            dogService.getDogPage($scope.page).then(function(result) {
                $log.info(result);
                $scope.dogs = result;
                tmp = [];
                $scope.dogs.forEach(function(item, i) {
                    tmp.push(item);
                    if (tmp.length == 4 || i == $scope.dogs.length - 1) {
                        $scope.dogRows.push(tmp);
                        tmp = []
                    }
                });
                $scope.dogRows = $scope.dogRows.splice(0, 3)
            });
        };

        $scope.breakLine = function(index) {
            return (index % 3 == 0);
        }
    }]);
});

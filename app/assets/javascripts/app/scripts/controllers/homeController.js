define('controllers/homeController', ['controllers', 'services/dogService'], function(controllers) {
    controllers.controller('HomeCtrl', ['$scope', '$log', 'DogService', function($scope, $log, dogService){
        $scope.dogs = [];
        $scope.dogRows = [];

        $scope.page = 1;

        $scope.pages = [ 1, 2, 3];

        $scope.refreshList = function() {
            return dogService.getDogPage($scope.page).then(function(result) {
                $log.info(result);
                $scope.dogRows = [];
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

        $scope.newPage = function(newPageNum) {
            $scope.page = newPageNum;
            $scope.refreshList();
        };

        $scope.showNextPages = function() {
            $scope.pages = $scope.pages.map(function(x) { return x + 3; })
        };

        $scope.showPrevPages = function() {
            $scope.pages = $scope.pages.map(function(x) { return x - 3; })
        };

        $scope.breakLine = function(index) {
            return (index % 3 == 0);
        }
    }]);
});

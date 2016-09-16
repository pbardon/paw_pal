define('controllers/homeController', ['controllers/controllers'], function(controllers) {
    controllers.controller('HomeCtrl', ['$scope', function($scope){
        $scope.dogs = [];

        $scope.refreshList = function() {

        }

    }]);
});

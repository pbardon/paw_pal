define('controllers/loginModalController', ['controllers/controllers'],
    function(controllers) {
        controllers.controller('LoginModalCtrl', ['$scope', '$uibModalInstance',
         function ($scope, $uibModalInstance, items) {

            $scope.items = items;
            $scope.selected = {
                formData: $scope.formData
            };

            $scope.ok = function () {
                $uibModalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
});

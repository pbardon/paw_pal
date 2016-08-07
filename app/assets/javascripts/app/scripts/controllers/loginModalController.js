define('controllers/loginModalController', ['controllers/controllers'],
    function(controllers) {
        controllers.controller('LoginModalCtrl', ['$scope', '$uibModalInstance',
         function ($scope, $uibModalInstance, formData) {

            $scope.formData = formData;

            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
});

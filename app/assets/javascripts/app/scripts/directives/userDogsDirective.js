define('directives/userDogsDirective', ['directives', 'controllers', 'controllers/dogsController'],
    function(directives) {
        'use strict';
        directives.directive('userDogs', [ 'DogsCtrl', function(dogController) {
            return {
                restrict: 'EA',
                controller: dogController,
                templateUrl: '/templates/' + timestamp.toString() + '/dog.html'
            };
        }]);
    }
);
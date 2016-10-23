define('directives/errorDirective', ['directives/directives'],
    function(directives) {
        'use strict';
        directives.directive('errorMessage', [function() {
            return {
                restrict: 'AE',
                replace: true,
                template: '<p>Error message is: </p>',
                link: function(scope, element, attrs) {}
            };
        }]);
    }
);
define('directives/enrollDirective', ['directives/directives',
                           'controllers/enrollmentController'],
        function(directives) {
            'use strict';
            directives.directive('enrollForm', ['EnrollmentCtrl',
                function(enrollmentController) {
                    var timestamp = new Date();
                    return {
                        restrict: 'EA',
                        controller: enrollmentController,
                        templateUrl: '/templates/' + timestamp.toString() + '/enroll.html'
                    };
                }
            ]);
        }
    );

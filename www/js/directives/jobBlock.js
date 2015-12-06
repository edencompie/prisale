angular.module('jobhop.directives')
.directive('jobBlock', jobBlock);

jobBlock.$inject = [];

function jobBlock() {
    return {
        restrict: 'E',
        scope: {
            job: '=',
            link: '=',
            employer: '=',
            employee: '='
        },
        templateUrl: 'views/employees/job-template.html',
        link: function(scope, element, attrs) {

        }
    };
};

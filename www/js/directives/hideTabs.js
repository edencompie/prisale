angular.module('jobhop.directives')
.directive('hideTabs', hideTabs);

hideTabs.$inject = [];

function hideTabs() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$root.hideTabs = 'tabs-item-hide';
            scope.$on('$destroy', function() {
                scope.$root.hideTabs = '';
            });
        }
    };
};

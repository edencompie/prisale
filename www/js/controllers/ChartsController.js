angular.module('jobhop.controllers')
    .controller('ChartsController', ChartsController);

ChartsController.$inject = ['$rootScope', '$http', '$cordovaSocialSharing', '$filter', '$ionicPopup', '$scope'];

function ChartsController($rootScope, $http, $cordovaSocialSharing, $filter, $ionicPopup, $scope) {

    function getCheckedProducts() {
        var checked = [];
        for (var i=0; i<$rootScope.items.length; i++) {
            if ($rootScope.items[i].checked) {
                checked.push($rootScope.items[i]);
            }
        }

        return checked;
    }
}

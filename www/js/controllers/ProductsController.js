angular.module('jobhop.controllers')
    .controller('ProductsController', ProductsController);

ProductsController.$inject = ['$rootScope', '$http', '$cordovaSocialSharing', '$filter', '$ionicPopup', '$scope'];

function ProductsController($rootScope, $http, $cordovaSocialSharing, $filter, $ionicPopup, $scope) {
    //Toggle 1 or 2 items per row
    $rootScope.viewClassName = 'two-per-row';
    $rootScope.changeView = function() {
        $rootScope.viewClassName = $rootScope.viewClassName == 'two-per-row' ? '' : 'two-per-row';
        return false;
    };


    $rootScope.resetProducts = function() {
        $rootScope.items = [];
        no_more_data_to_load = false;
        $rootScope.loadMore();
    };


    $scope.shareProduct = function(product) {
        $cordovaSocialSharing.share(
            'פריסייל - '+product.name);
    };


    //Set which product info will be displayed in list
    $rootScope.setListDetails = function(listDetails) {
        $rootScope.listDetails = listDetails;
        $rootScope.closeDetailsPopup();
    };
    $rootScope.userType = 'wholesale';
    $rootScope.listDetails = 'price';
    $rootScope.setUserType = function(userType) {
        $rootScope.userType = userType;
    };
    $scope.topQualityPrice = function(item) {
        return item.topQuality[$scope.userType].price;
    };
    $scope.primeQualityPrice = function(item) {
        return item.primeQuality[$scope.userType].price;
    };
    $scope.topQualityAvgPrice = function(item) {
        return item.topQuality[$scope.userType].weeklyAvg;
    };
    $scope.primeQualityAvgPrice = function(item) {
        return item.primeQuality[$scope.userType].weeklyAvg;
    };
    $scope.topQualityPercentChange = function(item) {
        return item.topQuality[$scope.userType].percentChange;
    };
    $scope.primeQualityPercentChange = function(item) {
        return item.primeQuality[$scope.userType].percentChange;
    };



    //Load products
    $rootScope.items = [];
    $rootScope.filterName  = undefined;
    $rootScope.filterDate  = $filter('date')(new Date(), 'yyyy-MM-dd');
    $rootScope.filterType  = '';
    $rootScope.filterOrder = 'DAILY_CHANGE';
    $rootScope.filterSort  = undefined;
    var no_more_data_to_load = false;
    $rootScope.loadMore = function() {

        // Workaround to make sure productsNotifications are ready
        if ($rootScope.productsNotifications === undefined) {
            setTimeout($rootScope.loadMore, 300);
            return;
        }

        //todo $rootScope.filterName

        var url = 'http://62.219.7.38/api/Public?pwd=ck32HGDESf13ekcs&name=&item_type='+$rootScope.filterType+'&order='+$rootScope.filterOrder+'&date='+$rootScope.filterDate+'&page='+parseInt($rootScope.items.length/50);
        $http.get(url)
            .then(function(items) {
                if (items.data.length < 50) {
                    no_more_data_to_load = true;
                }

                for(var i =0; i<items.data.length; i++) {
                    items.data[i].percent = $rootScope.productsNotifications[items.data[i].id] ? $rootScope.productsNotifications[items.data[i].id].get('percent') : null;
                    $rootScope.items.push(items.data[i]);
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
    $scope.moreDataCanBeLoaded = function() {
        return ! no_more_data_to_load;
    };


    $rootScope.openNameFilter = function() {
        console.log('openNameFilter');
    };

    //Check products
    $scope.itemClicked = function(item) {
        item.checked = ! item.checked;
    };

}

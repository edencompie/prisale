angular.module('jobhop.controllers')
    .controller('ProductsController', ProductsController);

angular.module('jobhop').directive('onFinishRender', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            if (scope.$last === true) {
                element.ready(function () {

                });
            }
        }
    }
});

ProductsController.$inject = ['$ionicLoading', '$document', '$rootScope', '$location', '$http', '$cordovaSocialSharing', '$filter', '$scope'];

function ProductsController($ionicLoading, $document, $rootScope, $location, $http, $cordovaSocialSharing, $filter, $scope) {

    $rootScope.productForChart = undefined;

    //Toggle 1 or 2 items per row
    $rootScope.viewClassName = 'two-per-row';
    $rootScope.changeView = function() {
        $rootScope.viewClassName = $rootScope.viewClassName == 'two-per-row' ? '' : 'two-per-row';
    };



    $rootScope.resetProducts = function() {
        $rootScope.items = [];
        $scope.no_more_data_to_load = false;
        $rootScope.loadMore();
    };


    $scope.fridayOrSaturday = function() {
        var dayInWeek = $filter('date')($rootScope.filterDate, 'EEEE');
        return (dayInWeek == 'Saturday' || dayInWeek == 'Friday');
    };


    $scope.shareProduct = function(product) {
        $cordovaSocialSharing.share(
            'עדכון מעניין מאפליקציית פריסייל על '
            +product.name+"\nhttp://google.com");
    };


    //Set which product info will be displayed in list
    $rootScope.setListDetails = function(listDetails) {
        $rootScope.listDetails = listDetails;
        $rootScope.closeDetailsPopup();
    };
    $rootScope.userType = 'wholesale';
    $rootScope.listDetails = 'price';
    $scope.hideProductsWithoutPrice = function(item) {
        return item.topQuality[$scope.userType].price || item.primeQuality[$scope.userType].price;
    };
    $scope.isSelected = function(item) {
        if ( ! $scope.filterBySelected) {
            return true;
        }

        return item.checked;
    };
    $scope.topQualityPrice = function(item) {
        return item.topQuality[$scope.userType].price > 0 ? item.topQuality[$scope.userType].price+' ש"ח' : '--';
    };
    $scope.primeQualityPrice = function(item) {
        return item.primeQuality[$scope.userType].price > 0 ? item.primeQuality[$scope.userType].price+' ש"ח' : '--';
    };
    $scope.topQualityAvgPrice = function(item) {
        return item.topQuality[$scope.userType].weeklyAvg > 0 ? item.topQuality[$scope.userType].weeklyAvg+' ש"ח' : '--';
    };
    $scope.primeQualityAvgPrice = function(item) {
        return item.primeQuality[$scope.userType].weeklyAvg > 0 ? item.primeQuality[$scope.userType].weeklyAvg+' ש"ח' : '--';
    };
    $scope.topQualityPercentChange = function(item) {
        return item.topQuality[$scope.userType].percentChange > 0 ? item.topQuality[$scope.userType].percentChange+'%' : '--';
    };
    $scope.primeQualityPercentChange = function(item) {
        return item.primeQuality[$scope.userType].percentChange > 0 ? item.primeQuality[$scope.userType].percentChange+'%' : '--';
    };



    //Load products
    $rootScope.items = [];
    $rootScope.filterName  = '';
    $rootScope.filterType  = '';
    $rootScope.filterOrder = 'ABC';
    $rootScope.filterSort  = undefined;
    $scope.no_more_data_to_load = false;
    $rootScope.loadMore = function() {

        if ($scope.no_more_data_to_load) {
            return;
        }

        if ($scope.fridayOrSaturday()) {
            $rootScope.items = [];
            $scope.no_more_data_to_load = true;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return;
        }

        // Workaround to make sure productsNotifications are ready
        if ($rootScope.productsNotifications === undefined) {
            setTimeout($rootScope.loadMore, 150);
            return;
        }

        var url = 'http://62.219.7.38/api/Public?pwd=ck32HGDESf13ekcs&name='+$rootScope.filterName+'&item_type='+$rootScope.filterType+'&order='+$rootScope.filterOrder.toString().replace('_desc', '')+'&date='+$filter('date')($rootScope.filterDate, 'yyyy-MM-dd')+'&page='+parseInt($rootScope.items.length/50)+'&desc='+($rootScope.filterOrder.indexOf('desc') == -1 ? '0' : '1');
        $http.get(url)
            .then(function(items) {
                if (items.data.length < 50) {
                    $scope.no_more_data_to_load = true;
                }

                for(var i =0; i<items.data.length; i++) {
                    items.data[i].percent = $rootScope.productsNotifications[items.data[i].id] ? $rootScope.productsNotifications[items.data[i].id].get('percent') : null;
                    $rootScope.items.push(items.data[i]);
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };

   /* $scope.$on('$stateChangeSuccess', function(a,b) {
        console.log('$stateChangeSuccess');
        //console.log('$rootScope.moreDataCanBeLoaded', $rootScope.moreDataCanBeLoaded());
        //if (b.name == 'withTabs.productsWholesale' && $rootScope.moreDataCanBeLoaded() && $rootScope.items.length == 0) {
            $rootScope.loadMore();
        //}
    });*/
    $rootScope.moreDataCanBeLoaded = function() {
        return ! $scope.no_more_data_to_load;
    };

    $rootScope.isNextToHeightProduct = function(item) {
        return ! $scope.no_more_data_to_load;
    };

    $scope.itemHolded = function(item) {
        navigator.vibrate(100);
        item.checked = ! item.checked;
    };

    $scope.itemClicked = function(item) {
        item.checked = ! item.checked;
    };

    $scope.filterBySelected = false;
    $rootScope.classForFilterBySelected = function() {
        return $scope.filterBySelected ? 'active' : '';
    };
    $rootScope.toggleFilterBySelected = function() {
        $scope.filterBySelected = ! $scope.filterBySelected;
    };

    $scope.itemChecked = function(item) {
        return item.checked ? 'checked' : 'unchecked';
    };

    $rootScope.goToCharts = function(product) {
        $rootScope.productForChart = product;
        $location.path('/main/chart');
    };

    $rootScope.openNameFilter = function() {
        var forms = document.querySelectorAll("form.search");
        for (i = 0; i < forms.length; i++) {
            forms[i].reset();
        }
        $rootScope.showSearchBar = true;
    };

    $rootScope.closeNameFilter = function() {
        $rootScope.showSearchBar = false;
        $rootScope.searchInput = null;
        $rootScope.searchResults = [];
    };

    $rootScope.hasSearchResults = function() {
        return $rootScope.searchResults.length;
    };

    $rootScope.showSearchBar = false;
    $rootScope.searchInput = null;
    $rootScope.searchResults = [ ];
    $rootScope.prepareSearchResults = function(newValue) {
        $rootScope.searchResults = [];

        if (newValue && newValue.length) {
            for (var i=0; (i<$rootScope.productNames.length && $rootScope.searchResults.length < 5); i++) {
                if ($rootScope.productNames[i].slice(0, newValue.length) == newValue) {
                    $rootScope.searchResults.push($rootScope.productNames[i]);
                }
            }
        }
    };

    $rootScope.setNameFilter = function(newNameFilter) {
        $rootScope.filterName = newNameFilter;
        $rootScope.resetProducts();
        $rootScope.closeNameFilter();
    };

}

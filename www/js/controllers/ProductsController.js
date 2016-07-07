angular.module('jobhop.controllers')
    .controller('ProductsController', ProductsController);

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

    $scope.isFutureDate = function() {
      return $rootScope.filterDate > new Date();
      console.log('$rootScope.filterDate', $rootScope.filterDate);
        var dayInWeek = $filter('date')($rootScope.filterDate, 'EEEE');
        return (dayInWeek == 'Saturday' || dayInWeek == 'Friday');
    };


    $scope.shareProduct = function(product) {
        $cordovaSocialSharing.share(
     'לעידכון מעניין על '+product.name+', אנא התקינו את אפליקצית פריסייל:  http://brighttech.co.il/other/prisale.html'
);
    };


    //Set which product info will be displayed in list
    $rootScope.setListDetails = function(listDetails) {
        $rootScope.listDetails = listDetails;
        $rootScope.closeDetailsPopup();
    };

    $rootScope.listDetails = 'price';
    $scope.hideProductsWithoutPrice = function(item) {
        return item.topQuality[$scope.userType].price || item.primeQuality[$scope.userType].price;
    };
    $scope.isSelected = function(item) {
        if ( ! $rootScope.filterBySelected) {
            return true;
        }

        return item.checked;
    };
    $scope.topQualityPrice = function(item) {
        return parseFloat(item.topQuality[$scope.userType].price) > 0 ? item.topQuality[$scope.userType].price.replace('*', '') +' ש"ח' : '--';
    };
    $scope.primeQualityPrice = function(item) {
        return parseFloat(item.primeQuality[$scope.userType].price) > 0 ? item.primeQuality[$scope.userType].price.replace('*', '') +' ש"ח' : '--';
    };
    $scope.topQualityAvgPrice = function(item) {
        return parseFloat(item.topQuality[$scope.userType].weeklyAvg) > 0 ? item.topQuality[$scope.userType].weeklyAvg.replace('*', '') +' ש"ח' : '--';
    };
    $scope.primeQualityAvgPrice = function(item) {
        return parseFloat(item.primeQuality[$scope.userType].weeklyAvg) > 0 ? item.primeQuality[$scope.userType].weeklyAvg.replace('*', '') +' ש"ח' : '--';
    };
    $scope.topQualityPercentChange = function(item) {
        return parseFloat(item.topQuality[$scope.userType].percentChange) > 0 ? item.topQuality[$scope.userType].percentChange.replace('*', '') +'%' : '--';
    };
    $scope.primeQualityPercentChange = function(item) {
        return parseFloat(item.primeQuality[$scope.userType].percentChange) > 0 ? item.primeQuality[$scope.userType].percentChange.replace('*', '') +'%' : '--';
    };


    $scope.topQualityPriceHasComment = function(item) {
        return item.topQuality[$scope.userType].price.indexOf('*', '') !== -1;
    };
    $scope.primeQualityPriceHasComment = function(item) {
        return item.primeQuality[$scope.userType].price.indexOf('*', '') !== -1;
    };
    $scope.topQualityAvgPriceHasComment = function(item) {
        return item.topQuality[$scope.userType].weeklyAvg.indexOf('*', '') !== -1;
    };
    $scope.primeQualityAvgPriceHasComment = function(item) {
        return item.primeQuality[$scope.userType].weeklyAvg.indexOf('*', '') !== -1;
    };
    $scope.topQualityPercentChangeHasComment = function(item) {
        return item.topQuality[$scope.userType].percentChange.indexOf('*', '') !== -1;
    };
    $scope.primeQualityPercentChangeHasComment = function(item) {
        return item.primeQuality[$scope.userType].percentChange.indexOf('*', '') !== -1;
    };



    //Load products
    $rootScope.items = [];
    $rootScope.filterName  = '';
    $rootScope.filterType  = '';
    $rootScope.filterOrder = 'ABC';
    $rootScope.filterSort  = undefined;
    $scope.no_more_data_to_load = false;
    $scope.xhr_in_progress = false;
    $rootScope.loadMore = function() {

        if ($scope.no_more_data_to_load) {
            return;
        }

        if ($scope.xhr_in_progress) {
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

        $scope.xhr_in_progress = true;
        var url = 'http://62.219.7.38/api/Public?pwd=ck32HGDESf13ekcs&name='+$rootScope.filterName+'&item_type='+$rootScope.filterType+'&order='+$rootScope.filterOrder.toString().replace('_desc', '')+'&date='+$filter('date')($rootScope.filterDate, 'yyyy-MM-dd')+'&page='+parseInt($rootScope.items.length/50)+'&desc='+($rootScope.filterOrder.indexOf('desc') == -1 ? '0' : '1');
        $http.get(url)
            .then(function(items) {
                if (items.data.length < 50) {
                    $scope.no_more_data_to_load = true;
                }

                for(var i =0; i<items.data.length; i++) {
                    items.data[i].percent = $rootScope.productsNotifications[items.data[i].id] ? $rootScope.productsNotifications[items.data[i].id].get('percent') : null;
                    if (window.localStorage[items.data[i].id] == '1'){
                      items.data[i].checked = true;
                    }
                    $rootScope.items.push(items.data[i]);
                }

                $scope.xhr_in_progress = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, function() {
                alert('לא ניתן לטעון נתונים עקב בעיית תקשורת');
                setInterval(function() {
                    if (navigator.app) {
                        navigator.app.exitApp();
                    }
                }, 500);
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
        $scope.itemClicked(item);
    };

    $scope.itemClicked = function(item) {
        item.checked = ! item.checked;
        window.localStorage[item.id] = Number(item.checked);
    };

    $rootScope.classForFilterBySelected = function() {
        return $rootScope.filterBySelected ? 'active' : '';
    };
    $rootScope.toggleFilterBySelected = function() {
        $rootScope.filterBySelected = ! $rootScope.filterBySelected;
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

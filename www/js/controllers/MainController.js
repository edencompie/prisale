angular.module('jobhop.controllers')
.controller('MainController', MainController);

MainController.$inject = ['$ionicLoading', '$window', '$location', '$ionicTabsDelegate', '$cordovaSocialSharing', '$rootScope', '$ionicPopup', '$filter', '$http'];

function MainController($ionicLoading, $window, $location, $ionicTabsDelegate, $cordovaSocialSharing, $rootScope, $ionicPopup, $filter, $http) {


    $rootScope.setUserType = function(userType) {
        $rootScope.showSearchBar = false;
        $ionicLoading.show({ template: 'טוען נתונים' });
        setTimeout($ionicLoading.hide, 600);

        if ($location.path() != '/main/products-wholesale') {
            $location.path('/main/products-wholesale');
        }

        $rootScope.userType = userType;
    };

    $rootScope.selectTabWithIndex = function(index) {
        $ionicTabsDelegate.select(index);
    }

    $rootScope.isItemActive = function(item) {
        return item == $location.path();
    };

    $rootScope.showDetailsPopup = function() {
        $rootScope.DetailsPopup = $ionicPopup.show({
            templateUrl: 'views/list/details-popup.html',
            cssClass: 'details',
            scope: $rootScope
        });
    }
    $rootScope.closeDetailsPopup = function() {
        $rootScope.DetailsPopup.close();
    }

    $rootScope.showPushNotificationPopup = function(item) {
        $rootScope.pushNotificationPercent = item.percent > 0 ? item.percent : 20; // Default 20%
        $rootScope.pushNotificationEnabled = Boolean(item.percent);
        $rootScope.itemTitleForPushNotificationPopup = item.name;
        $rootScope.itemForPushNotificationPopup = item;
        $rootScope.PushNotificationPopup = $ionicPopup.show({
            templateUrl: 'views/list/push-popup.html',
            cssClass: 'push-notification',
            scope: $rootScope
        });
    }
    $rootScope.closePushNotificationPopup = function() {
        $rootScope.PushNotificationPopup.close();
    }
    $rootScope.setPushNotificationPercent = function(item, isEnabled, percent) {

        if (item.percent) {
            if ($rootScope.productsNotifications[item.id]) {
                // Destroy existing
                $rootScope.productsNotifications[item.id].destroy();
            }
        }

        if (isEnabled) {
            var ProductNotify = Parse.Object.extend("product_notify");
            var productNotify = new ProductNotify();

            var install = new Parse.Object("_Installation");
            install.id = window.localStorage.getItem("instId");

            productNotify.set('productID', item.id);
            productNotify.set('InstallID', install);
            productNotify.set('percent', parseInt(percent));
            productNotify.save(null, function(object) {
                $rootScope.productsNotifications[item.id] = object;
            });
        }
        item.percent = isEnabled ? percent : null;

        $rootScope.closePushNotificationPopup();
    }

    // TODO
    var APP_NAME = 'jobhopapp';
    var APP_COUNTRY = 'il';
    var APP_ID = '1020643523';

    $rootScope.shareApp = function() {
        $cordovaSocialSharing.share(
            'מצורף קישור לאפליקציית פריסייל החדשה',
            false,
            false,
            'http://itunes.apple.com/' + APP_COUNTRY + '/app/' + APP_NAME + '/id' + APP_ID + '?mt=8'
        );
    };


    //Filter popup
    $rootScope.showFilterPopup = function() {
        $rootScope.typeFilter = $rootScope.filterType;
        $rootScope.orderFilter = $rootScope.filterOrder;
        $rootScope.FilterPopup = $ionicPopup.show({
            templateUrl: 'views/list/filter-popup.html',
            cssClass: 'list-filter',
            scope: $rootScope
        });
    };
    $rootScope.closeFilterPopup = function() {
        $rootScope.FilterPopup.close();
    };
    $rootScope.setFilters = function(order, type) {
        $rootScope.filterOrder = order;
        $rootScope.filterType = type;
        $rootScope.resetProducts();
        $rootScope.closeFilterPopup();
    };

    $rootScope.openSite = function() {
        console.log('openSite', $window);
        $window.open('http://www.israeli-market.gov.il', '_system');
    };
    $rootScope.setDate = function(date) {
        $rootScope.filterDate = date;
        $rootScope.resetProducts();
    };

    $rootScope.productNames = [];
    $rootScope.filterDate  = new Date();

    function loadMoreProducts() {
        var url = 'http://62.219.7.38/api/Public?pwd=ck32HGDESf13ekcs&name=&item_type=&order=&date='+$filter('date')($rootScope.filterDate, 'yyyy-MM-dd')+'&page='+parseInt($rootScope.productNames.length/50);
        $http.get(url)
            .then(function(items) {

                for(var i =0; i<items.data.length; i++) {
                    $rootScope.productNames.push(items.data[i].name);
                }

                if (items.data.length == 50) {
                    loadMoreProducts();
                }
            });
    }

    loadMoreProducts();

    $rootScope.$on('$stateChangeSuccess', function(a,b) {
        // Mark selected tab
        if (b.name == 'withTabs.productsWholesale') {
            if ($rootScope.userType == 'wholesale') {
                $ionicTabsDelegate.select(0);
            } else {
                $ionicTabsDelegate.select(1);
            }
        }

    });

};
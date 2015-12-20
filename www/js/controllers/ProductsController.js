angular.module('jobhop.controllers')
.controller('ProductsController', ProductsController);

ProductsController.$inject = ['$rootScope', '$http', '$cordovaSocialSharing', '$filter', '$ionicPopup', '$scope', '$ionicModal', 'JobHopAPI', '$cordovaGeolocation', '$ionicPlatform', '$ionicLoading'];

function ProductsController($rootScope, $http, $cordovaSocialSharing, $filter, $ionicPopup, $scope, $ionicModal, JobHopAPI, $cordovaGeolocation, $ionicPlatform, $ionicLoading) {
console.log('ProductsController');

    //Toggle 1 or 2 items per row
    $rootScope.viewClassName = 'two-per-row';
    $rootScope.changeView = function() {
        $rootScope.viewClassName = $rootScope.viewClassName == 'two-per-row' ? '' : 'two-per-row';
        return false;
    };


    var productsNotifications = {};



    //Details popup
    var DetailsPopup;
    $rootScope.showDetailsPopup = function(item) {
        DetailsPopup = $ionicPopup.show({
            templateUrl: 'views/list/details-popup.html',
            cssClass: 'details',
            scope: $rootScope
        });
    }
    $rootScope.closeDetailsPopup = function() {
        DetailsPopup.close();
    }



    //Push notification popup
    var PushNotificationPopup;
    $rootScope.showPushNotificationPopup = function(item) {
        $rootScope.pushNotificationPercent = item.percent;
        $rootScope.pushNotificationEnabled = Boolean(item.percent);
        $rootScope.itemTitleForPushNotificationPopup = item.name;
        $rootScope.itemForPushNotificationPopup = item;
        PushNotificationPopup = $ionicPopup.show({
            templateUrl: 'views/list/push-popup.html',
            cssClass: 'push-notification',
            scope: $rootScope
        });
    }
    $rootScope.closePushNotificationPopup = function() {
        PushNotificationPopup.close();
    }
    $rootScope.setPushNotificationPercent = function(item, isEnabled, percent) {

        if (item.percent) {
            if (productsNotifications[item.id]) {
                // Destroy existing
                productsNotifications[item.id].destroy();
            }
        }

        if (isEnabled) {
            var ProductNotify = Parse.Object.extend("product_notify");
            var productNotify = new ProductNotify();
            productNotify.set('productID', item.id);
            productNotify.set('percent', parseInt(percent));
            productNotify.save(null, function(object) {
                productsNotifications[item.id] = object;
            });
        }
        item.percent = isEnabled ? percent : null;

        $rootScope.closePushNotificationPopup();
    }


    //Filter popup
    var FilterPopup;
    $rootScope.showFilterPopup = function() {
        $rootScope.typeFilter = $rootScope.filterType;
        $rootScope.orderFilter = $rootScope.filterOrder;
        FilterPopup = $ionicPopup.show({
            templateUrl: 'views/list/filter-popup.html',
            cssClass: 'list-filter',
            scope: $rootScope
        });
    };
    $rootScope.closeFilterPopup = function() {
        FilterPopup.close();
    };
    $rootScope.setFilters = function(order, type) {
        console.log(order, type);
        $scope.items = [];
        $rootScope.filterOrder = order;
        $rootScope.filterType = type;
        FilterPopup.close();
    };



    //Date popup
    var DatePopup;
    $rootScope.showDatePopup = function() {
        $rootScope.dateFilter = new Date($filter('date')($rootScope.filterDate, 'yyyy-MM-dd'));
        DatePopup = $ionicPopup.show({
            templateUrl: 'views/list/date-popup.html',
            cssClass: 'date-filter',
            scope: $rootScope
        });
    };
    $rootScope.closeDatePopup = function() {
        DatePopup.close();
    };
    $rootScope.setDate = function(date) {
        console.log('--date--', date);
        $scope.items = [];
        $rootScope.filterDate = $filter('date')(date, 'yyyy-MM-dd');
        DatePopup.close();
    };




    $scope.shareProduct = function(product) {
        console.log('share');
        $cordovaSocialSharing.share(
            'פריסייל - '+product.name);
    }


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
    $rootScope.filterPage  = undefined;
    var no_more_data_to_load = false;
    $rootScope.loadMore = function() {
        console.log('loadMore');

        /*
         $rootScope.filterName
         $rootScope.filterDate
         $rootScope.filterType
         $rootScope.filterOrder
         $rootScope.filterSort
         $rootScope.filterPage
         */

       var url = 'http://62.219.7.38/api/Public?pwd=ck32HGDESf13ekcs&name=&item_type=&date=&page=';
        /*$http.get(url)
            .then(function(items) {
                if (items.data.length < 50) {
                    no_more_data_to_load = true;
                } else {

                    for(var i =0; i<items.data.length; i++) {
                        $scope.items.push(items.data[i]);
                    }
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
                console.log('success item3s', items.data);
            });*/
console.log('using parse1');
        var ProductNotify = Parse.Object.extend("product_notify");
        var query = new Parse.Query(ProductNotify);
        //query.equalTo('percent', 100);
        query.find({
            success:function(list) {
                for (var i=0; i<list.length; i++) {
                    productsNotifications[list[i].get('productID')] = list[i];
                }


                for(var i =0; i< 50; i++) {
                    $scope.items.push({
                        "name": "tomato",
                        "id": 12,
                        "percent": productsNotifications[12] ? productsNotifications[12].get('percent') : null,//TODO
                        "topQuality": {
                            "wholesale": {
                                "price": 4.3,
                                "percentChange": 20,
                                "weeklyAvg": 5
                            },
                            "agriculture": {
                                "price": 2.3,
                                "percentChange": 20,
                                "weeklyAvg": 5
                            },
                        },
                        "primeQuality": {
                            "wholesale": {
                                "price": 4.2,
                                "percentChange": 20,
                                "weeklyAvg": 5
                            },
                            "agriculture": {
                                "price": 2.2,
                                "percentChange": 20,
                                "weeklyAvg": 5
                            }
                        }
                    });
                }
            }
        });

    };

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
    $scope.moreDataCanBeLoaded = function() {
        return ! no_more_data_to_load;
    }


    $scope.showNameFilter = function() {

    }

    //Check products
    $scope.itemClicked = function(item) {
        // TODO
        console.log('item clicked:', item);
    };

};

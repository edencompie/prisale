angular.module('jobhop.controllers')
.controller('JobsFeedController', JobsFeedController);

JobsFeedController.$inject = ['$rootScope', '$http', '$cordovaSocialSharing', '$filter', '$ionicPopup', '$scope', '$ionicModal', 'JobHopAPI', '$cordovaGeolocation', '$ionicPlatform', '$ionicLoading'];

function JobsFeedController($rootScope, $http, $cordovaSocialSharing, $filter, $ionicPopup, $scope, $ionicModal, JobHopAPI, $cordovaGeolocation, $ionicPlatform, $ionicLoading) {
    // TODO
    var installID = 'myinstallid';
    //Toggle 1 or 2 items per row
    $rootScope.viewClassName = 'two-per-row';
    $rootScope.changeView = function() {
        console.log('changeView');
        $rootScope.viewClassName = $rootScope.viewClassName == 'two-per-row' ? '' : 'two-per-row';
        return false;
    };



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
        //todo
        $rootScope.pushNotificationPercent = 30;
        $rootScope.itemTitleForPushNotificationPopup = item.name;
        PushNotificationPopup = $ionicPopup.show({
            templateUrl: 'views/list/push-popup.html',
            cssClass: 'push-notification',
            scope: $rootScope
        });
    }
    $rootScope.closePushNotificationPopup = function() {
        PushNotificationPopup.close();
    }
    $rootScope.setPushNotificationPercent = function(isEnabled, percent) {
        console.log(isEnabled, percent);
        $rootScope.closePushNotificationPopup();
    }


    //Filter popup
    var FilterPopup;
    $rootScope.showFilterPopup = function() {
        $rootScope.typeFilter = $rootScope.filterType;
        console.log('$rootScope.filterType', $rootScope.filterType);
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
        $http({
            url: url,
            method: 'GET',

        })
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
            });

//
        for(var i =0; i< 50; i++) {

            $scope.items.push({
                "name": "tomato",
                "id": 122222,
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



    };
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
    $scope.moreDataCanBeLoaded = function() {
        return ! no_more_data_to_load;
    }



    //Check products
    $scope.itemClicked = function(item) {
        // TODO
        console.log('item clicked:', item);
    };

};

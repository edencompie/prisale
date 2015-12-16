angular.module('jobhop.controllers')
.controller('JobsFeedController', JobsFeedController);

JobsFeedController.$inject = ['$rootScope', '$http', '$ionicPopup', '$scope', '$ionicModal', 'JobHopAPI', '$cordovaGeolocation', '$ionicPlatform', '$ionicLoading'];

function JobsFeedController($rootScope, $http, $ionicPopup, $scope, $ionicModal, JobHopAPI, $cordovaGeolocation, $ionicPlatform, $ionicLoading) {

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
        $rootScope.itemTitleForPushNotificationPopup = item.name;
        PushNotificationPopup = $ionicPopup.show({
            templateUrl: 'views/list/push-popup.html',
            cssClass: 'push-notification',
            scope: $rootScope,
            buttons: [
                {
                    text: 'שמור',
                    type: 'button-positive',
                    onTap: function (e) {

                    }
                }
            ]
        });
    }
    $rootScope.closePushNotificationPopup = function() {
        PushNotificationPopup.close();
    }



    //Filter popup
    var FilterPopup;
    $rootScope.showFilterPopup = function() {
        FilterPopup = $ionicPopup.show({
            templateUrl: 'views/list/filter-popup.html',
            cssClass: 'list-filter',
            scope: $rootScope,
            buttons: [
                {
                    text: 'שמור',
                    type: 'button-positive',
                    onTap: function(e) {

                    }
                }
            ]
        });
    };
    $rootScope.closeFilterPopup = function() {
        FilterPopup.close();
    };



    //Set which product info will be displayed in list
    $rootScope.setListDetails = function(listDetails) {
        $rootScope.listDetails = listDetails;
        $rootScope.closeDetailsPopup();
    };
    $rootScope.userType = 'agriculture';
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
    $scope.items = [];
    // TODO remove a
    var a = 0;
    $rootScope.loadMore = function() {
        a++;
        console.log('loadMore');


        // TODO
        //$http.get('http://62.219.7.38/api/Public/products?pwd=ck32HGDESf13ekcs&name=&item_type=&date=&page=&order=')
        //    .success(function(items) {
        //    console.log('items', items);




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



            $scope.$broadcast('scroll.infiniteScrollComplete');
        //});

    };
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
    $scope.moreDataCanBeLoaded = function() {
        // TODO
        return a < 4;
    }



    //Check products
    $scope.itemClicked = function(item) {
        // TODO
        console.log('item clicked:', item);
    };

};

angular.module('jobhop.controllers')
.controller('JobsFeedController', JobsFeedController);

JobsFeedController.$inject = ['$rootScope', '$http', '$ionicPopup', '$scope', '$ionicModal', 'JobHopAPI', '$cordovaGeolocation', '$ionicPlatform', '$ionicLoading'];

function JobsFeedController($rootScope, $http, $ionicPopup, $scope, $ionicModal, JobHopAPI, $cordovaGeolocation, $ionicPlatform, $ionicLoading) {

    $rootScope.viewClassName = 'two-per-row';
    $rootScope.changeView = function() {
        console.log('changeView');
        $rootScope.viewClassName = $rootScope.viewClassName == 'two-per-row' ? '' : 'two-per-row';
        return false;
    };

    var PushNotificationPopup, FilterPopup, DetailsPopup;

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

    $rootScope.setListDetails = function(listDetails) {
        $rootScope.listDetails = listDetails;
        $rootScope.closeDetailsPopup();
    };


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

    $rootScope.userType = 'agriculture';
    $rootScope.listDetails = 'price';
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



    $scope.bla = function(item) {
        // TODO
        console.log('item clicked:', item)
    };

    $rootScope.setUserType = function(userType) {
        $rootScope.userType = userType;
    };


    $scope.moreDataCanBeLoaded = function() {
        // TODO
        return a < 4;
    };


    $scope.items = [];

    /*    position = {};

    $scope.setCurrentPosition = function() {
        return $ionicPlatform.ready(function() {
            return $cordovaGeolocation.getCurrentPosition({
                timeout: 10000,
                enableHighAccuracy: true
            }).then(function(positionData) {
                if(!angular.isUndefined(positionData) && !angular.isUndefined(positionData.coords) && !angular.isUndefined(positionData.coords.latitude) && !angular.isUndefined(positionData.coords.longitude)) {
                    position.geo_point_lat = positionData.coords.latitude;
                    position.geo_point_lon = positionData.coords.longitude;
                } else {
                    position = {};
                }
            }, function(err) {
                position = {};
            });
        });
    };

    $scope.init = function(refresh) {
        if(angular.isUndefined(refresh)) {
            refresh = false;
        }
        $scope.jobs = [];
        $scope.loaded = false;
        $scope.error = false;
        $scope.nextCurs = '';
        $scope.noMoreJobsAvailable = false;

        position = {};

        if(!refresh) {
            $scope.getFeed();
        }
        $scope.setCurrentPosition().then(function() {
            if(refresh) {
                $scope.getFeed(false, true);
            } else {
                if(!angular.isUndefined(position.geo_point_lat) && !angular.isUndefined(position.geo_point_lon)) {
                    $scope.getFeed();
                }
            }
        }, function() {
            if(refresh) {
                $scope.getFeed(false, true);
            }
        });
    };

    $scope.refreshFeed = function() {
        $scope.init(true);
    };

    $scope.getFeed = function(getMore, refresh) {
        if(angular.isUndefined(getMore)) {
            getMore = false;
        } else if(angular.isUndefined(refresh)) {
          refresh = false;
        }
        var getFeed;
        if(getMore) {
            getFeed = JobHopAPI.getFeed($scope.nextCurs, position);
        } else {
            if(refresh) {
                $scope.loaded = false;
                $scope.noMoreJobsAvailable = false;
            } else {
              $ionicLoading.show();
            }
            getFeed = JobHopAPI.getFeed(false, position);
        }
        getFeed.then(function(feed) {
            $scope.nextCurs = feed.nextCurs;
            if(angular.isUndefined($scope.nextCurs)) {
                $scope.noMoreJobsAvailable = true;
            }
            if(getMore) {
                $scope.jobs = $scope.jobs.concat(feed.jobs);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            } else {
                $scope.jobs = feed.jobs;
                $scope.loaded = true;
                if(!refresh) {
                  $ionicLoading.hide();
                }
                if(refresh) {
                  $scope.$broadcast('scroll.refreshComplete');
                }
            }
        }, function(error) {
            $scope.error = true;
            if(!getMore && !refresh) {
                $ionicLoading.hide();
            } else {
                if(refresh) {
                  $scope.$broadcast('scroll.refreshComplete');
                } else {
                  $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            }
        });
    };

    $scope.init();*/
};

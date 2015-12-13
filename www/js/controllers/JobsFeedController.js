angular.module('jobhop.controllers')
.controller('JobsFeedController', JobsFeedController);

JobsFeedController.$inject = ['$rootScope', '$ionicPopup', '$scope', '$ionicModal', 'JobHopAPI', '$cordovaGeolocation', '$ionicPlatform', '$ionicLoading'];

function JobsFeedController($rootScope, $ionicPopup, $scope, $ionicModal, JobHopAPI, $cordovaGeolocation, $ionicPlatform, $ionicLoading) {
console.log('$ionicPopup', $ionicPopup);
    $rootScope.viewClassName = 'two-per-row';

    $rootScope.changeView = function() {
        console.log('changeView');
        $rootScope.viewClassName = $rootScope.viewClassName == 'two-per-row' ? '' : 'two-per-row';
        return false;
    };



    $rootScope.showPopup = function() {
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            templateUrl: 'views/list/push-popup.html',
            cssClass: 'push-notification',
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

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    };




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

angular.module('jobhop.controllers')
.controller('JobsSearchController', JobsSearchController);

JobsSearchController.$inject = ['$scope', 'JobHopAPI', '$cordovaGeolocation', '$ionicPlatform', '$state', '$timeout'];

function JobsSearchController($scope, JobHopAPI, $cordovaGeolocation, $ionicPlatform, $state, $timeout) {
    var position = {};

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

    $scope.init = function() {
        position = {};

        $scope.jobs = [];
        $scope.loaded = false;
        $scope.error = false;

        $scope.setCurrentPosition().then(function() {
            $scope.getFeed();
        }, function() {
            $scope.getFeed();
        });
    };

    $scope.isSearching = false;

    $scope.searchData = {
        employer_title: '',
        position: '',
        address: '',
        open_query: ''
    };

    $scope.$watch('searchData', function(searchData) {
        $scope.error = false;
        var isEmpty = true;
        angular.forEach(searchData, function(value, key) {
            if(value) {
                isEmpty = false;
            }
        });
        if(isEmpty) {
            $scope.loaded = false;
            $scope.isSearching = false;
        } else {
            if(!angular.isUndefined($scope.typingTimeout)) {
                $timeout.cancel($scope.typingTimeout);
            }
            $scope.typingTimeout = $timeout(function() {
                $scope.jobs = [];
                $scope.loaded = false;
                $scope.noMoreJobsAvailable = false;
                $scope.isSearching = true;
                $scope.init();
            }, 500);
        }
    }, true);

    $scope.getFeed = function(getMore) {
        if(angular.isUndefined(getMore)) {
            getMore = false;
        }
        if(!angular.isUndefined(position.geo_point_lat) && !angular.isUndefined(position.geo_point_lon)) {
            angular.extend($scope.searchData, position);
        } else {
            delete $scope.searchData.geo_point_lat;
            delete $scope.searchData.geo_point_lon;
        }
        var getFeed;
        if(getMore) {
            getFeed = JobHopAPI.getFeed($scope.nextCurs, $scope.searchData);
        } else {
            getFeed = JobHopAPI.getFeed(false, $scope.searchData);
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
            }
        }, function(error) {
            $scope.error = true;
            if(getMore) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        });
    };

    $scope.goToJob = function(jobId, event) {
        event.preventDefault();
        $state.go('employees.jobsFeed');
        $timeout(function() {
            $state.go('employees.job', { jobId: jobId });
        }, 0);
    };
};

angular.module('jobhop.controllers')
.controller('JobsUserController', JobsUserController);

JobsUserController.$inject = ['$rootScope', '$scope', 'JobHopAPI', '$cordovaGeolocation', '$ionicPlatform', '$ionicLoading', '$state', '$timeout'];

function JobsUserController($rootScope, $scope, JobHopAPI, $cordovaGeolocation, $ionicPlatform, $ionicLoading, $state, $timeout) {
    $scope.position = {};

    $scope.setCurrentPosition = function() {
        return $ionicPlatform.ready(function() {
            return $cordovaGeolocation.getCurrentPosition({
                timeout: 10000,
                enableHighAccuracy: true
            }).then(function(positionData) {
                if(!angular.isUndefined(positionData) && !angular.isUndefined(positionData.coords) && !angular.isUndefined(positionData.coords.latitude) && !angular.isUndefined(positionData.coords.longitude)) {
                    $scope.position.geo_point_lat = positionData.coords.latitude;
                    $scope.position.geo_point_lon = positionData.coords.longitude;
                } else {
                    $scope.position = {};
                }
            }, function(err) {
                $scope.position = {};
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

        $scope.position = {};

        if($scope.user.logged) {
            if(!refresh) {
                $scope.getMyJobs();
            }
            $scope.setCurrentPosition().then(function() {
                if(refresh) {
                    $scope.getMyJobs(false, true);
                } else {
                    if(!angular.isUndefined($scope.position.geo_point_lat) && !angular.isUndefined($scope.position.geo_point_lon)) {
                        $scope.getMyJobs();
                    }
                }
            }, function() {
                if(refresh) {
                    $scope.getMyJobs(false, true);
                }
            });
        }
    };

    $scope.getMyJobs = function(getMore, refresh) {
        if(angular.isUndefined(getMore)) {
            getMore = false;
        } else if(angular.isUndefined(refresh)) {
          refresh = false;
        }
        var getFeed;
        if(getMore) {
            getFeed = JobHopAPI.getFeed($scope.nextCurs, $scope.position, true);
        } else {
            if(refresh) {
                $scope.loaded = false;
                $scope.noMoreJobsAvailable = false;
            } else {
              $ionicLoading.show();
            }
            getFeed = JobHopAPI.getFeed(false, $scope.position, true);
        }
        getFeed.then(function(feed) {
            var jobs = [];
            $scope.nextCurs = feed.nextCurs;
            if(angular.isUndefined($scope.nextCurs)) {
                $scope.noMoreJobsAvailable = true;
            }
            angular.forEach(feed.jobs, function(job, index) {
                if(!angular.isUndefined(job.employment_status) && (job.employment_status != 'CANCELED' && job.employment_status != 'UNLIKED')) {
                    jobs.push(job);
                }
            });
            if(getMore) {
                $scope.jobs = $scope.jobs.concat(jobs);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            } else {
                $scope.jobs = jobs;
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

    $scope.goToJob = function(jobId, event) {
        event.preventDefault();
        $state.go('employees.jobsFeed');
        $timeout(function() {
            $state.go('employees.job', { jobId: jobId });
        }, 0);
    };

    $scope.refreshMyJobs = function() {
        $scope.init(true);
    };

    $scope.loginAndRefresh = function() {
        $scope.login().then(function(results) {
            if(results) {
                $scope.init();
            }
        });
    };

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if(toState.name == 'employees.jobsUser') {
            $scope.init();
        }
    });

    $scope.init();
};

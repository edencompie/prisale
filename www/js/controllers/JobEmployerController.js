angular.module('jobhop.controllers')
.controller('JobEmployerController', JobEmployerController);

JobEmployerController.$inject = ['$scope', 'JobHopAPI', '$cordovaToast', '$ionicLoading', '$stateParams'];

function JobEmployerController($scope, JobHopAPI, $cordovaToast, $ionicLoading, $stateParams) {
    $scope.employer = false;
    $scope.employment = false;
    $scope.loaded = false;
    $scope.error = false;

    $scope.init = function() {
        $scope.getEmployer().then(function() {
            if($stateParams.employmentId != '') {
                $scope.getEmployment();
            }
        });
    };

    $scope.getEmployer = function() {
        $ionicLoading.show();
        return JobHopAPI.getEmployer($stateParams.employerId).then(function(employerData) {
            $scope.employer = employerData;
            if(!angular.isUndefined($scope.employer.geo_point_lat) && !angular.isUndefined($scope.employer.geo_point_lon)) {
                $scope.map = {
                    center: {
                        latitude: $scope.employer.geo_point_lat,
                        longitude: $scope.employer.geo_point_lon
                    },
                    zoom: 12
                };

                $scope.marker = {
                    id: 0,
                    cords: {
                        latitude: $scope.employer.geo_point_lat,
                        longitude: $scope.employer.geo_point_lon
                    },
                    options: {
                        labelContent: $scope.employer.title
                    }
                };
            }
            $scope.loaded = true;
            $ionicLoading.hide();
        }, function(error) {
            $scope.error = true;
            $ionicLoading.hide();
        });
    };

    $scope.getEmployment = function() {
        $ionicLoading.show();
        return JobHopAPI.getEmployment($stateParams.employmentId).then(function(employmentData) {
            $scope.employment = employmentData;
            $scope.loaded = true;
            $ionicLoading.hide();
        }, function(error) {
            $scope.error = true;
            $ionicLoading.hide();
        });
    };

    $scope.openNavigator = function() {
        $cordovaToast.showShortBottom('פותח אפליקציית ניווט...');
        launchnavigator.navigate(
            $scope.employer.address + ', ישראל',
            '',
            function() {

            },
            function(error) {
                showPopup('איראה שגיאה', 'אירעה שגיאה במהלך פתיחת אפליקציית הניווט, אנא נסה שנית');
            }
        );
    };

    $scope.init();
};

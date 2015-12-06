angular.module('jobhop.controllers')
.controller('JobController', JobController);

JobController.$inject = ['$scope', 'JobHopAPI', '$cordovaSocialSharing', '$cordovaDialogs', '$cordovaToast', '$ionicLoading', '$stateParams', '$state'];

function JobController($scope, JobHopAPI, $cordovaSocialSharing, $cordovaDialogs, $cordovaToast, $ionicLoading, $stateParams, $state) {
    $scope.employer = false;
    $scope.job = false;
    $scope.employee = false;

    $scope.init = function() {
        $scope.loaded = false;
        $scope.error = false;

        return $scope.getJob();
    };

    $scope.getJob = function() {
        $ionicLoading.show();
        return JobHopAPI.getJob($stateParams.jobId).then(function(jobData) {
            $scope.employer = jobData.employer;
            $scope.job = jobData.job;
            if(!angular.isUndefined(jobData.employee.status)) {
                $scope.employee = jobData.employee;
            } else {
                $scope.employee = {};
            }
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

    var showPopup = function(title, message) {
        return $cordovaDialogs.alert(message, title, 'המשך');
    };

    var showConfirmPopup = function(title, message, buttons) {
        if(angular.isUndefined(buttons)) {
            buttons = ['אישור', 'ביטול'];
        }
        return $cordovaDialogs.confirm(message, title, buttons);
    };

    $scope.applyJob = function() {
        if($scope.user.logged) {
            $ionicLoading.show();
            JobHopAPI.applyJob($scope.job.id).then(function(employeeData) {
                $scope.employee = {
                    id: employeeData.employment_urlsafe_key,
                    status: employeeData.status,
                };
                $ionicLoading.hide();
                $cordovaToast.showShortBottom('הבקשה הוגשה בהצלחה');
            }, function() {
                $ionicLoading.hide();
                showPopup('איראה שגיאה', 'אירעה שגיאה במהלך הגשת מועמדות למשרה, אנא נסה שנית');
            });
        } else {
            $scope.login('apply').then(function(results) {
                if(results) {
                    $scope.init().then(function() {
                        if(angular.isUndefined($scope.employee.status) || ($scope.employee.status != 'APPLICANT' && $scope.employee.status != 'AWAITING_FINAL_APPROVAL' && $scope.employee.status != 'EMPLOYEE')) {
                            $scope.applyJob();
                        }
                    });
                }
            });
        }
    };

    $scope.finalApplyJob = function() {
        $ionicLoading.show();
        JobHopAPI.finalApplyJob($scope.employee.id).then(function(employeeData) {
            $scope.employee = {
                id: employeeData.employment_urlsafe_key,
                status: employeeData.status,
            };
            $ionicLoading.hide();
            $cordovaToast.showShortBottom('אישרת התחלת עבודה במשרה');
        }, function() {
            $ionicLoading.hide();
            showPopup('איראה שגיאה', 'אירעה שגיאה במהלך אישור התחלת עבודה, אנא נסה שנית');
        });
    };

    $scope.resignFromJob = function() {
        showConfirmPopup('התפטרות', 'האם אתה בטוח שאתה רוצה להתפטר ממשרה זו?').then(function(results) {
            if(results == 1) {
                $ionicLoading.show();
                JobHopAPI.resignFromJob($scope.employee.id).then(function(employeeData) {
                    $scope.employee = {
                        id: employeeData.employment_urlsafe_key,
                        status: employeeData.status,
                    };
                    $ionicLoading.hide();
                    $cordovaToast.showShortBottom('התפטרת מהמשרה');
                }, function() {
                    $ionicLoading.hide();
                    showPopup('איראה שגיאה', 'אירעה שגיאה במהלך התפטרות ממשרה, אנא נסה שנית');
                });
            }
        });
    };

    $scope.cancelApplicationJob = function() {
        showConfirmPopup('ביטול מועמדות למשרה', 'האם אתה בטוח שאתה רוצה לבטל מועמדות למשרה?').then(function(results) {
            if(results == 1) {
                $ionicLoading.show();
                JobHopAPI.cancelApplicationJob($scope.employee.id).then(function(employeeData) {
                    $scope.employee = {
                        id: employeeData.employment_urlsafe_key,
                        status: employeeData.status,
                    };
                    $ionicLoading.hide();
                    $cordovaToast.showShortBottom('הבקשה בוטלה');
                }, function() {
                    $ionicLoading.hide();
                    showPopup('איראה שגיאה', 'אירעה שגיאה במהלך ביטול מועמדות למשרה, אנא נסה שנית');
                });
            }
        });
    };

    $scope.likeButtonClick = function() {
        if($scope.user.logged) {
            if(angular.isUndefined($scope.employee.status) || $scope.employee.status == 'UNLIKED')  {
                $scope.likeJob();
            } else {
                $scope.dislikeJob();
            }
        } else {
            $scope.login('like').then(function(results) {
                if(results) {
                    $scope.init().then(function() {
                        if(angular.isUndefined($scope.employee.status) || $scope.employee.status == 'UNLIKED')  {
                            $scope.likeJob();
                        }
                    });
                }
            });
        }
    };

    $scope.likeJob = function() {
        $ionicLoading.show();
        JobHopAPI.likeJob($scope.job.id).then(function(employeeData) {
            $scope.employee.status = "LIKED";
            $ionicLoading.hide();
            $cordovaToast.showShortBottom('הוספת משרה למשרות שלי');
        }, function() {
            $ionicLoading.hide();
            showPopup('איראה שגיאה', 'אירעה שגיאה במהלך הוספת המשרה למשרות שלי, אנא נסה שנית');
        });
    };

    $scope.dislikeJob = function() {
        $ionicLoading.show();
        JobHopAPI.dislikeJob($scope.job.id).then(function(employeeData) {
            $scope.employee.status = "UNLIKED";
            $ionicLoading.hide();
            $cordovaToast.showShortBottom('הסרת משרה מהמשרות שלי');
        }, function() {
            showPopup('איראה שגיאה', 'אירעה שגיאה במהלך מחיקת המשרה מהמשרות שלי, אנא נסה שנית');
        });
    };

    $scope.shareJob = function() {
        $cordovaSocialSharing.share(
            'היי! דרושים ' + $scope.job.position + ' ל- ' + $scope.employer.title + '. לחץ כאן כדי להגיש מועמדות',
            false,
            false,
            'http://www.jobhop.co.il/jobs/' + $scope.job.id
        );
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

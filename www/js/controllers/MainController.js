angular.module('jobhop.controllers')
.controller('MainController', MainController);

MainController.$inject = ['$location', '$scope', 'JobHopAPI', '$ionicModal', '$ionicLoading', '$state', '$cordovaEmailComposer', '$cordovaDialogs', '$cordovaToast', '$cordovaSocialSharing', '$cordovaInAppBrowser', '$cordovaFacebook', '$localStorage', '$stateParams', '$timeout', '$cordovaCapture'];

function MainController($location, $scope, JobHopAPI, $ionicModal, $ionicLoading, $state, $cordovaEmailComposer, $cordovaDialogs, $cordovaToast, $cordovaSocialSharing, $cordovaInAppBrowser, $cordovaFacebook, $localStorage, $stateParams, $timeout, $cordovaCapture) {
    console.log('MainController');


    $scope.isTabActive = function(item) {
        console.log('-------------isTabActive');
        return $location.path().indexOf(item) > -1;
    };

    $scope.isItemActive = function(item) {
        //console.log('isItemActive');
        return $location.path().indexOf(item) > -1;
    };

    /*$scope.changeView = function() {
        console.log('11$scope.viewMode', $scope.viewMode);
        $scope.viewMode = !$scope.viewMode;
    };*/
    /*$localStorage.user = $localStorage.user || {
        profile: {},
        baseMessage: {},
        logged: false
    };

    $rootScope.user = $localStorage.user;

    $rootScope.$watch(function() {
        return $localStorage.user;
    }, function(user) {
        $rootScope.user = user;
    }, true);
*/
    /*
    $ionicModal.fromTemplateUrl('views/employees/notifications-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.notificationsModal = modal;
    });

    $scope.openNotifications = function() {
        $scope.notificationsModal.show();
    };

    $scope.closeNotifications = function() {
        $scope.notificationsModal.hide();
    };
    */

    /*var loginData = {
        identifier: '',
        secret: ''
    };

    var showPopup = function(title, template) {
        return $cordovaDialogs.alert(message, title, 'המשך');
    };*/

    /*$scope.uploadProfileVideo = function() {
        if(!$scope.isUploadingVideo) {
            $scope.uploadPercent = 0;
            var firstProgressEvent = true;
            $ionicLoading.show();
            $cordovaCapture.captureVideo({
                duration: 30
            }).then(function(videoData) {
                JobHopAPI.uploadVideo(videoData[0]).then(function(videoUri) {
                    JobHopAPI.updateProfileVideo(videoUri).then(function() {
                        $scope.isUploadingVideo = false;
                        $cordovaToast.showShortBottom('הסרטון הועלה בהצלחה');
                    }, function() {
                        $scope.isUploadingVideo = false;
                        showPopup('איראה שגיאה', 'אירעה שגיאה במהלך העלאת הסרטון, אנא נסה שנית');
                    });
                }, function(error) {
                    showPopup('איראה שגיאה', 'אירעה שגיאה במהלך העלאת הסרטון, אנא נסה שנית');
                    $ionicLoading.hide();
                }, function(progress) {
                    if(firstProgressEvent) {
                        firstProgressEvent = false;
                        $scope.isUploadingVideo = true;
                        $ionicLoading.hide();
                    }
                    $scope.videoUploadingPercent = (progress.loaded / progress.total) * 100;
                });
            }, function(error) {
                $ionicLoading.hide();
            });
        } else {
            showPopup('מגבלת העלאת סרטונים', 'הינך מעלה ברקע סרטון. אנא המתן שסרטון זה יעלה לגמרי ואז תוכל להעלות סרטון נוסף.');
        }
    };*/

    /*$scope.login = function(action) {
        if(angular.isUndefined(action) || (action != 'apply' && action != 'like')) {
            action = false;
        }
        JobHopAPI.logout();
        return $cordovaFacebook.login(['user_friends', 'email', 'user_birthday']).then(function(results) {
            $ionicLoading.show();
            loginData.identifier = results.authResponse.userID;
            loginData.secret = results.authResponse.accessToken;
            $cordovaToast.showShortBottom('מתחבר...');
            return JobHopAPI.login('FACEBOOK', loginData).then(function(isAlreadyRegistered) {
                $ionicLoading.hide();
                if(isAlreadyRegistered) {
                    $cordovaToast.showShortBottom('ההתחברות בוצעה בהצלחה');
                    return true;
                } else {
                    if(!angular.isUndefined($stateParams.jobId) && $stateParams.jobId != '' && action) {
                        $state.go('employees.register', {
                            jobId: $stateParams.jobId,
                            action: action
                        });
                    } else {
                        $state.go('employees.register');
                    }
                    return false;
                }
            });
        }, function(error) {
            $ionicLoading.hide();
            console.log(error);
            return error;
        });
    };

    $scope.logout = function() {
        $cordovaDialogs.confirm(
            'האם אתה בטוח שאתה רוצה להתנתק?',
            'התנתקות',
            [
                'אישור',
                'יציאה'
            ]
        ).then(function(results) {
            if(results) {
                $cordovaToast.showShortBottom('ההתנתקות בוצעה בהצלחה');
                JobHopAPI.logout().then(function() {
                    $state.go('employees.jobsFeed');
                }, function() {
                    $state.go('employees.jobsFeed');
                });
            }
        });
    };

    $rootScope.android = false;

    if(ionic.Platform.isAndroid()) {
        $rootScope.android = true;
    } else {
        $rootScope.android = false;
    }
*/
    /* IOS APP_STORE CONFIG */

   /* var APP_NAME = 'jobhopapp';
    var APP_COUNTRY = 'il';
    var APP_ID = '1020643523';

    var CEO_EMAIL_ADDRESS = 'raz@jobhop.co.il';

    $scope.shareApp = function() {
        $cordovaSocialSharing.share(
            'היי! מצאתי אפליקציה ממש טובה לחיפוש עבודות... ממליץ לך להוריד:',
            false,
            false,
            'http://itunes.apple.com/' + APP_COUNTRY + '/app/' + APP_NAME + '/id' + APP_ID + '?mt=8'
        );
    };

    $scope.rateApp = function() {
        $cordovaInAppBrowser.open('itms-apps://itunes.apple.com/app/' + APP_ID, '_system');
    };

    $scope.mailToCEO = function() {
        $cordovaEmailComposer.isAvailable().then(function() {
            $cordovaEmailComposer.open({
                to: CEO_EMAIL_ADDRESS,
                subject: '',
                body: '',
                isHtml: false
            });
        }, function() {
            showPopup('מכשיר לא תומך', 'מכשיר הפלאפון שלך לא תומך בשליחת אימייל');
        });
    };

    $scope.goToProfile = function() {
        $state.go('employees.profile');
    };

    $rootScope.$on('$stateChangeSuccess', function(event, current, previous) {
        $scope.currentState = current;

        if(ionic.Platform.isAndroid() != $rootScope.android) {
            $rootScope.android = !$scope.android;
        }
    });*/
};

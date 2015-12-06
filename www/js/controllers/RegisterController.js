angular.module('jobhop.controllers')
.controller('RegisterController', RegisterController);

RegisterController.$inject = ['$scope', 'JobHopAPI', '$cordovaCamera', '$cordovaFacebook', '$cordovaDialogs', '$ionicLoading', '$stateParams', '$ionicHistory', '$state', '$timeout'];

function RegisterController($scope, JobHopAPI, $cordovaCamera, $cordovaFacebook, $cordovaDialogs, $ionicLoading, $stateParams, $ionicHistory, $state, $timeout) {
    $scope.profileImage = {
        default: 'img/no-thumb.gif',
        data: 'img/no-thumb.gif'
    };

    $scope.register = {
        form: '',
        data: {
            first_name: '',
            last_name: '',
            description: '',
            address: '',
            phone_number: '',
            birth_date: new Date(),
            gender: '',
            profile_image_uri: ''
        }
    };

    $scope.getUserProfileData = function() {
        $ionicLoading.show({
            delay: 100
        });
        $cordovaFacebook.api('/me').then(function(results) {
            $scope.profileImage.default = 'https://graph.facebook.com/' + results.id +'/picture?type=large';
            $scope.profileImage.data = $scope.profileImage.default;
            $scope.register.data.first_name = results.first_name;
            $scope.register.data.last_name = results.last_name;
            if(!angular.isUndefined(results.gender) && (results.gender == 'male' || results.gender == 'female')) {
                $scope.register.data.gender = results.gender.toUpperCase();
            }
            if(!angular.isUndefined(results.birthday)) {
                $scope.register.data.birth_date = new Date(results.birthday);
            }
            $ionicLoading.hide();
        }, function() {
            $ionicLoading.hide();
        });
    };

    $scope.init = function() {
        $scope.getUserProfileData();
    };

    $scope.enums = {
        genders: [
            {
                label: 'זכר',
                value: 'MALE'
            },
            {
                label: 'נקבה',
                value: 'FEMALE'
            }
        ]
    };

    $scope.chooseImage = function() {
        $cordovaCamera.getPicture({
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            targetHeight: 800,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        }).then(function(imageData) {
            $scope.profileImage.data = "data:image/jpeg;base64," + imageData;
        });
    };

    var dateToYYYYMMDD = function(date) {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };

    $scope.minDate = new Date('01/01/1960');
    $scope.maxDate = new Date();
    $scope.maxDate.setTime($scope.maxDate.valueOf() - 10 * 365 * 24 * 60 * 60 * 1000);
    $scope.minDate = dateToYYYYMMDD($scope.minDate);
    $scope.maxDate = dateToYYYYMMDD($scope.maxDate);

    var showPopup = function(title, message) {
        return $cordovaDialogs.alert(message, title, 'המשך');
    };

    var ISODateString = function(date) {
        if(typeof date.getMonth === 'function') {
            return date.getUTCFullYear() + '-'
                + pad(date.getUTCMonth() + 1) + '-'
                + pad(date.getUTCDate()) + 'T'
                + pad(date.getUTCHours()) + ':'
                + pad(date.getUTCMinutes()) + ':'
                + pad(date.getUTCSeconds()) + 'Z';
        } else {
            return date;
        }
    };

    var pad = function(number) {
        return number < 10 ? '0' + number : number;
    };

    $scope.submit = function(withoutImageUpload) {
        if(angular.isUndefined(withoutImageUpload)) {
            imageUpload = false;
        }
        if(!withoutImageUpload) {
            $ionicLoading.show();
            if($scope.register.form.$valid) {
                if($scope.profileImage.data != $scope.profileImage.default) {
                    JobHopAPI.uploadImage($scope.profileImage.data).then(function(profileImageData) {
                        $scope.register.data.profile_image_uri = profileImageData;
                        $scope.submit(true);
                    }, function() {
                        showPopup('אירעה שגיאה', 'אירעה שגיאה בתקשורת עם המערכת');
                    });
                } else {
                    $scope.register.data.profile_image_uri = $scope.profileImage.data;
                    $scope.submit(true);
                }
            };
        } else {
            var registerData = angular.copy($scope.register.data);
            registerData.birth_date = ISODateString(registerData.birth_date);
            JobHopAPI.register('FACEBOOK', registerData).then(function() {
                if(!angular.isUndefined($stateParams.jobId) && $stateParams.jobId != '' && !angular.isUndefined($stateParams.action) && ($stateParams.action == 'apply' || $stateParams.action == 'apply')) {
                    var jobId = $stateParams.jobId;
                    var action = $stateParams.action;
                    $ionicHistory.goBack(-2);
                    if(action == 'apply') {
                        JobHopAPI.applyJob(jobId).then(function() {
                            $ionicLoading.hide();
                            showPopup('ההרשמה בוצעה בהצלחה', 'נרשמת בהצלחה ל-JobHop! הינך מועבר לדף משרות').then(function() {
                                $state.go('employees.jobsFeed');
                                $timeout(function() {
                                    $state.go('employees.profile', { scrollToVideo: true });
                                }, 0);
                            });
                        });
                    } else {
                        JobHopAPI.likeJob(jobId).then(function() {
                            $ionicLoading.hide();
                            showPopup('ההרשמה בוצעה בהצלחה', 'נרשמת בהצלחה ל-JobHop! הינך מועבר לדף משרות').then(function() {
                                $state.go('employees.jobsFeed');
                                $timeout(function() {
                                    $state.go('employees.profile', { scrollToVideo: true });
                                }, 0);
                            });
                        });
                    }
                }
            }, function(error) {
                $ionicLoading.hide();
                if(error.code == 409) {
                    showPopup('אימייל תפוס', 'כתובת אימייל זו תפוסה');
                } else {
                    showPopup('אירעה שגיאה', 'אירעה שגיאה בתקשורת עם המערכת');
                }
            });
        }
    };

    $scope.init();
};

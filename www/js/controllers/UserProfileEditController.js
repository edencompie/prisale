angular.module('jobhop.controllers')
.controller('UserProfileEditController', UserProfileEditController);

UserProfileEditController.$inject = ['$scope', 'JobHopAPI', '$cordovaCamera', '$cordovaDialogs', '$cordovaToast', '$ionicLoading', '$state'];

function UserProfileEditController($scope, JobHopAPI, $cordovaCamera, $cordovaDialogs, $cordovaToast, $ionicLoading, $state) {
    $scope.profileImage = {
        original: $scope.user.profile.profile_image_uri || 'img/no-thumb.gif',
        data: $scope.user.profile.profile_image_uri || 'img/no-thumb.gif'
    };

    var profileData = angular.copy($scope.user.profile);
    if(!angular.isUndefined(profileData.birth_date)) {
        profileData.birth_date = new Date(profileData.birth_date);
    } else {
        profileData.birth_date = new Date();
    }

    $scope.profileEdit = {
        form: '',
        data: profileData
    };
    console.log($scope.profileEdit.data.birth_date);

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

    var showPopup = function(title, template) {
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
            if($scope.profileEdit.form.$valid) {
                if($scope.profileImage.data != $scope.profileImage.original) {
                    JobHopAPI.uploadImage($scope.profileImage.data).then(function(profileImageData) {
                        $scope.profileEdit.data.profile_image_uri = profileImageData;
                        $scope.submit(true);
                    }, function() {
                        showPopup('אירעה שגיאה', 'אירעה שגיאה בתקשורת עם המערכת');
                    });
                } else {
                    $scope.submit(true);
                }
            };
        } else {
            var profileEditData = angular.copy($scope.profileEdit.data);
            profileEditData.birth_date = ISODateString(profileEditData.birth_date);
            JobHopAPI.editUserProfile(profileEditData).then(function() {
                $ionicLoading.hide();
                $cordovaToast.showShortBottom('העריכה בוצעה בהצלחה');
                $state.go('employees.profile');
            }, function(error) {
                $ionicLoading.hide();
                showPopup('אירעה שגיאה', 'אירעה שגיאה בתקשורת עם המערכת');
            });
        }
    };
};

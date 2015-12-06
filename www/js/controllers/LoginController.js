angular.module('jobhop.controllers')
.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', 'JobHopAPI', '$cordovaFacebook', '$ionicLoading', '$ionicPopup', '$stateParams', '$state'];

function LoginController($scope, JobHopAPI, $cordovaFacebook, $ionicLoading, $ionicPopup, $stateParams, $state) {
    /*
    $scope.login = {
        form: '',
        data: {
            identifier: '',
            secret: ''
        }
    };

    var showPopup = function(title, template) {
        var popup = $ionicPopup.alert({
            title: title,
            template: template,
            okText: 'המשך',
            okType: 'button-balanced'
        });
        return popup;
    };

    $scope.login = function() {
        $ionicLoading.show();
        if($scope.login.form.$valid) {
            JobHopAPI.login('EMAIL', {
                identifier: $scope.login.data.identifier,
                secret: $scope.login.data.secret,
            }).then(function(loginData) {
                $ionicLoading.hide();
                if(!angular.isUndefined($stateParams.jobId) && $stateParams.jobId != '') {
                    showPopup('ההתחברות בוצעה בהצלחה', 'התחברת בהצלחה ל-JobHop, הינך מועבר לדף המשרה בה היית').then(function() {
                        $state.go('employees.job', {
                            jobId: $stateParams.jobId
                        });
                    });
                } else {
                    showPopup('ההתחברות בוצעה בהצלחה', 'התחברת בהצלחה ל-JobHop, הינך מועבר לדף משרות').then(function() {
                        $state.go('employees.jobsFeed');
                    });
                }
            }, function(error) {
                $ionicLoading.hide();
                if(error.code == 401) {
                    showPopup('פרטים לא נכונים', 'הפרטים שהזנת אינם נכונים. אנא נסה שנית או הירשם');
                } else {
                    showPopup('אירעה תקלה', 'הפרטים שהזנת אינם נכונים. אנא נסה שניאירעה תקלה בתקשורת עם המערכת');
                }
            });
        };
        $ionicLoading.hide();
    };
    */
};

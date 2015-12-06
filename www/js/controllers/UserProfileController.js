angular.module('jobhop.controllers')
.controller('UserProfileController', UserProfileController);

UserProfileController.$inject = ['$scope', '$sce'];

function UserProfileController($scope, $sce) {
    $scope.profile_video_uri = false;
    if(!angular.isUndefined($scope.user.profile.profile_video_uri)) {
        $scope.profile_video_uri = $sce.trustAsResourceUrl($scope.user.profile.profile_video_uri);
    }

    $scope.$watch('user.profile.profile_video_uri', function(profileVideoUri) {
        if(!angular.isUndefined(profileVideoUri) && profileVideoUri != '') {
            $scope.profile_video_uri = $sce.trustAsResourceUrl($scope.user.profile.profile_video_uri);
        } else {
            $scope.profile_video_uri = false;
        }
    });
};

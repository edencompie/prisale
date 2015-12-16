angular.module('jobhop', [
    'ionic',
    'angular-google-gapi',
    'ngCordova',
    'ngStorage',
    //'ionicLazyLoad',
    'uiGmapgoogle-maps',
    'nl2br',
    'jobhop.controllers',
    'jobhop.directives',
    'jobhop.services',
    'jobhop.filters',
    'jobhop.views',
])
.config(Config)
.run(Run);

Config.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

function Config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $stateProvider
    .state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html'
    })
    .state('help', {
        url: '/help',
        templateUrl: 'views/help.html'
    })
    .state('employees', {
        url: '/employees',
        abstract: true,
        templateUrl: 'views/employees/tabs.html'
    })
    .state('employees.jobsFeed', {
        url: '/jobs-feed',
        views: {
            'jobs-feed-tab': {
                controller: 'JobsFeedController',
                templateUrl: 'views/employees/jobs-feed.html'
            }
        }
    })
    /*.state('employees.job', {
        url: '/job/:jobId',
        views: {
            'jobs-feed-tab': {
                controller: 'JobController',
                templateUrl: 'views/employees/job.html'
            }
        }
    })
    .state('employees.jobsUser', {
        url: '/jobs-user',
        views: {
            'jobs-user-tab': {
                controller: 'JobsUserController',
                templateUrl: 'views/employees/jobs-user.html'
            }
        }
    })
    .state('employees.jobsSearch', {
        url: '/jobs-search',
        views: {
            'jobs-search-tab': {
                controller: 'JobsSearchController',
                templateUrl: 'views/employees/jobs-search.html'
            }
        }
    })
    .state('employees.jobEmployer', {
        url: '/job/:jobId/employer/:employerId/:employmentId?',
        views: {
            'jobs-feed-tab': {
                controller: 'JobEmployerController',
                templateUrl: 'views/employees/job-employer.html'
            }
        }
    })
    .state('employees.profile', {
        url: '/profile',
        views: {
            'jobs-feed-tab': {
                controller: 'UserProfileController',
                templateUrl: 'views/employees/user-profile.html'
            }
        }
    })
    .state('employees.profileEdit', {
        url: '/profile-edit/:scrollToVideo?',
        views: {
            'jobs-feed-tab': {
                controller: 'UserProfileEditController',
                templateUrl: 'views/employees/user-profile-edit.html'
            }
        }
    })
    .state('employees.register', {
        url: '/register/:jobId?/:action?',
        views: {
            'jobs-feed-tab': {
                controller: 'RegisterController',
                templateUrl: 'views/auth/register.html'
            }
        }
    })*/;

    $urlRouterProvider.otherwise('/employees/jobs-feed');

    // Make bottom menu bottom in android
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.tabs.position('bottom');
};

Run.$inject = ['$rootScope', '$ionicPlatform', 'GApi', 'GAuth', 'JobHopAPI', '$window', '$state'];

function Run($rootScope, $ionicPlatform, GApi, GAuth, JobHopAPI, $window, $state) {
    $ionicPlatform.ready(function() {
       /* if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        if(!angular.isUndefined($window.localStorage.deepLinkingUrl)) {
            var deepLinkingUrl = $window.localStorage.deepLinkingUrl;
            $window.localStorage.removeItem('deepLinkingUrl');
            var pattern = new RegExp('^jobhopapp:\/\/jobs\/[a-z0-9]+\/?$', 'i');
            if(pattern.test(deepLinkingUrl)) {
                var splitedUrl = deepLinkingUrl.split('/');
                var jobId = splitedUrl.pop();
                if(jobId == '') {
                    jobId = splitedUrl.pop();
                }
                JobHopAPI.jobIsExist(jobId).then(function(job) {
                    console.log(job);
                    $state.go('employees.job', {
                        jobId: jobId
                    });
                }, function(error) {
                    console.log(error);
                });
            }
        }*/

        /*
        Delete comment in JobHopAPI.js:141
        var args = [];
        var devKey = "8BJA398V4Bu2tUpmAGe5cj‎";
        args.push(devKey);

        if(ionic.Platform.isIOS()) {
            var appId = "1020643523";
            args.push(appId);
        }
        window.plugins.appsFlyer.initSdk(args);
        if(!angular.isUndefined($rootScope.user.account_key)) {
            window.plugins.appsFlyer.setAppUserId($rootScope.user.account_key);
        }
        */
    });

   /* var CLIENT = '418558622231-jg4kdcbac9fmgos83akh96377imit7op.apps.googleusercontent.com';
    var BASE = 'https://2-dot-jobhopapp.appspot.com/_ah/api';
    var API_NAME = 'jobhopApi';
    var API_VERSION = 'v2';
    var API_KEY = 'AIzaSyBotq6gFsSBe5ZNwdSRkiNdjW1miLqdDjQ';
    GApi.load(API_NAME, API_VERSION, BASE);
    GApi.load('storage', 'v1');
    GAuth.setClient(CLIENT);
    GAuth.setScope('https://www.googleapis.com/auth/userinfo.email');

    var apiKeySetted = false;
    $rootScope.$watch(function() {
        return $window.gapi && $window.gapi.client;
    }, function(gapiClient) {
        if(!apiKeySetted && !angular.isUndefined(gapiClient)) {
            gapiClient.setApiKey(API_KEY);
            apiKeySetted = true;
        }
    });*/
};

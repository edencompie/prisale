angular.module('jobhop', [
    'ionic',
    'ngCordova',
    'ngStorage',
    'jobhop.controllers',
    'jobhop.services',
    'jobhop.filters',
    'jobhop.views',
    'ngCordova.plugins.socialSharing',
    'highcharts-ng'
])
.config(Config)
.run(Run);

Config.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

function Config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    Parse.initialize("mZDlpzWNmOc9ZWGuxWTZAgl2UcorL2JxwdB6RG48", "YygfF1qpxWlma7ab6WytNFOMjWl1vWV1fs8yLRMi");

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
    .state('withTabs', {
        url: '/main',
        abstract: true,
        templateUrl: 'views/tabs.html'
    })
    .state('withTabs.productsWholesale', {
        url: '/products-wholesale',
        views: {
            'content': {
                controller: 'ProductsController',
                templateUrl: 'views/products.html'
            }
        }
    })
    .state('withTabs.chart', {
        url: '/chart',
        views: {
            'content': {
                controller: 'ChartsController',
                templateUrl: 'views/chart.html'
            }
        }
    });

    $urlRouterProvider.otherwise('/main/products-wholesale');
    $ionicConfigProvider.scrolling.jsScrolling(false);//fix on-hold

    // Make bottom menu bottom in android
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.tabs.position('bottom');
};

Run.$inject = ['$rootScope', '$ionicPlatform', '$location', 'Installation'];

function Run($rootScope, $ionicPlatform, $location, Installation) {
    $rootScope.appReady = false; //todo

    if (window.localStorage.getItem("instId")) {
        var productsNotifications = [],
            ProductNotify = Parse.Object.extend("product_notify"),
            query = new Parse.Query(ProductNotify);

        var install = new Parse.Object("_Installation");
        install.id = window.localStorage.getItem("instId");

        query.equalTo("InstallID", install);
        query.find({
            success:function(list) {
                console.log('success', list);
                for (var i = 0; i < list.length; i++) {
                    productsNotifications[list[i].get('productID')] = list[i];
                }
                $rootScope.productsNotifications = productsNotifications;
                $rootScope.appReady = true;
            }
        });

    } else {
        $rootScope.productsNotifications = [];
        $rootScope.appReady = true;
    }

    $ionicPlatform.ready(function() {
      Installation();
    });

    $ionicPlatform.registerBackButtonAction(function(e) {

        if ($location.path() == '/main/products-wholesale') {
            navigator.app.exitApp();
        } else {
            e.preventDefault();
            $location.url('/main/products-wholesale');
            $rootScope.$apply();
        }
    }, 500);
};

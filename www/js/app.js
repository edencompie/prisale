angular.module('jobhop', [
    'ionic',
    'ngCordova',
    'ngStorage',
    'nl2br',
    'jobhop.controllers',
    'jobhop.directives',
    'jobhop.services',
    'jobhop.filters',
    'jobhop.views',
    'highcharts-ng',
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
    .state('withTabs.productsAgriculture', {
        url: '/products-agriculture',
        views: {
            'content': {
                controller: 'ProductsController',
                templateUrl: 'views/products.html'
            }
        }
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

    $urlRouterProvider.otherwise('/main/products-agriculture');

    // Make bottom menu bottom in android
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.tabs.position('bottom');
};

Run.$inject = ['$rootScope', '$ionicPlatform', '$window', '$state', 'Installation'];

function Run($rootScope, $ionicPlatform, $window, $state, Installation) {

    var productsNotifications = [],
        ProductNotify = Parse.Object.extend("product_notify"),
        query = new Parse.Query(ProductNotify);

    //query.equalTo('percent', 100);
    $rootScope.appReady = false; //todo
    query.find({
        success:function(list) {
            for (var i = 0; i < list.length; i++) {
                productsNotifications[list[i].get('productID')] = list[i];
            }

            $rootScope.productsNotifications = productsNotifications;
            $rootScope.appReady = true;
        }
    });
    window.addEventListener('deviceready', function() {

      alert('Device ready');
      console.log('device is ready');
      Installation();
    }, false)
};

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
    'chart.js',
])
.config(Config)
.run(Run);

Config.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

function Config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    Parse.initialize("mZDlpzWNmOc9ZWGuxWTZAgl2UcorL2JxwdB6RG48", "YygfF1qpxWlma7ab6WytNFOMjWl1vWV1fs8yLRMi");
    window.addEventListener('deviceready', function() {
      alert('Device ready');
      console.log('device is ready');
      // Installation();
      (function() {
        console.log('Enter service');
        if(!window.localStorage.getItem('device_token')) {
          console.log('Passed flag');

          window.localStorage.setItem('device_token', true);
          Push.on('registration', function(data) {
            console.log('Registered');
            var deviceToken = data.registrationId;
            var platformType = device.platform;
            var instId = device.uuid; // Using the device uuid.
            function generateParseUUID(str) {
              var gen = '', i = 0;
              while(gen.length < 32) {
                  gen += str[i];
                  i++;
                  if(i === str.length) i = 0;
              }
              var splitedGen = gen.split('');
              splitedGen.splice(8, 0, '-');
              splitedGen.splice(13, 0, '-');
              splitedGen.splice(18, 0, '-');
              splitedGen.splice(23, 0, '-');
              return splitedGen.join('');
            }
            var finalInstId = instId;
            // iOS return the parse-valid form of uuid, maybe other such as windows phones doing the same but I don't know(for now).
            if(device.platform !== 'iOS') {
              finalInstId = generateParseUUID(instId); // The original instId is not acceptable by parse.
            }
            // I use toLowerCase() because the platformType device.platform will produce upper cased names like: "Android" while parse accepts "android".
            Parse.Cloud.run('Install', { 'deviceToken': deviceToken, 'instId': finalInstId, 'deviceType': platformType.toLowerCase() }, {
                success: function(response) {
                  console.log('Finish');
                },
                error: function(error) {
                    console.error(error.message);
                }
            });
          });
        }
      })();
    }, false)
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
};

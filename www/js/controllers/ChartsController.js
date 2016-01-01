angular.module('jobhop.controllers')
    .controller('ChartsController', ChartsController);

ChartsController.$inject = ['$rootScope', '$http', '$ionicLoading', '$filter', '$scope'];

function ChartsController($rootScope, $http, $ionicLoading, $filter, $scope) {

    $ionicLoading.show({ template: 'טוען נתונים' });
    setTimeout($ionicLoading.hide, 600);

    $scope.productsCount = function() {
        return getCheckedProductIDs().length;
    };

    $scope.chartType = 'line';
    $scope.price_avg1 = 'DAY';//DAY, WEEK, MONTH, QUARTER, HALF_YEAR, YEAR (bar)
    $scope.price_avg2 = 'WEEK';//WEEK, MONTH, QUARTER, HALF_YEAR, YEAR  (line)
    $scope.priceToShow = 'DAY';//DAY, WEEK (compare)
    $scope.userType = 'agriculturalPrice';//agriculturalPrice, wholesalePrice


    $scope.chartConfig = {
        options: {
            credits: {
                enabled: false
            },
            chart: {
                backgroundColor: '#fef7eb',
                type: 'bar'
            },
            tooltip: { enabled: false },
            legend: { enabled: false },
            xAxis: {
                title: { text: '' },
                categories: [ ],
                crosshair: true
            },
            yAxis: {
                title: { text: '', style: { color: '#ff6600' } },
                labels: { enabled: true }
            }
        },
        plotOptions: {
            bar: {
                animation: false,
                dataLabels: {
                    align: 'right'
                }
            }
        },
        series: [ ],
        title: { text: null }
    };

    $scope.generateChartConfig = function(chartType, userType, price_avg2, priceToShow, price_avg1) {
        var productIDs = getCheckedProductIDs();

        if (chartType == 'line') {
            $http.get('http://62.219.7.38/api/Public?pwd=ck32HGDESf13ekcs&productIds='+productIDs.join(',')+'&price_avg2='+price_avg2)
                .success(function(data) {
                    $scope.chartConfig.series = [];
                    $scope.chartConfig.options.xAxis.categories = [];
                    data.forEach(function(item) {
                        var record = {
                            data: [],
                            name: item.name,
                            marker: { enabled: false }
                        };

                        // Set prices
                        item.prices.forEach(function(priceData) {
                            record.data.push(priceData.price);
                        });
                        $scope.chartConfig.series.push(record);
                    });

                    // Handle categories
                    if (data.length != 0) {
                        data[0].prices.forEach(function(priceData) {
                            $scope.chartConfig.options.xAxis.categories.push(
                                $filter('date')(priceData.date, 'd.M.yy')
                            );
                        });
                    }
                    $scope.chartConfig.options.yAxis.title.text = 'ש"ח';
                    $scope.chartConfig.options.yAxis.labels.enabled = true;
                    $scope.chartConfig.options.xAxis.title.text = '';
                    $scope.chartConfig.options.chart.type = 'line';
                    $scope.chartConfig.options.legend.enabled = true;
                });

        } else if (chartType == 'bar') {
            $http.get('http://62.219.7.38/api/Public?pwd=ck32HGDESf13ekcs&productIds='+productIDs.join(',')+'&price_avg1='+price_avg1)
                .success(function(data) {
                    $scope.chartConfig.series = [
                        {
                            name: 'מקטע סיטונאי',
                            data: []
                        },
                        {
                            name: 'מקטע חקלאי',
                            data: []
                        }
                    ];

                    $scope.chartConfig.options.xAxis.categories = [];
                    data.forEach(function(item) {
                        $scope.chartConfig.series[0].data.push(item.agriculturalPrice);
                        $scope.chartConfig.series[1].data.push(item.wholesalePrice);

                        // left labels
                        $scope.chartConfig.options.xAxis.categories.push(item.name);
                    });

                    $scope.chartConfig.options.chart.type = 'bar';
                    $scope.chartConfig.options.yAxis.title.text = '';
                    $scope.chartConfig.options.xAxis.title.text = '';
                    $scope.chartConfig.options.yAxis.labels.enabled = false;
                    $scope.chartConfig.options.legend.enabled = true;

                });
        } else if (chartType == 'column') {
            $http.get('http://62.219.7.38/api/Public?pwd=ck32HGDESf13ekcs&productIds='+productIDs.join(',')+'&price_avg1='+priceToShow)
                .success(function(data) {
                    $scope.chartConfig.series = [{
                        name: '',
                        data: []
                    }];

                    $scope.chartConfig.options.xAxis.categories = [];
                    data.forEach(function(item) {
                        $scope.chartConfig.series[0].data.push( [item.name, item[userType]] );
                        $scope.chartConfig.options.xAxis.categories.push(item.name);
                    });

                    $scope.chartConfig.options.chart.type = 'column';
                    $scope.chartConfig.options.yAxis.title.text = 'ש"ח';
                    $scope.chartConfig.options.xAxis.title.text = '';
                    $scope.chartConfig.options.yAxis.labels.enabled = true;
                    $scope.chartConfig.options.legend.enabled = false;

                });
        }
    };

    $scope.$on("$destroy", function(){
        $rootScope.productForChart = undefined;
    });

    //init chart
    $scope.generateChartConfig($scope.chartType, $scope.userType, $scope.price_avg2, $scope.priceToShow, $scope.price_avg1);

    function getCheckedProductIDs() {
        if ($rootScope.productForChart !== undefined) {
            return [ $rootScope.productForChart.id ];
        }

        var checked = [];
        if ($rootScope.items)
        {
            for (var i=0; i<$rootScope.items.length; i++) {
                if ($rootScope.items[i].checked) {
                    checked.push($rootScope.items[i].id);
                }
            }
        }

        return checked;
    }
}

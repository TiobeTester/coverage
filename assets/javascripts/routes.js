Psr.config(function ($routeProvider) {
    $routeProvider.when('/overview', {
        controller: 'OverviewCtrl',
        label: 'heatmap',
        templateUrl: 'views/heatmap/overview.html'
    }).when('/report', {
        controller: 'ReportCtrl',
        label: 'heatmap',
        templateUrl: 'views/heatmap/reportHeatMap.html'
    }).when('/view', {
        controller: 'ViewReportCtrl',
        label: 'heatmap',
        templateUrl: 'views/heatmap/reportHeatMap.html'
    }).otherwise({
        redirectTo: '/overview'
    });
});

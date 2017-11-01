Psr.controller('OverviewCtrl', function ($scope, scores, configuration, session, $location, overviewData) {
    function getScoresSummary() {
        $scope.data = null;
        if ($scope.selectedView === 'Squads') {
            scores.getSquadScores(session.getCurrentDate()).then(handleScoresResponse);
        } else {
            scores.getUnitScores(session.getCurrentDate()).then(handleScoresResponse);
        }
    }

    function handleScoresResponse(response) {
        $scope.data = response.data;
        $scope.metricNames = _.pluck(response.data[0].scores, 'metric_name');
    }

    function init() {
        $scope.url = configuration.getApiUrl();
        $scope.selectedView = overviewData.getSelectedView();
        $scope.showFilters = true;
        $scope.showWeekSelector = true;
        $scope.showViewModeSelector = true;

        $scope.predicate = overviewData.getColumnSortIndex();
        $scope.reverse = false;

        getScoresSummary();
    }

    $scope.goToReportView = function (s) {
        session.setSelectedReportingEntity({
            id: s.id,
            name: s.name,
            type: $scope.selectedView === 'Squads' ? 'Squad' : 'Unit'
        });
        $location.url('/report');
    };

    $scope.$on('currentDateChanged', function () {
        getScoresSummary();
    });

    $scope.setSelectedView = function (view) {
        $scope.selectedView = view;
        overviewData.setSelectedView(view);
        $scope.predicate = overviewData.getColumnSortIndex();
        getScoresSummary();
    };

    $scope.$watch('predicate', function (newPredicate) {
        overviewData.setColumnSortIndex(newPredicate);
    });

    $scope.lockMetric = function (metric, e) {
        if (e === 'click') {
            if ($scope.lockedMetric === metric) {
                $scope.lockedMetric = null;
            } else {
                $scope.lockedMetric = metric;
            }
            $scope.hooveredMetric = metric;

        } else {
            if ($scope.lockedMetric === null || $scope.lockedMetric === undefined) {
                $scope.hooveredMetric = metric;
            }
        }
    };

    init();
});

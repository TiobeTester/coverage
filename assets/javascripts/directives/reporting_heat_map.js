Psr.directive('reportingHeatMap', function (scores, time, $mdDialog, metrics, messenger, configuration, evidence, session, overviewData) { // jscs:disable
    var _scope;

    function updateDiscussionTopicsFromServer() {
        scores.getScores(_scope.repEntity, session.getCurrentDate()).then(updateScores);
    }

    function updateScores(response) {
        _scope.squadHealth = response.data;
        _scope.metrics = _scope.squadHealth.metrics;
    }

    return {
        link: function (scope) {
            _scope = scope;
            scope.url = configuration.getApiUrl();

            scope.$watch('repEntity', function () {
                updateDiscussionTopicsFromServer();
            });

            scope.$on('currentDateChanged', function () {
                updateDiscussionTopicsFromServer();
            });

            scope.$on('refreshReportingHeatmap', function () {
                updateDiscussionTopicsFromServer();
            });

            scope.utcToLocal = time.utcToLocal;

            scope.showMetric = function ($event, discussionTopic) {
                if (scope.disabled) {
                    return;
                }
                metrics.show(discussionTopic.id, scope.repEntity).then(function (metric) {
                    $mdDialog.show({
                        controller: 'FlashCardCtrl',
                        locals: {
                            metric: metric.data
                        },
                        targetEvent: $event,
                        templateUrl: 'views/flashcard/_flashCardDialog.html'
                    }).then(function (data) {
                        scores.save(data.score).then(function (score) {
                            evidence.save(data.evidence, score.data.id).then(function () {
                                messenger.display('Thanks. Your score has been saved.');
                                updateDiscussionTopicsFromServer();
                            });
                        });
                    });
                });
            };
        },
        restrict: 'E',
        scope: {
            disabled: '=',
            hoverText: '=',
            forFlatReport: '=',
            repEntity: '='
        },
        templateUrl: 'views/application/_reportingHeatMap.html'
    };
});

Psr.controller('ReportCtrl', function ($scope, session, $mdDialog, scores, $window,
                                       messenger, $rootScope, time, $location) {
    var _scope = $scope;
    $scope.repEntity = session.getSelectedReportingEntity();
    if ($scope.repEntity === undefined) {
        $location.url('/overview');
    }

    $scope.inputDisabled = function () {
        return !(time.isCurrentWeek(session.getCurrentDate()) && userHasReportingEntity());
    };

    $scope.backToOverview = function () {
        $location.url('/overview');
    };

    $scope.genFlatReport = function () {
        var date = session.getCurrentDate();
        var url = 'flat-report.html#?week=' + date.week + '&year=' + date.year;
        $window.open(url + '&' + $scope.repEntity.type.toLowerCase() + 'Id=' + $scope.repEntity.id, '_blank');
    };

    $scope.showSquadUnitSelectionDialog = function ($event) {
        $mdDialog.show({
            controller: 'SquadsUnitsCtrl',
            targetEvent: $event,
            templateUrl: 'views/application/_squads.html'
        }).then(function () {
            $scope.id = session.getSelectedReportingEntity().id;
            $scope.name = session.getSelectedReportingEntity().name;
            $scope.type = session.getSelectedReportingEntity().type;
            $scope.repEntity = session.getSelectedReportingEntity();
        });
    };

    $scope.thereAreNoSquads = function () {
        return !session.getSessionData() || session.getSessionData().squads.length === 0;
    };

    $scope.copyLastReport = function (event) {
        scores.getScores(session.getSelectedReportingEntity())
            .then(function (response) {
                checkMetricsAndCopyScores(response.data, event);
            });
    };

    function userHasReportingEntity() {
        var sessionData = session.getSessionData();
        if (sessionData == null) {
            return false;
        }
        return hasReportingEntity(sessionData.squads, _scope.repEntity) ||
            hasReportingEntity(sessionData.units, _scope.repEntity);
    }

    function hasReportingEntity(reportingEntities, reportingEntity) {
        for (var index = 0; index < reportingEntities.length; index++) {
            if (reportingEntities[index].id === reportingEntity.id) {
                return true;
            }
        }
        return false;
    }

    function checkMetricsAndCopyScores(metrics, event) {
        if (hasScores(metrics)) {
            $mdDialog.show(confirmationDialog(event)).then(copyScores);
        } else {
            copyScores();
        }
    }

    function confirmationDialog(event) {
        return $mdDialog.confirm()
            .title('Would you like to remove all data before copying?')
            .content('All the squad/unit data will be removed.')
            .ariaLabel('dialog')
            .targetEvent(event)
            .ok('Confirm')
            .cancel('Cancel');
    }

    function copyScores() {
        scores.copyLastReport(session.getSelectedReportingEntity())
            .then(function () {
                messenger.display('All the data successful copied to this week.');
                $rootScope.$broadcast('refreshReportingHeatmap');
            }).catch(function () {
                messenger.display('ERROR: Something went wrong. Try again.');
            });
    }

    function hasScores(metric) {
        if (metric.score_id !== null) { // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            return true;
        } else {
            for (var i = 0; i < metric.metrics.length; i++) {
                if (hasScores(metric.metrics[i])) {
                    return true;
                }
            }
        }
        return false;
    }
});

Psr.controller('FlatReportCtrl', function ($location, $scope, time, session, scores, configuration) {
    var data = $location.search();
    $scope.repEntity = {};
    setReportingEntity();
    session.getNameAndSquads().then(function (response) {
        var sessionData = response.data;
        $scope.repEntity.name =
            _.find($scope.repEntity.type === 'Squad' ? sessionData.squads : sessionData.units,
                {id: $scope.repEntity.id}).name;
    });

    $scope.utcToLocal = time.utcToLocal;

    $scope.week = data.week;
    $scope.year = data.year;
    session.setCurrentDate(data.week, data.year);

    scores.getScores($scope.repEntity , session.getCurrentDate()).then(
        function (response) {
            $scope.metric = response.data;
        });

    function setReportingEntity() {

        if (data.squadId !== undefined) {
            $scope.repEntity.id = parseInt(data.squadId);
            $scope.repEntity.type = 'Squad';
        } else {
            $scope.repEntity.id = parseInt(data.unitId);
            $scope.repEntity.type = 'Unit';
        }

        $scope.repEntity.name = '';
    }

    function init() {
        $scope.url = configuration.getApiUrl();
    }

    init();
});

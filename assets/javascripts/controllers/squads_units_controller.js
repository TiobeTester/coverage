Psr.controller('SquadsUnitsCtrl', function ($mdDialog, $scope, session) {
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.setSelected = function () {
        if ($scope.selectedSquadId !== '') {
            session.setSelectedReportingEntity(findById($scope.selectedSquadId, $scope.squads));
        } else {
            session.setSelectedReportingEntity(findById($scope.selectedUnitId, $scope.units));
        }
        $mdDialog.hide();
    };

    function findById(id, list) {
        return list.filter(function (element) {
            return element.id.toString() === id;
        })[0];
    }

    var repEntity = session.getSelectedReportingEntity();
    $scope.selectedSquadId = repEntity.type === 'Squad' ? '' + repEntity.id : '';
    $scope.selectedUnitId = repEntity.type === 'Unit' ? '' + repEntity.id : '';
    $scope.units = session.getSessionData().units;
    $scope.squads = session.getSessionData().squads;
});

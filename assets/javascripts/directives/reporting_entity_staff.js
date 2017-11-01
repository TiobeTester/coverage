Psr.directive('reportingEntityStaff', function (reportingEntity) {
    var _scope, _staff;

    function updateStaff() {
        reportingEntity.staff(_scope.repEntity).then(function (response) {
            _scope.scrumMaster = response.data.scrum_master; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            _scope.teamMembers = response.data.team_members; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            _scope.productOwners = response.data.product_owners; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        });
    }

    return {
        link: function (scope) {
            _scope = scope;
            scope.$watch('repEntity', function () {
                updateStaff();
            });
        },
        restrict: 'E',
        scope: {
            repEntity: '='
        },
        templateUrl: 'views/heatmap/_staff.html'
    };
});
